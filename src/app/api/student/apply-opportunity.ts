import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import OpportunityApplication from "@/lib/models/Project";
import Notification from "@/lib/models/Notification";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();

  try {
    const { studentId, opportunityId, resumeLink } = req.body;

    const application = await OpportunityApplication.create({
      studentId,
      opportunityId,
      resumeLink,
      status: "Pending",
    });

    await Notification.create({
      recipientId: opportunityId.companyId,
      message: `New application received from student ${studentId}`,
      relatedId: application._id,
      type: "opportunity",
    });

    return res.status(201).json(application);
  } catch (error) {
    console.error("Error applying for opportunity:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
