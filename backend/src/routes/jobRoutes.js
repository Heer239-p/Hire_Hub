import express from "express";
import { createJob, getAllJobs } from "../controllers/jobController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("employer", "admin"), createJob);
router.get("/job", getAllJobs);

export default router;
