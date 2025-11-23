import axios from "axios";

const BASE_URL = "http://localhost:5000/api/jobs";

export const getAllJobs = async (page = 1, limit = 3, filters = {}) => {
  try {
    const body = { page, limit, status: "Active", ...filters };

    const res = await axios.post(`${BASE_URL}/all-job`, body); // POST request

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



