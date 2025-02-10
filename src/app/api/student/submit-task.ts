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
      status: "Under Review",
    });

    await Notification.create({
      recipientId: submission.professorId,
      message: `New task submission from student ${studentId}`,
      relatedId: submission._id,
      type: "task",
    });

    return res.status(201).json(submission);
  } catch (error) {
    console.error("Error submitting task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
