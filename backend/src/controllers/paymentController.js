import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Plan from "../models/Plan.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import crypto from "crypto";

// ==========================
// CREATE SUBSCRIPTION PAYMENT
// ==========================
export const createSubscriptionPayment = async (req, res) => {
  try {
    const { planName, amount, paymentMethod } = req.body;
    const employerId = req.user._id;

    // Validate required fields
    if (!planName || !amount || !paymentMethod) {
      return errorResponse(res, 400, "Plan name, amount, and payment method are required");
    }

    // Only accept PayPal as payment method
    if (paymentMethod !== "PayPal") {
      return errorResponse(res, 400, "Only PayPal payments are accepted");
    }

    // Generate a unique transaction ID
    const transactionId = `TXN_${Date.now()}_${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    // Create payment record for subscription (no job associated)
    const payment = await Payment.create({
      employer: employerId,
      amount: Number(amount),
      paymentMethod,
      transactionId,
      status: "Success" // For demo purposes, we'll mark as successful immediately
    });

    // Update user's subscription info (in a real app, you might store this in a separate Subscription model)
    const user = await User.findById(employerId);
    if (user) {
      // Store subscription info in user document
      user.subscription = {
        planName,
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        isActive: true
      };
      await user.save();
    }

    return successResponse(res, 201, "Payment successful! Subscription activated.", payment);
  } catch (error) {
    console.error("Error creating subscription payment:", error);
    return errorResponse(res, 500, "Server error while processing payment", {
      details: error.message,
    });
  }
};

// ==========================
// CREATE JOB POSTING PAYMENT
// ==========================
export const createJobPayment = async (req, res) => {
  try {
    const { jobId, amount, paymentMethod } = req.body;
    const employerId = req.user._id;

    // Validate required fields
    if (!jobId || !amount || !paymentMethod) {
      return errorResponse(res, 400, "Job ID, amount, and payment method are required");
    }

    // Only accept PayPal as payment method
    if (paymentMethod !== "PayPal") {
      return errorResponse(res, 400, "Only PayPal payments are accepted");
    }

    // Check if job exists and belongs to the employer
    const job = await Job.findById(jobId);
    if (!job) {
      return errorResponse(res, 404, "Job not found");
    }

    if (job.employer.toString() !== employerId.toString()) {
      return errorResponse(res, 403, "You don't have permission to pay for this job");
    }

    // Generate a unique transaction ID
    const transactionId = `TXN_${Date.now()}_${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    // Create payment record
    const payment = await Payment.create({
      employer: employerId,
      job: jobId,
      amount: Number(amount),
      paymentMethod,
      transactionId,
      status: "Success" // For demo purposes, we'll mark as successful immediately
    });

    // Mark job as posted (active)
    job.status = "Active";
    job.payment = payment._id;
    await job.save();

    return successResponse(res, 201, "Payment successful! Job is now active.", { payment, job });
  } catch (error) {
    console.error("Error creating job payment:", error);
    return errorResponse(res, 500, "Server error while processing payment", {
      details: error.message,
    });
  }
};

// ==========================
// GET USER PAYMENTS
// ==========================
export const getUserPayments = async (req, res) => {
  try {
    const employerId = req.user._id;

    const payments = await Payment.find({ employer: employerId })
      .sort({ createdAt: -1 })
      .populate("job", "title company")
      .populate("employer", "firstName lastName email");

    return successResponse(res, 200, "Payments fetched successfully", payments);
  } catch (error) {
    console.error("Error fetching user payments:", error);
    return errorResponse(res, 500, "Server error while fetching payments", {
      details: error.message,
    });
  }
};

// ==========================
// GET PAYMENT BY ID
// ==========================
export const getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const employerId = req.user._id;

    const payment = await Payment.findOne({ _id: paymentId, employer: employerId })
      .populate("job", "title company")
      .populate("employer", "firstName lastName email");

    if (!payment) {
      return errorResponse(res, 404, "Payment not found");
    }

    return successResponse(res, 200, "Payment fetched successfully", payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    return errorResponse(res, 500, "Server error while fetching payment", {
      details: error.message,
    });
  }
};



export default {
  createSubscriptionPayment,
  createJobPayment,
  getUserPayments,
  getPaymentById
};