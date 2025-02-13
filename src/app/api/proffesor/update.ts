import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Professor from "@/lib/models/Professor";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { id, name, email, department } = req.body;
    if (!id) return res.status(400).json({ message: "Professor ID is required" });

    await Professor.findByIdAndUpdate(id, { name, email, department });
    return res.status(200).json({ message: "Professor updated successfully" });
  } catch (error) {
    console.error("Error updating professor:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
