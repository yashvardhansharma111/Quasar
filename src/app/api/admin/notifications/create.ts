import { NextApiRequest, NextApiResponse } from "next";
import Notification from "@/lib/models/Notification";
import User from "@/lib/models/User";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect()

  try {
    const { recipientId, type, message } = req.body;
    
    if (!recipientId || !["task", "announcement"].includes(type) || !message) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    const notification = await Notification.create(req.body);
    return res.status(201).json(notification);
  } catch (error) {
    return res.status(500).json({ message: "Error sending notification" });
  }
}
