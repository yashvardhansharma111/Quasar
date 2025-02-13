import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import Company from "@/lib/models/Company";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { name, website, industry, location } = req.body;

    const company = await Company.findOneAndUpdate({ userId }, { name, website, industry, location }, { new: true });

    if (!company) return res.status(404).json({ message: "Company not found" });

    return res.status(200).json({ message: "Company updated successfully", company });
  } catch (error) {
    console.error("Update company error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
