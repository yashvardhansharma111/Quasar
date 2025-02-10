import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  section: { type: String, required: true },
  subject: { type: String, required: true },
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: "Professor" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

export default mongoose.model("Class", ClassSchema);
