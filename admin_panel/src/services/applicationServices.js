// /services/applicationService.js
export const fetchApplications = async (page = 1, searchTerm = "") => {
  // Mock applications data
  const allApplications = [
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

  return { applications, totalPages , total: filtered.length};
};
