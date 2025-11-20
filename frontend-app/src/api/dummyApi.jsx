export const dummyAPI = {
  login: async (role, email, password) => {
    return {
      success: true,
      token: "dummy-token-123",
      role,
      user: { name: "Demo User", email },
    };
  },

  register: async (role, data) => {
    return {
      success: true,
      message: "Registration successful",
      role,
      user: data,
    };
  },

  postJob: async (jobData) => {
    return { success: true, job: jobData };
  },

  getJobs: async () => {
    return [
      { id: 1, title: "React Developer", company: "ABC Ltd", location: "Remote" },
      { id: 2, title: "Python Developer", company: "XYZ Pvt", location: "Mumbai" },
    ];
  },

  getEmployerJobs: async () => {
    return [
      { id: 1, title: "Node.js Developer", applicants: 5 },
      { id: 2, title: "UI/UX Designer", applicants: 3 },
    ];
  },
};
