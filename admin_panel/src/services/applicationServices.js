// /services/applicationService.js

// Initialize default applications in localStorage if not present
const initializeApplications = () => {
  const stored = localStorage.getItem("applications");
  if (!stored) {
    const defaultApplications = [
      {
        id: 1,
        jobTitle: "Frontend Developer",
        applicant: "John Doe",
        email: "john.doe@example.com",
        status: "Pending",
        appliedDate: "2025-10-02",
      },
      {
        id: 2,
        jobTitle: "Backend Developer",
        applicant: "Jane Smith",
        email: "jane.smith@example.com",
        status: "Approved",
        appliedDate: "2025-09-30",
      },
      {
        id: 3,
        jobTitle: "UI/UX Designer",
        applicant: "Michael Brown",
        email: "michael.brown@example.com",
        status: "Rejected",
        appliedDate: "2025-09-28",
      },
      {
        id: 4,
        jobTitle: "Full Stack Developer",
        applicant: "Emily Johnson",
        email: "emily.johnson@example.com",
        status: "Pending",
        appliedDate: "2025-09-25",
      },
      {
        id: 5,
        jobTitle: "Data Analyst",
        applicant: "David Wilson",
        email: "david.wilson@example.com",
        status: "Approved",
        appliedDate: "2025-09-22",
      },
      {
        id: 6,
        jobTitle: "QA Tester",
        applicant: "Sophia Lee",
        email: "sophia.lee@example.com",
        status: "Pending",
        appliedDate: "2025-09-20",
      },
    ];
    localStorage.setItem("applications", JSON.stringify(defaultApplications));
  }
};

export const fetchApplications = async (page = 1, searchTerm = "") => {
  // Initialize applications if not present
  initializeApplications();
  
  // Get applications from localStorage
  const allApplications = JSON.parse(localStorage.getItem("applications") || "[]");

  // Filter by search term
  const filtered = allApplications.filter(
    (app) =>
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination setup
  const appsPerPage = 2;
  const totalPages = Math.ceil(filtered.length / appsPerPage);
  const start = (page - 1) * appsPerPage;
  const end = start + appsPerPage;
  const applications = filtered.slice(start, end);

  // Simulate API delay
  await new Promise((res) => setTimeout(res, 500));

  return { applications, totalPages, total: filtered.length };
};

// Add a new application
export const addApplication = async (appData) => {
  initializeApplications();
  const allApplications = JSON.parse(localStorage.getItem("applications") || "[]");
  
  // Generate new ID
  const newId = allApplications.length > 0 ? Math.max(...allApplications.map(a => a.id)) + 1 : 1;
  
  // Create new application object
  const newApplication = {
    id: newId,
    jobTitle: appData.jobTitle,
    applicant: appData.applicant,
    email: appData.email,
    status: appData.status || "Pending",
    appliedDate: appData.appliedDate || new Date().toISOString().split('T')[0],
  };
  
  // Add to array and save
  allApplications.push(newApplication);
  localStorage.setItem("applications", JSON.stringify(allApplications));
  
  console.log("✅ Application added to localStorage:", newApplication);
  console.log("✅ Total applications in localStorage:", allApplications.length);
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event("localStorageUpdated"));
  
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 300));
  
  return newApplication;
};

// Update an application
export const updateApplication = async (appId, appData) => {
  const allApplications = JSON.parse(localStorage.getItem("applications") || "[]");
  const index = allApplications.findIndex(a => a.id === appId);
  
  if (index !== -1) {
    allApplications[index] = { ...allApplications[index], ...appData };
    localStorage.setItem("applications", JSON.stringify(allApplications));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("localStorageUpdated"));
  }
  
  await new Promise((res) => setTimeout(res, 300));
  return allApplications[index];
};

// Delete an application
export const deleteApplication = async (appId) => {
  const allApplications = JSON.parse(localStorage.getItem("applications") || "[]");
  const filtered = allApplications.filter(a => a.id !== appId);
  localStorage.setItem("applications", JSON.stringify(filtered));
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event("localStorageUpdated"));
  
  await new Promise((res) => setTimeout(res, 300));
  return true;
};
