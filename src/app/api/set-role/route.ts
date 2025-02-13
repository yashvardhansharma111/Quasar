import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import User from "@/lib/models/User";
import Student from "@/lib/models/Student";
import Professor from "@/lib/models/Professor";
import Company from "@/lib/models/Company";
import { getAuth } from "@clerk/nextjs/server"; 
import dbConnect from "@/utils/dbConnect";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  dbConnect();

  try {
    // Get Clerk Authenticated User
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch User from MongoDB
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    // Check if User Already Has a Role
    if (user.role) {
      return res.status(400).json({ message: "User role is already set" });
    }

    const { role } = req.body;

    // Validate Role
    const validRoles = ["student", "professor", "company", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    user.role = role;
    await user.save();

    switch (role) {
      case "student":
        await Student.create({ userId: user._id, enrollmentNumber: "", year: null, section: "", profile: {} });
        break;
      case "professor":
        await Professor.create({ userId: user._id, classes: [] });
        break;
      case "company":
        await Company.create({ userId: user._id, name: "", industry: "", opportunities: [] });
        break;
      case "admin":
        // No extra data needed for admin
        break;
    }

    return res.status(200).json({ message: "Role assigned successfully", role });

  } catch (error) {
    console.error("Error setting user role:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
