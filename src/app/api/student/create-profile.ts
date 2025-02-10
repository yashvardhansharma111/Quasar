import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Profile from "@/lib/models/Profile";
import Student from "@/lib/models/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { studentId, profileData } = req.body;

    const profile = await Profile.create(profileData);
    await Student.findByIdAndUpdate(studentId, { profile: profile._id });

    return res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
