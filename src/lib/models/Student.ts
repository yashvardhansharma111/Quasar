import mongoose from "mongoose";
import ProfileSchema from "./Profile";

const StudentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  enrollmentNumber: { type: String, unique: true, required: true },
  year: { type: Number, required: true },
  section: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // Joined Class
  profile: ProfileSchema, // Embedded Profile Schema
  scores: {
    academics: { type: Number, default: 0 },
    practicals: { type: Number, default: 0 },
    extracurriculars: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
  },
});

export default mongoose.models.Student|| mongoose.model("Student", StudentSchema);
