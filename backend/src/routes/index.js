// src/routes/index.js
import express from "express";
import authRoutes from "./authRoutes.js";
import jobRoutes from "./jobRoutes.js";
import adminRoutes from "./adminRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

// Mount all routes
router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);

export default router;
