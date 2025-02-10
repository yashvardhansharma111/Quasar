import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Student from "@/lib/models/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { studentId } = req.query;
    const student = await Student.findById(studentId).populate("classes");

    if (!student) return res.status(404).json({ message: "Student not found" });

    return res.status(200).json(student.classes);
  } catch (error) {
    console.error("Error fetching student classes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
