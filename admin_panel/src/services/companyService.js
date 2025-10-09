// /services/companyService.js
export const fetchCompanies = async (page = 1, searchTerm = "", rowsPerPage = 5) => {
  // Mock data (you can replace this with API call later)
  const allCompanies = [
    { id: 1, name: "ABC Corp", location: "New York", industry: "Tech", status: "Active" },
    { id: 2, name: "XYZ Ltd", location: "California", industry: "Finance", status: "Active" },
    { id: 3, name: "Acme Inc", location: "Texas", industry: "Manufacturing", status: "Inactive" },
    { id: 4, name: "Globex", location: "Florida", industry: "Retail", status: "Active" },
    { id: 5, name: "Initech", location: "New Jersey", industry: "IT", status: "Active" },
    { id: 6, name: "Umbrella", location: "Nevada", industry: "Pharma", status: "Inactive" },
  ];

  // 🔍 Filter companies by search term
  const filtered = allCompanies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 Pagination setup
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const companies = filtered.slice(start, end);

  // Simulate async API delay
  await new Promise((res) => setTimeout(res, 400));

  return { companies, totalPages, total: filtered.length };
};
