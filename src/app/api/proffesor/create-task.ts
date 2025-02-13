import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Task from "@/lib/models/Task";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { professorId, classId, title, description, dueDate } = req.body;
    if (!professorId || !classId || !title || !description || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = await Task.create({ professorId, classId, title, description, dueDate });
    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
