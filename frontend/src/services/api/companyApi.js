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
// COMPANY API FUNCTIONS
// ==========================

// Create a new company
export const createCompany = async (companyData) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.post("/companies", companyData, config);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get company by ID
export const getCompanyById = async (companyId) => {
  try {
    const { data } = await api.get(`/companies/${companyId}`);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get companies with pagination
export const getCompanies = async (page = 1, limit = 10) => {
  try {
    const { data } = await api.get(`/companies?page=${page}&limit=${limit}`);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update company
export const updateCompany = async (companyId, companyData) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await api.put(`/companies/${companyId}`, companyData, config);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete company
export const deleteCompany = async (companyId) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const { data } = await api.delete(`/companies/${companyId}`);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get companies by owner
export const getMyCompanies = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const { data } = await api.get("/companies/my-companies");
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
  createCompany,
  getCompanyById,
  getCompanies,
  updateCompany,
  deleteCompany,
  getMyCompanies,
  setAuthToken,
};