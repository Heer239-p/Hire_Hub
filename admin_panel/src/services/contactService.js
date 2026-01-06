import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/contact";

// Get admin token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("adminToken");
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Fetch all contact messages (reviews)
 * @returns {Promise<Array>} Array of contact messages
 */
export const fetchAllContactMessages = async () => {
  try {
    const response = await apiClient.get("/");
    if (response.data.status === "success") {
      return response.data.result.map(message => ({
        id: message._id,
        userName: message.name,
        email: message.email,
        companyName: "N/A", // Not available in contact model
        rating: message.rating,
        review: message.message,
        date: new Date(message.createdAt).toLocaleDateString(),
      }));
    } else {
      throw new Error(response.data.message || "Failed to fetch contact messages");
    }
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    throw error;
  }
};

/**
 * Delete a contact message by ID
 * @param {string} id - The ID of the contact message to delete
 * @returns {Promise<Object>} Response data
 */
export const deleteContactMessage = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "Failed to delete contact message");
    }
  } catch (error) {
    console.error("Error deleting contact message:", error);
    throw error;
  }
};