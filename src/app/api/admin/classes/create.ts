import { NextApiRequest, NextApiResponse } from "next";
import Class from "@/lib/models/Class";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect()

  try {
    const { year, section } = req.body;
    const existingClass = await Class.findOne({ year, section });

    if (existingClass) return res.status(400).json({ message: "Class already exists" });

    const newClass = await Class.create(req.body);
    return res.status(201).json(newClass);
  } catch (error) {
    return res.status(500).json({ message: "Error creating class" });
  }
}

/*export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Authentication check
  const { userId } = getAuth(req);
  const adminUser = await User.findOne({ clerkId: userId, role: 'admin' });
  
  if (!adminUser) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Input validation
  const { year, section, subject, professorId } = req.body;
  if (!year || !section || !subject) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Transaction for safe creation
  const session = await mongoose.startSession();
  try {
    const newClass = await Class.create([{ 
      year, 
      section, 
      subject, 
      professorId 
    }], { session });

    return res.status(201).json(newClass);
  } catch (error) {
    console.error("Class creation error:", error);
    return res.status(500).json({ 
      message: "Error creating class",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  } finally {
    session.endSession();
  }
}*/
