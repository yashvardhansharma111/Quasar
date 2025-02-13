import { NextApiRequest, NextApiResponse } from "next";
import User from "@/lib/models/User";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect()

  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find({}, "fullName email role")
      .skip((+page - 1) * +limit)
      .limit(+limit);
    
    const totalUsers = await User.countDocuments();

    return res.status(200).json({ users, totalPages: Math.ceil(totalUsers / +limit) });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users" });
  }
}
