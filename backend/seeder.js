import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";
import connectDB from "./src/config/db.js";   // adjust path if needed


dotenv.config();
connectDB();

const adminData = {
  firstName: "Admin",
  lastName: "User",
  mobile: "9999999999",
  email: "admin@hirehub.com",
  password: bcrypt.hashSync("admin123", 10),
  role: "admin",
};

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("⚠️ Admin already exists!");
      process.exit();
    }

    await User.create(adminData);
    console.log("✅ Admin user created successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
