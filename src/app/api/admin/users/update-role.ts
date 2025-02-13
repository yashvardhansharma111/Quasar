import { NextApiRequest, NextApiResponse } from "next";
import User from "@/lib/models/User";
import { isValidObjectId } from "mongoose";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Method Not Allowed" });

 await dbConnect()

  try {
    const { userId, role } = req.body;

    if (!isValidObjectId(userId) || !["admin", "professor", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid user ID or role" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    return res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating role" });
  }
}
