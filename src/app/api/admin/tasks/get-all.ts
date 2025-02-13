import { NextApiRequest, NextApiResponse } from "next";
import Task from "@/lib/models/Task";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

await dbConnect()

  try {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching tasks" });
  }
}
