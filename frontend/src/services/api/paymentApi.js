import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
});

// Set token for authenticated requests
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Register setAuthToken globally
if (typeof window !== "undefined") {
  // Client-side only
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    setAuthToken(token);
  }
}

// ==========================
// PAYMENT API FUNCTIONS
// ==========================

// Create subscription payment
export const createSubscriptionPayment = async (paymentData) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const { data } = await api.post("/payment/subscription", paymentData);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create job payment
export const createJobPayment = async (paymentData) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const { data } = await api.post("/payment/job", paymentData);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get user payments
export const getUserPayments = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const { data } = await api.get("/payment/my-payments");
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get payment by ID
export const getPaymentById = async (paymentId) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const { data } = await api.get(`/payment/${paymentId}`);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};