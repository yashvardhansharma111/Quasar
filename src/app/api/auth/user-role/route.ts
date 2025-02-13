import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import User from "@/lib/models/User";
import Student from "@/lib/models/Student";
import Professor from "@/lib/models/Professor";
import Company from "@/lib/models/Company";
import { getAuth } from "@clerk/nextjs/server"; 
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect()

  try {

    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch User from MongoDB
    const user = await User.findOne({ clerkId: userId }).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    let userData: Student  | Professor | Company | null = null;

    // Fetch Additional Role-Specific Data
    switch (user.role) {
      case "student":
        userData = await Student.findOne({ userId: user._id }).populate("classId").lean();
        break;
      case "professor":
        userData = await Professor.findOne({ userId: user._id }).populate("classes").lean();
        break;
      case "company":
        userData = await Company.findOne({ userId: user._id }).lean();
        break;
      case "admin":
        userData = { message: "Admin access granted" };
        break;
      default:
        return res.status(400).json({ message: "Invalid user role" });
    }

    return res.status(200).json({ role: user.role, userData });

  } catch (error) {
    console.error("Error fetching user role:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
