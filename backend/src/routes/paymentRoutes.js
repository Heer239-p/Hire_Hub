import express from "express";
import { 
  createSubscriptionPayment, 
  createJobPayment, 
  getUserPayments, 
  getPaymentById 
} from "../controllers/paymentController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes in this file are protected and only accessible by employers
router.post("/subscription", protect, authorizeRoles("employer"), createSubscriptionPayment);
router.post("/job", protect, authorizeRoles("employer"), createJobPayment);
router.get("/my-payments", protect, authorizeRoles("employer"), getUserPayments);
router.get("/:paymentId", protect, authorizeRoles("employer"), getPaymentById);

export default router;