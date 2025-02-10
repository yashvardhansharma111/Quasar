import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import OpportunityApplication from "@/lib/models/OpportunityApplication";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { studentId } = req.query;

    const applications = await OpportunityApplication.find({ studentId }).populate("opportunityId");

    return res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applied opportunities:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
