import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ["In-Progress", "Completed", "Archived"], default: "In-Progress" },
});

export default mongoose.model("Project", ProjectSchema);
