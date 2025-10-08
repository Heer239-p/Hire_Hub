import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    jobLimit: { type: Number, required: true },
    featuredJobLimit: { type: Number, default: 0 },
    durationInDays: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);
