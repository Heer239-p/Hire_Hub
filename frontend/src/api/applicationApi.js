import axios from "axios";

// Fetch all applications for the logged-in user
export const getMyApplications = async () => {
  const token = localStorage.getItem("token"); // JWT token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post("/api/applications/my-applications", {}, config);
  return data.data; // returns applications array
};

// Withdraw application
export const withdrawApplication = async (applicationId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(`/api/applications/${applicationId}/withdraw`, {}, config);
  return data;
};
