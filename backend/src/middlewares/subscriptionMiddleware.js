import User from "../models/User.js";
import Plan from "../models/Plan.js";
import Payment from "../models/Payment.js";
import Job from "../models/Job.js";
import { errorResponse } from "../utils/responseHandler.js";

// Middleware to check if user has reached their job posting limit based on subscription plan
export const checkJobPostingLimit = async (req, res, next) => {
  try {
    // Get the authenticated user
    const user = req.user;
    
    // Only apply this check for employers
    if (user.role !== "employer") {
      return next();
    }

    // Check if user has an active subscription
    let jobLimit = 3; // Default free plan limit
    
    if (user.subscription && user.subscription.isActive) {
      // User has an active subscription
      const planName = user.subscription.planName;
      
      if (planName === "Professional") {
        jobLimit = 10;
      } else if (planName === "Enterprise") {
        // Unlimited jobs for Enterprise plan
        return next();
      }
    }
    
    // Count the user's active jobs
    const activeJobCount = await Job.countDocuments({
      employer: user._id,
      status: { $in: ["Active", "Pending"] }
    });
    
    // Check if user has reached their limit
    if (activeJobCount >= jobLimit) {
      // If user has reached limit, send error response
      return errorResponse(res, 403, `You have reached your job posting limit of ${jobLimit}. Please upgrade your subscription to post more jobs.`);
    }
    
    // If user hasn't reached limit, proceed to next middleware/controller
    next();
  } catch (error) {
    console.error("Error checking job posting limit:", error);
    return errorResponse(res, 500, "Server error while checking subscription limits");
  }
};