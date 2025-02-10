import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import TaskSubmission from "@/lib/models/TaskSubmission";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { studentId } = req.query;

    const submissions = await TaskSubmission.find({ studentId }).populate("taskId");

    return res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching task submissions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
