import express from "express";
import {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  deleteContactMessage,
} from "../controllers/contactController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can send a contact message and view all messages
router.post("/", createContactMessage);
router.get("/", getAllContactMessages);

// Protected routes - only admin can access these
router.get("/:id", protect, authorizeRoles("admin"), getContactMessageById);
router.delete("/:id", protect, authorizeRoles("admin"), deleteContactMessage);

export default router;