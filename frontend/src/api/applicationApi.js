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

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { data } = await api.post("/user/my-applications", {}, config);
  return data.result; // backend sends applications under "result"
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

  // Match your backend route
  const { data } = await api.post(`/jobs/${applicationId}/withdraw`, {}, config);
  return data;
};

