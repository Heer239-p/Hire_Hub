import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "employer", "admin"],
      default: "user",
    },
    profileImage: { type: String },
    // Employer-specific fields
    companyName: { type: String },
    companyWebsite: { type: String },
    companyDescription: { type: String },
    industry: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
