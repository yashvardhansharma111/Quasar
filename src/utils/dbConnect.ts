import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default dbConnect;
