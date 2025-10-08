import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    website: { type: String },
    location: { type: String },
    industry: { type: String },
    logo: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // employer user
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
