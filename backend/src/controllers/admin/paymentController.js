import Payment from "../../models/Payment.js";
import User from "../../models/User.js";
import { successResponse, errorResponse } from "../../utils/responseHandler.js";

// GET all payments for admin
export const getAllPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    
    // Create search filter
    const searchFilter = search
      ? {
          $or: [
            { transactionId: { $regex: search, $options: "i" } },
            { paymentMethod: { $regex: search, $options: "i" } },
            { status: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Get total count for pagination
    const totalPayments = await Payment.countDocuments(searchFilter);
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get payments with populated user data
    const payments = await Payment.find(searchFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("employer", "firstName lastName email")
      .populate("job", "title");

    return successResponse(res, 200, "Payments fetched successfully", {
      payments,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPayments / limit),
      totalPayments,
    });
  } catch (error) {
    console.error("Error fetching all payments:", error);
    return errorResponse(res, 500, "Server error while fetching payments", {
      details: error.message,
    });
  }
};

// GET payment by ID for admin
export const getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId)
      .populate("employer", "firstName lastName email")
      .populate("job", "title");

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
  getAllPayments,
  getPaymentById,
};