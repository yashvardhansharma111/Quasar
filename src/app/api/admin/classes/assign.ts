import { NextApiRequest, NextApiResponse } from "next";
import Class from "@/lib/models/Class";
import User from "@/lib/models/User";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Method Not Allowed" });
  
  await dbConnect();

  try {
    const { classId, professorId } = req.body;

    const professor = await User.findOne({ _id: professorId, role: "professor" });
    if (!professor) return res.status(404).json({ message: "Professor not found" });

    await Class.findByIdAndUpdate(classId, { professor: professorId });
    return res.status(200).json({ message: "Professor assigned successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error assigning professor" });
  }
}
