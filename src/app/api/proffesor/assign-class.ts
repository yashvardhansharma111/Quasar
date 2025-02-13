import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Professor from "@/lib/models/Professor";
import Class from "@/lib/models/Class";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { professorId, classId } = req.body;
    if (!professorId || !classId) return res.status(400).json({ message: "Both professorId and classId are required" });

    await Professor.findByIdAndUpdate(professorId, { $push: { classes: classId } });
    await Class.findByIdAndUpdate(classId, { professorId });

    return res.status(200).json({ message: "Class assigned to professor successfully" });
  } catch (error) {
    console.error("Error assigning class:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
