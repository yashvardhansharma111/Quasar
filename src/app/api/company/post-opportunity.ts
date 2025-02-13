import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import Opportunity from "@/lib/models/Opportunity";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { title, description, requiredSkills, location, jobType, deadline } = req.body;

    if (!title || !requiredSkills.length) return res.status(400).json({ message: "Title and skills are required" });

    const opportunity = new Opportunity({ companyId: userId, title, description, requiredSkills, location, jobType, deadline });
    await opportunity.save();

    return res.status(201).json({ message: "Opportunity posted successfully", opportunity });
  } catch (error) {
    console.error("Post opportunity error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
