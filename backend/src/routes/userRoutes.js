import express from "express";
import { getUserProfile, updateUserProfile ,applyJob, getOnlyUsers} from "../controllers/userController.js";
import { protect,authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { getMyApplications, withdrawApplication } from "../controllers/applicationController.js";
const router = express.Router();

// GET /api/users/profile
router.get("/profile", protect, getUserProfile);

// PUT /api/users/profile
router.put("/profile", protect, upload.single("profileImage"), updateUserProfile);
router.post("/:id/apply", protect, upload.single("resume"), applyJob);
router.post("/my-applications", protect, getMyApplications);
router.delete("/applications/:id/withdraw", protect, withdrawApplication);
router.post("/",protect,getOnlyUsers);
export default router;