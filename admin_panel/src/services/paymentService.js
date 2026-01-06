import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/admin";

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
 * Fetch all payments with employer and job details
 * @returns {Promise<Array>} Array of payment objects
 */
export const fetchAllPayments = async () => {
  try {
    const response = await apiClient.get("/payments");
    if (response.data.success) {
      return response.data.data.map(payment => ({
        id: payment._id,
        transactionId: payment.transactionId,
        userName: payment.employer && payment.employer.firstName ? 
          [payment.employer.firstName, payment.employer.lastName].filter(Boolean).join(' ') || "Unknown User" : 
          "Unknown User",
        userEmail: payment.employer?.email || "N/A",
        jobId: payment.job?._id || null,
        jobTitle: payment.job?.title || "N/A",
        amount: payment.amount,
        date: new Date(payment.createdAt).toLocaleDateString(),
        status: payment.status,
        method: payment.paymentMethod,
      }));
    } else {
      throw new Error(response.data.message || "Failed to fetch payments");
    }
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};