import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import TaskSubmission from "@/lib/models/TaskSubmission";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { professorId } = req.query;
    const submissions = await TaskSubmission.find({ professorId }).populate("studentId taskId");

    return res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
