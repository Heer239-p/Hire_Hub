import express from "express";
import { createJob, getAllJobs, updateJob, deleteJob, getMyJobs } from "../controllers/jobController.js";
import { getMyJobApplications, updateApplicationStatus,getMyApplications,withdrawApplication } from "../controllers/applicationController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("employer", "admin"), upload.single("attachment"), createJob);
router.get("/my-jobs", protect, getMyJobs);
router.get("/", protect, getAllJobs);
router.put("/:id", protect, authorizeRoles("employer", "admin"), upload.single("attachment"), updateJob);
router.delete("/:id", protect, authorizeRoles("employer", "admin"), deleteJob);
router.get("/applications", protect, authorizeRoles("employer", "admin"), getMyJobApplications);
router.put("/applications/:id/status", protect, authorizeRoles("admin", "employer"), updateApplicationStatus);
router.get("/my-applications", protect, getMyApplications);

router.delete("/:id/withdraw", protect, withdrawApplication);

export default router;
