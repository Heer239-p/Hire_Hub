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
// APPLICATION API FUNCTIONS
// ==========================

// Apply for a job
export const applyJob = async (jobId, formData) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.post(`/user/${jobId}/apply`, formData, config);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all applications for logged-in user
export const getMyApplications = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await api.post("/user/my-applications", {}, config);
    // backend sometimes sends result, sometimes data
    return data.result || data.data || [];
  } catch (error) {
    // If backend returns 404 for this endpoint (no applications yet),
    // treat it as "no data" instead of an error.
    const status = error.response?.status;
    if (status === 404) {
      return [];
    }

    throw error;
  }
};

// Withdraw an application
export const withdrawApplication = async (applicationId) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.post(`/jobs/${applicationId}/withdraw`, {}, config);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all applications for employer's jobs
export const getMyJobApplications = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.post("/jobs/applications", {}, config);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update application status (Admin/Employer)
export const updateApplicationStatus = async (applicationId, status) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.post(`/jobs/applications/${applicationId}/status`, { status }, config);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
