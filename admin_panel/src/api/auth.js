import axios from "axios";

export const loginAdmin = async (email, password) => {
  const { data } = await axios.post(
    "http://localhost:5000/api/auth/login",
    { email, password }
  );

  // store token in localStorage
  if (data.token) {
    localStorage.setItem("adminToken", data.token);
  }

  return data;
};

export const isAdminAuthenticated = () => {
  return localStorage.getItem("adminToken") !== null;
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
};
