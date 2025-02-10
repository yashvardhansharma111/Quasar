import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  link: { type: String }, // Redirect to Task/Project
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  expiresAt: { type: Date },
});

export default mongoose.model("Notification", NotificationSchema);
