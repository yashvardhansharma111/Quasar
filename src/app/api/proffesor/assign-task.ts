import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Task from "@/lib/models/Task";
import Notification from "@/lib/models/Notification";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { professorId, classId, studentId, title, description, deadline } = req.body;

    const newTask = await Task.create({
      professorId,
      classId: studentId ? null : classId,
      studentId: studentId || null,
      title,
      description,
      deadline,
      status: "pending",
    });

    await Notification.create({
      userId: studentId || classId, 
      message: `New Task Assigned: ${title}`,
      link: `/tasks/${newTask._id}`,
    });

    return res.status(201).json({ message: "Task assigned successfully", task: newTask });
  } catch (error) {
    console.error("Error assigning task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
