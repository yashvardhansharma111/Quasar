import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

export default clerkMiddleware(async (req) => {
  try {
    await dbConnect(); // Ensure DB connection
    console.log("✅ Connected to DB");

    const { userId, sessionClaims } = getAuth(req as any) as { userId: string, sessionClaims: { email_addresses?: { email_address: string }[], first_name?: string, last_name?: string } };

    if (userId) {
      console.log("🔹 Clerk Authenticated User ID:", userId);

      // Dynamically import User to avoid Edge runtime issues
      const User = (await import("@/lib/models/User")).default;

      // Check if user exists in MongoDB
      const existingUser = await User.findOne({ clerkId: userId });
      if (existingUser) {
        console.log("🔹 User already exists:", existingUser.email);
        return NextResponse.next();
      }

      // Extract user info from Clerk
      const email = sessionClaims?.email_addresses?.[0]?.email_address || "";
      const firstName = sessionClaims?.first_name || "";
      const lastName = sessionClaims?.last_name || "";

      // Create new user
      await User.create({
        clerkId: userId,
        email,
        firstName,
        lastName,
      });

      console.log("✅ New user added to MongoDB:", email);
    }
  } catch (error) {
    console.error("❌ Error in middleware:", error);
  }

  return NextResponse.next();
});

// 🚀 Ensure middleware runs in Node.js runtime
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
  runtime: "nodejs", // ✅ Fixes Edge runtime issue
};