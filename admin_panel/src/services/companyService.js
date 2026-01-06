// /services/companyService.js
export const fetchCompanies = async (page = 1, searchTerm = "", rowsPerPage = 5) => {
  try {
    // Get admin token from localStorage
    const token = localStorage.getItem("adminToken");
    
    if (!token) {
      throw new Error("No admin token found. Please log in again.");
    }

    // Make API call to fetch companies
    const response = await fetch("http://localhost:5000/api/admin/companies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      // Filter companies by search term if provided
      let filteredCompanies = data.companies;
      if (searchTerm) {
        filteredCompanies = data.companies.filter(
          (c) =>
            (c.companyName && c.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (c.industry && c.industry.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (c.companyWebsite && c.companyWebsite.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (c.companyDescription && c.companyDescription.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      // Pagination setup
      const totalPages = Math.ceil(filteredCompanies.length / rowsPerPage);
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      const companies = filteredCompanies.slice(start, end);

      return { companies, totalPages, total: filteredCompanies.length };
    } else {
      throw new Error(data.message || "Failed to fetch companies");
    }
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};