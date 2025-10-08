// /services/employerService.js
export const fetchEmployers = async (page = 1, searchTerm = "") => {
  // Mock employer data
  const allEmployers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@techcorp.com",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      companyName: "TechCorp",
      companyDescription: "Leading software solutions provider",
      companyWebsite: "https://techcorp.com",
      industry: "Technology",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@financehub.com",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      companyName: "FinanceHub",
      companyDescription: "Innovative financial services",
      companyWebsite: "https://financehub.com",
      industry: "Finance",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@healthplus.com",
      profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
      companyName: "HealthPlus",
      companyDescription: "Healthcare solutions and consulting",
      companyWebsite: "https://healthplus.com",
      industry: "Healthcare",
    },
    {
      id: 4,
      name: "Bob Williams",
      email: "bob@retailworld.com",
      profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
      companyName: "RetailWorld",
      companyDescription: "Global retail chain",
      companyWebsite: "https://retailworld.com",
      industry: "Retail",
    },
    {
      id: 5,
      name: "Sophia Lee",
      email: "sophia@pharmatech.com",
      profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
      companyName: "PharmaTech",
      companyDescription: "Pharmaceutical innovations",
      companyWebsite: "https://pharmatech.com",
      industry: "Pharmaceutical",
    },
  ];

  // Filter by search term
  const filtered = allEmployers.filter(
    (employer) =>
      employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination setup
  const employersPerPage = 2; // You can adjust rows per page
  const totalPages = Math.ceil(filtered.length / employersPerPage);
  const start = (page - 1) * employersPerPage;
  const end = start + employersPerPage;
  const employers = filtered.slice(start, end);

  // Simulate API delay
  await new Promise((res) => setTimeout(res, 500));

  return { employers, totalPages, total: filtered.length };
};
