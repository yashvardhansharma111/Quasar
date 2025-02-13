import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import Company from "@/lib/models/Company";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();
  
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { name, email, website, industry, location } = req.body;

    // Check if company already exists
    const existingCompany = await Company.findOne({ userId });
    if (existingCompany) return res.status(400).json({ message: "Company already registered" });

    // Email format validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return res.status(400).json({ message: "Invalid email format" });

    const company = await Company.create({ clerkId: userId, name, email, website, industry });

    //const newCompany = new Company({ userId, name, email, website, industry, location });
    //await newCompany.save();

    return res.status(201).json({ message: "Company registered successfully", company: company });
  } catch (error) {
    console.error("Company registration error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
