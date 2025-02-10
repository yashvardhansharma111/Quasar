import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: "Professor", required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  tags: [{ type: String }],
  dueDate: { type: Date, required: true },
});

export default mongoose.model("Task", TaskSchema);
