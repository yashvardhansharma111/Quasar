import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Task from "@/lib/models/Task";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { studentId } = req.query;

    const tasks = await Task.find({
      $or: [{ assignedTo: studentId }, { classId: { $in: studentId } }],
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching assigned tasks:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
