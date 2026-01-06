// src/routes/index.js
import express from "express";
import authRoutes from "./authRoutes.js";
import jobRoutes from "./jobRoutes.js";
import adminRoutes from "./adminRoutes.js";
import userRoutes from "./userRoutes.js";
import contactRoutes from "./contactRoutes.js";
import companyRoutes from "./companyRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import paypalRoutes from "./paypalRoutes.js";

const router = express.Router();

// Mount all routes
router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/contact", contactRoutes);
router.use("/company", companyRoutes);
router.use("/payment", paymentRoutes);
router.use("/paypal", paypalRoutes);

export default router;