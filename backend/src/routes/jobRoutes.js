import express from "express";
import { createJob, getAllJobs, updateJob, deleteJob, getMyJobs } from "../controllers/jobController.js";
import { getMyJobApplications, updateApplicationStatus,withdrawApplication } from "../controllers/applicationController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("employer", "admin"), upload.single("attachment"), createJob);
router.post("/my-jobs", protect, getMyJobs);
router.post("/all-job", getAllJobs);
router.post("/:id", protect, authorizeRoles("employer", "admin"), upload.single("attachment"), updateJob);
router.post("/:id", protect, authorizeRoles("employer", "admin"), deleteJob);
router.post("/applications", protect, authorizeRoles("employer", "admin"), getMyJobApplications);
router.post("/applications/:id/status", protect, authorizeRoles("admin", "employer"), updateApplicationStatus);


router.post("/:id/withdraw", protect, withdrawApplication);

export default router;
