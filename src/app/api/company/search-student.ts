import { NextApiRequest, NextApiResponse } from "next";
import Student from "@/lib/models/Student";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  const { enrollmentNumber, skills, page = 1, limit = 10 } = req.query;

  try {
    const query: any = {};
    if (enrollmentNumber) query.enrollmentNumber = enrollmentNumber;
    if (skills) query["profile.skills"] = { $in: skills };

    const students = await Student.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .populate("profile");

    return res.status(200).json(students);
  } catch (error) {
    console.error("Search students error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
