import express from "express";
import { updateUserProfile ,applyJob} from "../controllers/userController.js";
import { protect,authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();

// PUT /api/users/profile
router.put("/profile", protect, upload.single("profileImage"),updateUserProfile);
router.post("/:id/apply", protect, authorizeRoles("user"), upload.single("resume"), applyJob);

export default router;
