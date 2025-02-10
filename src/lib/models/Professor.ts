import mongoose from "mongoose";

const ProfessorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], // Assigned Classes
});

export default mongoose.model("Professor", ProfessorSchema);
