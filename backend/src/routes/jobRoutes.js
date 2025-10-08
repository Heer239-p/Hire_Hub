import express from "express";
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js"; // ✅ Import multer upload

const router = express.Router();


router.post(
  "/",
  protect,
  authorizeRoles("employer", "admin"),
  upload.single("attachment"), // ✅ handle file upload from form-data
  createJob
);

// ==========================
// GET ALL JOBS (Public route)
// ==========================
router.get("/", getAllJobs);

// ==========================
// UPDATE JOB (Employer or Admin)
// ==========================
router.put(
  "/:id",
  protect,
  authorizeRoles("employer", "admin"),
  upload.single("attachment"), // ✅ allow updating job file
  updateJob
);

// ==========================
// DELETE JOB (Employer or Admin)
// ==========================
router.delete(
  "/:id",
  protect,
  authorizeRoles("employer", "admin"),
  deleteJob
);

// (❌ Optional Duplicate — you already have GET /)
router.get("/job", getAllJobs);

export default router;
