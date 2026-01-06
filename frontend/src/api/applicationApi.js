import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
});

// Fetch all applications for logged-in user
export const getMyApplications = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  if (!token) throw new Error("No token found, login required");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  try {
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

export const withdrawApplication = async (applicationId) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  if (!token) throw new Error("No token found, login required");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await api.delete(`/user/applications/${applicationId}/withdraw`, config);
  return data;
};

// Apply for a job
export const applyJob = async (jobId, formData) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  if (!token) throw new Error("No token found, login required");

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  };

  const { data } = await api.post(`/user/${jobId}/apply`, formData, config);
  return data;
};

// Get applicants for a specific job (Employer only)
export const getApplicantsForJob = async (jobId) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  if (!token) throw new Error("No token found, login required");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get(`/jobs/${jobId}/applicants`, config);
    return response.data.result || [];
  } catch (error) {
    console.error("Error fetching applicants:", error);
    throw error;
  }
};

// Get detailed application info (Employer only)
export const getApplicationDetails = async (applicationId) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  if (!token) throw new Error("No token found, login required");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get(`/jobs/applications/${applicationId}`, config);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching application details:", error);
    throw error;
  }
};

// Update application status (Employer/Admin only)
export const updateApplicationStatus = async (applicationId, status) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  if (!token) throw new Error("No token found, login required");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.post(
      `/jobs/applications/${applicationId}/status`,
      { status },
      config
    );
    return response.data.result;
  } catch (error) {
    console.error("Error updating application status:", error);
    throw error;
  }
};