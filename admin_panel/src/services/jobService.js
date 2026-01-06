import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Get admin token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("adminToken");
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Fetch all jobs with employer details
 * @param {number} page - Page number
 * @param {string} searchTerm - Search term to filter jobs
 * @param {number} limit - Number of jobs per page
 * @returns {Promise<Object>} Object containing jobs and pagination info
 */
export const fetchJobs = async (page = 1, searchTerm = "", limit = 10) => {
  try {
    const response = await apiClient.post("/admin/jobs", {
      page,
      limit,
      search: searchTerm
    });
    
    if (response.data.status === "success") {
      // Transform the data to match the existing format
      const jobs = response.data.data.map(job => ({
        id: job._id,
        title: job.title,
        description: job.description,
        company: job.company,
        category: job.category,
        location: job.location,
        jobType: job.jobType,
        salary: job.salaryType === "Fixed" 
          ? `₹${job.fixedSalary?.toLocaleString()}` 
          : job.salaryType === "Range" 
          ? `₹${job.salaryRange?.from?.toLocaleString()} - ₹${job.salaryRange?.to?.toLocaleString()}`
          : "Not specified",
        applicants: job.applicants || 0,
        status: job.status,
        employer: job.employer ? `${job.employer.firstName} ${job.employer.lastName}` : "Unknown Employer",
        createdAt: new Date(job.createdAt).toLocaleDateString(),
        attachment: job.attachment || null // Add attachment field
      }));
      
      return {
        jobs,
        total: jobs.length,
        currentPage: page,
        totalPages: Math.ceil(jobs.length / limit)
      };
    } else {
      throw new Error(response.data.message || "Failed to fetch jobs");
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

/**
 * Add a new job
 * @param {Object} jobData - Job data to create
 * @returns {Promise<Object>} Created job object
 */
export const addJob = async (jobData) => {
  try {
    const response = await apiClient.post("/jobs", jobData);
    if (response.data.status === "success") {
      // Transform the data to match the existing format
      const job = response.data.data;
      return {
        id: job._id,
        title: job.title,
        description: job.description,
        company: job.company,
        category: job.category,
        location: job.location,
        jobType: job.jobType,
        salary: job.salaryType === "Fixed" 
          ? `₹${job.fixedSalary?.toLocaleString()}` 
          : job.salaryType === "Range" 
          ? `₹${job.salaryRange?.from?.toLocaleString()} - ₹${job.salaryRange?.to?.toLocaleString()}`
          : "Not specified",
        applicants: job.applicants || 0,
        status: job.status,
        employer: job.employer ? `${job.employer.firstName} ${job.employer.lastName}` : "Unknown Employer",
        createdAt: new Date(job.createdAt).toLocaleDateString(),
        attachment: job.attachment || null // Add attachment field
      };
    } else {
      throw new Error(response.data.message || "Failed to create job");
    }
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

/**
 * Update an existing job
 * @param {string} jobId - ID of the job to update
 * @param {Object} jobData - Updated job data
 * @returns {Promise<Object>} Updated job object
 */
export const updateJob = async (jobId, jobData) => {
  try {
    const response = await apiClient.post(`/admin/jobs/update/${jobId}`, jobData);
    if (response.data.status === "success") {
      // Transform the data to match the existing format
      const job = response.data.data;
      return {
        id: job._id,
        title: job.title,
        description: job.description,
        company: job.company,
        category: job.category,
        location: job.location,
        jobType: job.jobType,
        salary: job.salaryType === "Fixed" 
          ? `₹${job.fixedSalary?.toLocaleString()}` 
          : job.salaryType === "Range" 
          ? `₹${job.salaryRange?.from?.toLocaleString()} - ₹${job.salaryRange?.to?.toLocaleString()}`
          : "Not specified",
        applicants: job.applicants || 0,
        status: job.status,
        employer: job.employer ? `${job.employer.firstName} ${job.employer.lastName}` : "Unknown Employer",
        createdAt: new Date(job.createdAt).toLocaleDateString(),
        attachment: job.attachment || null // Add attachment field
      };
    } else {
      throw new Error(response.data.message || "Failed to update job");
    }
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

/**
 * Delete a job
 * @param {string} jobId - ID of the job to delete
 * @returns {Promise<boolean>} True if deletion was successful
 */
export const deleteJob = async (jobId) => {
  try {
    // Use the admin endpoint for job deletion
    const response = await apiClient.post(`/admin/jobs/delete/${jobId}`);
    return response.data.status === "success";
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};