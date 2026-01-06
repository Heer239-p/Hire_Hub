import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api/auth", // backend base URL
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
// AUTH API FUNCTIONS
// ==========================

// Register user/employer
export const registerUser = async (formData) => {
  try {
    const config = { 
      headers: { "Content-Type": "multipart/form-data" } 
    };

    const { data } = await api.post("/register", formData, config);

    // Save user info to localStorage
    if (data.token) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }

    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login user/employer
export const loginUser = async (userData) => {
  try {
    const config = { 
      headers: { "Content-Type": "application/json" } 
    };

    const { data } = await api.post("/login", userData, config);

    // Save user info to localStorage
    if (data.token) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }

    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = { 
      headers: { Authorization: `Bearer ${token}` } 
    };

    const { data } = await api.post("/logout", {}, config);

    // Remove user info
    localStorage.removeItem("userInfo");

    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
