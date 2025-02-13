import { NextApiRequest, NextApiResponse } from "next";
import User from "@/lib/models/User";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect()

  try {
    const { professorId, classId } = req.body;
    await User.findByIdAndUpdate(professorId, { $push: { classes: classId } });
    return res.status(200).json({ message: "Class assigned successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error assigning class" });
  }
}
