import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import TaskSubmission from "@/lib/models/TaskSubmission";
import Notification from "@/lib/models/Notification";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { studentId, taskId, submissionLink, description } = req.body;

    const submission = await TaskSubmission.create({
      studentId,
      taskId,
      submissionLink,
      description,
      status: "under review",
    });

    await Notification.create({
      userId: (await Task.findById(taskId)).professorId,
      message: `Task submitted by Student #${studentId}`,
      link: `/tasks/submissions/${submission._id}`,
    });

    return res.status(201).json({ message: "Task submitted successfully", submission });
  } catch (error) {
    console.error("Error submitting task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
