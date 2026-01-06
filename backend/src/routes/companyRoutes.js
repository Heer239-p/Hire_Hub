import express from "express";
import { getEmployerDashboardStats } from "../controllers/dashboardController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes in this file are protected and only accessible by employers
router.get("/dashboard/stats", protect, authorizeRoles("employer"), getEmployerDashboardStats);

export default router;