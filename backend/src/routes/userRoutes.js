import express from "express";
import { updateUserProfile ,applyJob} from "../controllers/userController.js";
import { protect,authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// PUT /api/users/profile
router.put("/profile", protect, updateUserProfile);
router.post("/:id/apply",protect, authorizeRoles("user"), applyJob);

export default router;
