import express from "express";
import { updateUserProfile ,applyJob, getOnlyUsers} from "../controllers/userController.js";
import { protect,authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { getMyApplications } from "../controllers/applicationController.js";
const router = express.Router();

// PUT /api/users/profile
router.post("/profile", protect, upload.single("profileImage"),updateUserProfile);
router.post("/:id/apply", protect, authorizeRoles("user"), upload.single("resume"), applyJob);
router.post("/my-applications",protect, getMyApplications);
router.post("/",protect,getOnlyUsers);
export default router;
