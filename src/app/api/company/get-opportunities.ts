import { NextApiRequest, NextApiResponse } from "next";
import Opportunity from "@/lib/models/Opportunity";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  const { page = 1, limit = 10 } = req.query;

  try {
    const opportunities = await Opportunity.find()
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .lean();

    const total = await Opportunity.countDocuments();

    return res.status(200).json({ opportunities, totalPages: Math.ceil(total / +limit), currentPage: +page });
  } catch (error) {
    console.error("Get opportunities error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
