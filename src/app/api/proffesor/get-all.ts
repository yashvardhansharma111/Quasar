import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Professor from "@/lib/models/Professor";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { page = 1, limit = 10 } = req.query;
    const professors = await Professor.find()
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .select("-__v");

    const total = await Professor.countDocuments();
    return res.status(200).json({ professors, totalPages: Math.ceil(total / limit), currentPage: +page });
  } catch (error) {
    console.error("Error fetching professors:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
