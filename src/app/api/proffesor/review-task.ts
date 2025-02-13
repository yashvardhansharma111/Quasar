import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import TaskSubmission from "@/lib/models/TaskSubmission";
import Notification from "@/lib/models/Notification";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { submissionId, professorId, status, marks, improvementMessage } = req.body;

    const submission = await TaskSubmission.findById(submissionId);
    if (!submission) return res.status(404).json({ message: "Submission not found" });

    if (status === "accepted") {
      submission.status = "accepted";
      submission.marks = marks;
      await Notification.create({
        userId: submission.studentId,
        message: `Your task has been approved with ${marks} marks`,
        link: `/tasks/submissions/${submission._id}`,
      });
    } else if (status === "improve") {
      submission.status = "improvement required";
      submission.improvementMessage = improvementMessage;
      await Notification.create({
        userId: submission.studentId,
        message: `Task requires improvement: ${improvementMessage}`,
        link: `/tasks/submissions/${submission._id}`,
      });
    }

    await submission.save();
    return res.status(200).json({ message: "Task reviewed successfully", submission });
  } catch (error) {
    console.error("Error reviewing task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
