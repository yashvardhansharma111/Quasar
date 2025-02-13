import { NextApiRequest, NextApiResponse } from "next";
import User from "@/lib/models/User";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect()

  try {
    const professors = await User.find({ role: "professor" });
    return res.status(200).json(professors);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching professors" });
  }
}
