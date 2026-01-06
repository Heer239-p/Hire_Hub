import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Send contact message
export const sendContactMessage = async (contactData) => {
  try {
    const response = await api.post("/contact", contactData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send message" };
  }
};

// Get all contact messages
export const getAllContactMessages = async () => {
  try {
    const response = await api.get("/contact");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch messages" };
  }
};

export default {
  sendContactMessage,
  getAllContactMessages,
};