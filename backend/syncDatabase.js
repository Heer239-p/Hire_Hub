import mongoose from "mongoose";
import dotenv from "dotenv";

// Import your models
import User from "./src/models/User.js";
import Company from "./src/models/companies.js";
import Job from "./src/models/Job.js";
import Application from "./src/models/Application.js";
import Plan from "./src/models/Plan.js";
import Payment from "./src/models/Payment.js";
// import Message from "./src/models/Message.js";
import Review from "./src/models/Reviews.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hirehub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB for sync...");

  try {
    // =========================
    // USER COLLECTION
    // =========================
    await User.updateMany(
      { role: { $exists: false } },
      { $set: { role: "user" } }
    );

    await User.updateMany(
      { role: "employer", companyName: { $exists: false } },
      {
        $set: {
          companyName: "Unknown Company",
          companyWebsite: "",
          companyDescription: "",
          industry: "",
        },
      }
    );

    console.log("User collection synced ✅");
    
    // =========================
    // COMPANY COLLECTION
    // =========================
    await Company.updateMany(
      { name: { $exists: false } },
      { $set: { name: "Unknown Company" } }
    );

    await Company.updateMany(
      { description: { $exists: false } },
      { $set: { description: "" } }
    );

    await Company.updateMany(
      { website: { $exists: false } },
      { $set: { website: null } }
    );

    await Company.updateMany(
      { location: { $exists: false } },
      { $set: { location: "Not Specified" } }
    );

    await Company.updateMany(
      { industry: { $exists: false } },
      { $set: { industry: "General" } }
    );

    await Company.updateMany(
      { logo: { $exists: false } },
      { $set: { logo: null } }
    );

    console.log("Company collection synced ✅");


    // =========================
    // JOB COLLECTION
    // =========================
    await Job.updateMany(
      { applicants: { $exists: false } },
      { $set: { applicants: [] } }
    );

    await Job.updateMany(
      { jobType: { $exists: false } },
      { $set: { jobType: "Full-Time" } }
    );

    await Job.updateMany(
      { skills: { $exists: false } },
      { $set: { skills: [] } }
    );

    await Job.updateMany(
      { deadline: { $exists: false } },
      { $set: { deadline: null } }
    );

    console.log("Job collection synced ✅");

    // =========================
    // APPLICATION COLLECTION
    // =========================
    await Application.updateMany(
      { "applicantID.role": { $exists: false } },
      { $set: { "applicantID.role": "Job Seeker" } }
    );

    await Application.updateMany(
      { "employerID.role": { $exists: false } },
      { $set: { "employerID.role": "Employer" } }
    );

    console.log("Application collection synced ✅");

    // =========================
    // PLAN COLLECTION
    // =========================
    // No changes needed unless you add new fields
    await Plan.init();
    console.log("Plan collection synced ✅");

    // =========================
    // PAYMENT COLLECTION
    // =========================
    await Payment.init();
    console.log("Payment collection synced ✅");

    // =========================
    // MESSAGE COLLECTION
    // =========================
    await Message.init();
    console.log("Message collection synced ✅");

    // =========================
    // REVIEW COLLECTION
    // =========================
    await Review.init();
    console.log("Review collection synced ✅");

    console.log("\n✅ All collections are synced and ready in Compass!");
    process.exit(0);
  } catch (error) {
    console.error("Error syncing collections:", error);
    process.exit(1);
  }
});
