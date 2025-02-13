import { NextApiRequest, NextApiResponse } from "next";
import Task from "@/lib/models/Task";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect()

  try {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error creating task" });
  }
}
