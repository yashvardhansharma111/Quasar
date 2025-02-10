import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Student from "@/lib/models/Student";
import Class from "@/lib/models/Class";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { studentId, classId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const classObj = await Class.findById(classId);
    if (!classObj) return res.status(404).json({ message: "Class not found" });

    if (!student.classes.includes(classId)) {
      student.classes.push(classId);
      await student.save();
    }

    return res.status(200).json({ message: "Class joined successfully", student });
  } catch (error) {
    console.error("Error joining class:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
