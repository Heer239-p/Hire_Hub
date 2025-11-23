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

  const { data } = await api.post("/user/my-applications", {}, config);

  // backend sometimes sends result, sometimes data
  return data.result || data.data || [];
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

