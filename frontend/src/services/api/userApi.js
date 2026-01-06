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
// USER API FUNCTIONS
// ==========================

// Fetch all users with role = "user"
export const getOnlyUsers = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // POST method matches your backend route
    const { data } = await api.post("/user", {}, config);
    return data.data; // return only the array of users
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update user profile
export const updateUserProfile = async (formData) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await api.post("/user/profile", formData, config);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await api.get("/user/profile", config);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
