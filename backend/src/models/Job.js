import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Job title is required"] 
    },
    description: { 
      type: String, 
      required: [true, "Job description is required"] 
    },
    company: { 
      type: String, 
      default: "Unknown Company" 
    },
    location: { 
      type: String, 
      default: "Remote" 
    },
    salary: { 
      type: String 
    },
    employer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "Employer (poster) is required"] 
    },
    jobType: { 
      type: String, 
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"], 
      default: "Full-Time" 
    },
    skills: [{ 
      type: String 
    }],
    deadline: { 
      type: Date 
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // unique: true // ensures no duplicate applicants
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
