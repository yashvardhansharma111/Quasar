import { NextApiRequest, NextApiResponse } from "next";
import User from "@/lib/models/User";
import dbConnect from "@/utils/dbConnect";

//Delete the user

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect()

  try {
    const { userId } = req.body;
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user" });
  }
}

/*import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import { isValidObjectId } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method Not Allowed" });

  try {
    const { userId } = req.body;

    if (!isValidObjectId(userId)) return res.status(400).json({ message: "Invalid user ID" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isDeleted = true;
    await user.save();

    return res.status(200).json({ message: "User soft deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user" });
  }
}
*/ // soft delete
