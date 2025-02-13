import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Company from "@/lib/models/Company";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const companies = await Company.find().select("-__v"); // Exclude __v field
    return res.status(200).json({ companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
