import express from "express";
import { registerUser, loginUser,logoutUser } from "../controllers/authController.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
export default router;
