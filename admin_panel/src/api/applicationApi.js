import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/admin";

// Set up axios interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch all applications
export const fetchApplications = async (page = 1, limit = 10, searchTerm = "") => {
  try {
    const params = { page, limit };
    if (searchTerm) {
      params.search = searchTerm;
    }

    const response = await axios.post(`${API_BASE_URL}/applications`, params);
    
    if (response.data.success) {
      // Format the data to match the existing structure
      const formattedApplications = response.data.data.map(app => ({
        id: app._id,
        jobTitle: app.jobTitle || "N/A",
        applicant: app.applicant, // No fallback needed as it's properly formatted in backend
        email: app.email || "N/A",
        status: app.status || "Applied",
        appliedDate: new Date(app.appliedOn).toLocaleDateString() || "N/A"
      }));

      return {
        applications: formattedApplications,
        totalPages: response.data.totalPages,
        total: response.data.total,
        currentPage: response.data.currentPage
      };
    } else {
      throw new Error(response.data.message || "Failed to fetch applications");
    }
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

// Delete an application
export const deleteApplication = async (applicationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/applications/${applicationId}`);
    
    if (response.data.success) {
      return { success: true };
    } else {
      throw new Error(response.data.message || "Failed to delete application");
    }
  } catch (error) {
    console.error("Error deleting application:", error);
    throw error;
  }
};