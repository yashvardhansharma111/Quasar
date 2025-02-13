import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  industry: { type: String, required: true },
  internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

export default mongoose.models.Company|| mongoose.model("Company", CompanySchema);
