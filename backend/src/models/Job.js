import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, default: "Unknown Company" },
    location: { type: String, default: "Remote" },

    // 💰 Salary Section
    salaryType: {
      type: String,
      enum: ["Fixed", "Range"],
      required: true,
      default: "Fixed",
    },
    fixedSalary: {
      type: Number, // Used if salaryType = "Fixed"
      validate: {
        validator: function (v) {
          return this.salaryType === "Fixed" ? v > 0 : true;
        },
        message: "Fixed salary must be greater than 0",
      },
    },
    salaryRange: {
      from: {
        type: Number, // Used if salaryType = "Range"
        validate: {
          validator: function (v) {
            return this.salaryType === "Range" ? v > 0 : true;
          },
          message: "Salary range 'from' must be greater than 0",
        },
      },
      to: {
        type: Number,
        validate: {
          validator: function (v) {
            return this.salaryType === "Range" ? v > 0 : true;
          },
          message: "Salary range 'to' must be greater than 0",
        },
      },
    },

    // 👤 Employer Reference
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🧾 Job Type
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      default: "Full-Time",
    },

    // 🧠 Required Skills
    skills: [{ type: String }],

    // 🗓️ Application Deadline
    deadline: { type: Date },

    // 👥 Applicants List
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // 🏷️ Job Category
    category: {
      type: String,
      enum: [
        "IT & Software",
        "Marketing",
        "Design",
        "Finance",
        "Human Resources",
        "Education",
        "Healthcare",
        "Engineering",
        "Other",
      ],
      default: "Other",
    },

    // 📂 Job Status
    status: {
      type: String,
      enum: ["Active", "Closed", "Pending"],
      default: "Pending",
    },

    // 💳 Payment Reference
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    // 📎 Optional Attachment
    attachment: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
