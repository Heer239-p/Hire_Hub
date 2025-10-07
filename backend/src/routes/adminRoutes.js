import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { getAllUsers, deleteUser, getAllJobs } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);
router.get("/jobs", protect, authorizeRoles("admin"), getAllJobs);

export default router;
