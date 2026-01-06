import express from "express";
import { handlePayPalIPN, handlePayPalCheckoutWebhook } from "../controllers/paypalWebhookController.js";

const router = express.Router();

/**
 * PayPal IPN (Instant Payment Notification) endpoint
 * This endpoint receives payment notifications from PayPal
 */
router.post("/ipn", handlePayPalIPN);

/**
 * PayPal Checkout Webhook endpoint
 * This endpoint handles PayPal Checkout order completion events
 */
router.post("/webhook", handlePayPalCheckoutWebhook);

export default router;