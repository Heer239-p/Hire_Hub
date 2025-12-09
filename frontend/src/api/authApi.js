import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api/auth", 
});

// ==========================
// REGISTER USER / EMPLOYER
// ==========================
export const registerUser = async (formData) => {
  try {
    const config = { 
      headers: { "Content-Type": "multipart/form-data" } 
    };

    const { data } = await api.post("/register", formData, config);

    // 👉 Save token to localStorage
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// ==========================
// LOGIN USER / EMPLOYER
// ==========================
export const loginUser = async (formData) => {
  const { data } = await api.post("/login", formData);

  // 👉 Save token
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

// ==========================
// LOGOUT USER
// ==========================
export const logoutUser = async () => {
  const token = localStorage.getItem("token");

  const config = { 
    headers: { Authorization: `Bearer ${token}` } 
  };

  const { data } = await api.post("/logout", {}, config);

  // 👉 Remove token
  localStorage.removeItem("token");

  return data;
};
