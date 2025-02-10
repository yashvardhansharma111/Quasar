import mongoose from "mongoose";

const TaskSubmissionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  submissionLink: { type: String, required: true },
  feedback: { type: String },
  score: { type: Number },
  status: { type: String, enum: ["Pending", "Approved", "Needs Improvement"], default: "Pending" },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("TaskSubmission", TaskSubmissionSchema);
