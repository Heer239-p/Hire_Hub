
// /services/jobService.js
export const fetchJobs = async (page = 1, searchTerm = "") => {
  // Mock job data
  const allJobs = [
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

  return { jobs, totalPages };
};
