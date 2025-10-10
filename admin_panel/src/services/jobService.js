// /services/jobService.js

// Initialize default jobs in localStorage if not present
const initializeJobs = () => {
  const stored = localStorage.getItem("jobs");
  if (!stored) {
    const defaultJobs = [
      {
        id: 1,
        title: "Frontend Developer",
        company: "TechCorp",  
        category: "IT",
        location: "New York",
        type: "Full-Time",
        postedDate: "2025-10-01",
        expiryDate: "2025-11-01",
        applications: 25,
        status: "Active",
      },
      {
        id: 2,
        title: "UI/UX Designer",
        company: "DesignPro",
        category: "Design",
        location: "London",
        type: "Part-Time",
        postedDate: "2025-09-28",
        expiryDate: "2025-10-28",
        applications: 15,
        status: "Active",
      },
      {
        id: 3,
        title: "Backend Engineer",
        company: "CodeHub",
        category: "Development",
        location: "Toronto",
        type: "Remote",
        postedDate: "2025-09-15",
        expiryDate: "2025-10-15",
        applications: 40,
        status: "Closed",
      },
      {
        id: 4,
        title: "HR Manager",
        company: "BizWorld",
        category: "Human Resources",
        location: "Berlin",
        type: "Full-Time",
        postedDate: "2025-09-10",
        expiryDate: "2025-10-10",
        applications: 10,
        status: "Active",
      },
    ];
    localStorage.setItem("jobs", JSON.stringify(defaultJobs));
  }
};

export const fetchJobs = async (page = 1, searchTerm = "") => {
  // Initialize jobs if not present
  initializeJobs();
  
  // Get jobs from localStorage
  const allJobs = JSON.parse(localStorage.getItem("jobs") || "[]");

  // Filter by search term
  const filtered = allJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination setup
  const jobsPerPage = 2;
  const totalPages = Math.ceil(filtered.length / jobsPerPage);
  const start = (page - 1) * jobsPerPage;
  const end = start + jobsPerPage;
  const jobs = filtered.slice(start, end);

  // Simulate API delay
  await new Promise((res) => setTimeout(res, 500));

  return { jobs, totalPages, total: filtered.length };
};

// Add a new job
export const addJob = async (jobData) => {
  initializeJobs();
  const allJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
  
  // Generate new ID
  const newId = allJobs.length > 0 ? Math.max(...allJobs.map(j => j.id)) + 1 : 1;
  
  // Create new job object
  const newJob = {
    id: newId,
    title: jobData.title,
    company: jobData.company,
    category: jobData.category,
    location: jobData.location,
    type: jobData.type,
    postedDate: jobData.postedDate || new Date().toISOString().split('T')[0],
    expiryDate: jobData.expiryDate,
    applications: jobData.applications || 0,
    status: jobData.status || "Active",
  };
  
  // Add to array and save
  allJobs.push(newJob);
  localStorage.setItem("jobs", JSON.stringify(allJobs));
  
  console.log("✅ Job added to localStorage:", newJob);
  console.log("✅ Total jobs in localStorage:", allJobs.length);
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event("localStorageUpdated"));
  
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 300));
  
  return newJob;
};

// Update a job
export const updateJob = async (jobId, jobData) => {
  const allJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
  const index = allJobs.findIndex(j => j.id === jobId);
  
  if (index !== -1) {
    allJobs[index] = { ...allJobs[index], ...jobData };
    localStorage.setItem("jobs", JSON.stringify(allJobs));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("localStorageUpdated"));
  }
  
  await new Promise((res) => setTimeout(res, 300));
  return allJobs[index];
};

// Delete a job
export const deleteJob = async (jobId) => {
  const allJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
  const filtered = allJobs.filter(j => j.id !== jobId);
  localStorage.setItem("jobs", JSON.stringify(filtered));
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event("localStorageUpdated"));
  
  await new Promise((res) => setTimeout(res, 300));
  return true;
};
