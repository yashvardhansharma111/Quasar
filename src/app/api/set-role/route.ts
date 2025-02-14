import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import Student from "@/lib/models/Student";
import Professor from "@/lib/models/Professor";
import Company from "@/lib/models/Company";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/utils/dbConnect";

export const dynamic = "force-dynamic"; // ✅ Forces Node.js runtime

export async function POST(request: NextRequest) {
  await dbConnect();

  try {

    const { userId } = await auth(); 

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const body = await request.json();
    const { role } = body;

    // Fetch User from MongoDB
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json({ message: "User not found in database" }, { status: 404 });
    }

    // Check if User Already Has a Role
    if (user.role) {
      return NextResponse.json({ message: "User role is already set" }, { status: 400 });
    }

    // Validate Role
    const validRoles = ["student", "professor", "company", "admin"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ message: "Invalid role provided" }, { status: 400 });
    }

    user.role = role;
    await user.save();

    switch (role) {
      case "student":
        await Student.create({ userId: user._id, enrollmentNumber: "", year: null, section: "", profile: {} });
        break;
      case "professor":
        await Professor.create({ userId: user._id, classes: [] });
        break;
      case "company":
        await Company.create({ userId: user._id, name: "", industry: "", opportunities: [] });
        break;
      case "admin":
        // No extra data needed for admin
        break;
    }

    return NextResponse.json({ message: "Role assigned successfully", role }, { status: 200 });

  } catch (error) {
    console.error("Error setting user role:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
