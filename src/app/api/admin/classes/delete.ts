import { NextApiRequest, NextApiResponse } from "next";
import Class from "@/lib/models/Class";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect()

  try {
    const { classId } = req.body;
    await Class.findByIdAndDelete(classId);
    return res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting class" });
  }
}
