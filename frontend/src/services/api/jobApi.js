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
// JOB API FUNCTIONS
// ==========================

// Get all jobs with filters and pagination
export const getAllJobs = async (page = 1, limit = 10, filters = {}) => {
  try {
    const body = { page, limit, status: "Active", ...filters };

    const res = await api.post("/jobs/all-job", body); // POST request

    // Validate backend response structure
    const data = res?.data?.result;
    if (!data || !Array.isArray(data.jobs)) {
      console.error("Unexpected data structure from backend:", res.data);
      return { jobs: [], totalPages: 1 };
    }

    const { jobs, totalPages } = data;

    return { jobs, totalPages: totalPages || 1 };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { jobs: [], totalPages: 1 };
  }
};

// Create a new job
export const createJob = async (jobData) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    for (const key in jobData) {
      formData.append(key, jobData[key]);
    }

    const { data } = await api.post("/jobs", formData, config);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get jobs posted by logged-in employer
export const getMyJobs = async (page = 1, limit = 10, filters = {}) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    // Prepare request body with pagination and filters
    const requestBody = { page, limit, ...filters };

    const { data } = await api.post("/jobs/my-jobs", requestBody);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a job
export const updateJob = async (jobId, jobData) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    for (const key in jobData) {
      formData.append(key, jobData[key]);
    }

    const { data } = await api.put(`/jobs/${jobId}`, formData, config);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a job
export const deleteJob = async (jobId) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    setAuthToken(token);

    const { data } = await api.delete(`/jobs/${jobId}`);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
