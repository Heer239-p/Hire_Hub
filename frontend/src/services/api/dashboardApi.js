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
// DASHBOARD API FUNCTIONS
// ==========================

// Get employer dashboard stats
export const getEmployerDashboardStats = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const { data } = await api.get("/company/dashboard/stats");
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};