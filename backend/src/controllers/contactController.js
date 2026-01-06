import Contact from "../models/Contact.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

// ====================================================
// CREATE CONTACT MESSAGE
// ====================================================
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // Validation
    if (!name || !email || !message || !rating) {
      return errorResponse(res, 400, "All fields are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(res, 400, "Please provide a valid email address");
    }

    // Validate rating
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return errorResponse(res, 400, "Rating must be a number between 1 and 5");
    }

    // Create contact message
    const contactMessage = await Contact.create({
      name,
      email,
      message,
      rating: ratingNum,
    });

    return successResponse(res, 201, "Message sent successfully", contactMessage);
  } catch (error) {
    console.error("Error creating contact message:", error);
    return errorResponse(res, 500, "Server error while sending message");
  }
};

// ====================================================
// GET ALL CONTACT MESSAGES (PUBLIC ACCESS FOR REVIEWS PAGE)
// ====================================================
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    return successResponse(res, 200, "Messages fetched successfully", messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return errorResponse(res, 500, "Server error while fetching messages");
  }
};

// ====================================================
// GET CONTACT MESSAGE BY ID
// ====================================================
export const getContactMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findById(id);

    if (!message) {
      return errorResponse(res, 404, "Message not found");
    }

    return successResponse(res, 200, "Message fetched successfully", message);
  } catch (error) {
    console.error("Error fetching contact message:", error);
    return errorResponse(res, 500, "Server error while fetching message");
  }
};

// ====================================================
// DELETE CONTACT MESSAGE
// ====================================================
export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndDelete(id);

    if (!message) {
      return errorResponse(res, 404, "Message not found");
    }

    return successResponse(res, 200, "Message deleted successfully");
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return errorResponse(res, 500, "Server error while deleting message");
  }
};