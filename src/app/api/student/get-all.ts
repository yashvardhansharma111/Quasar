import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Student from "@/lib/models/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { page = 1, limit = 10 } = req.query;
    const students = await Student.find()
      .skip((+page - 1) * +limit)
      .limit(+limit);

    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
