import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String },
    location: { type: String },
    salary: { type: String },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
