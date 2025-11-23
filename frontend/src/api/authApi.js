import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api/auth", // your backend URL
});

// ==========================
// REGISTER USER / EMPLOYER
// ==========================
export const registerUser = async (formData) => {
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await api.post("/register", formData, config);
    return data;
  } catch (error) {
    // IMPORTANT
    throw error;
  }
};

// ==========================
// LOGIN USER / EMPLOYER
// ==========================
export const loginUser = async (formData) => {
  const { data } = await api.post("/login", formData);
  return data;
};
// ==========================
// LOGOUT USER
// ==========================
export const logoutUser = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await api.post("/logout", {}, config);
  return data;
};