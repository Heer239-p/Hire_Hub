import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
});

// Fetch all users with role = "user"
export const getOnlyUsers = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // POST method matches your backend route
  const { data } = await api.post("/user", {}, config);
  return data.data; // return only the array of users
};

export const updateUserProfile = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const { data } = await api.post("/user/profile", formData, config);
  return data;
};
