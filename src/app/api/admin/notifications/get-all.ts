import { NextApiRequest, NextApiResponse } from "next";
import Notification from "@/lib/models/Notification";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect()

  try {
    const notifications = await Notification.find({});
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching notifications" });
  }
}
