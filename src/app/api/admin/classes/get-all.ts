import { NextApiRequest, NextApiResponse } from "next";
import Class from "@/lib/models/Class";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect()

  try {
    const classes = await Class.find({});
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching classes" });
  }
}
