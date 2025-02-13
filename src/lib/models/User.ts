import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk Auth ID
    role: { type: String, enum: ["student", "professor", "company", "admin"],default:null, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);