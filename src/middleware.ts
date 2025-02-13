import { clerkMiddleware } from "@clerk/nextjs/server";

// Apply Clerk middleware to protect all routes except static files
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Protect all non-static routes
};
