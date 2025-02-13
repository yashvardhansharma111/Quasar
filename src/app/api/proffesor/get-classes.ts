import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Professor from "@/lib/models/Professor";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { professorId } = req.query;
    if (!professorId) return res.status(400).json({ message: "Professor ID is required" });

    const professor = await Professor.findById(professorId).populate("classes");
    if (!professor) return res.status(404).json({ message: "Professor not found" });

    return res.status(200).json({ classes: professor.classes });
  } catch (error) {
    console.error("Error fetching professor's classes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
