import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Company from "@/lib/models/Company";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "Company ID is required" });

    await Company.findByIdAndDelete(id);
    return res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting Company:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
