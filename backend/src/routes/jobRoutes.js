import express from "express";
import { createJob, getAllJobs,updateJob,deleteJob } from "../controllers/jobController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("employer", "admin"), createJob);
router.get("/", protect,getAllJobs);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);
router.get("/job", getAllJobs);


export default router;
