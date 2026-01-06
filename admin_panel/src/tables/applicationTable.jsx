import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { Pagination, Select, MenuItem } from "@mui/material";
import { fetchApplications } from "../api/applicationApi";

const ApplicationTable = () => {
  const [applications, setApplications] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch applications from API
  useEffect(() => {
    loadApplications();
  }, [page, searchTerm]);

  const loadApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchApplications(page, rowsPerPage, searchTerm);
      setApplications(response.applications);
      setTotalPages(response.totalPages || 1);
      // Update current page if it's different
      if (response.currentPage && response.currentPage !== page) {
        setPage(response.currentPage);
      }
    } catch (err) {
      console.error("Failed to load applications:", err);
      setError("Failed to load applications. Showing local data.");
      // Fallback to localStorage if API fails
      const saved = localStorage.getItem("applications");
      if (saved) {
        setApplications(JSON.parse(saved));
        setTotalPages(1); // Reset pagination for localStorage data
      }
    } finally {
      setLoading(false);
    }
  };

  // All actions have been removed as per requirements

  // Displayed applications (already paginated by server)
  const displayedApplications = applications;

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Job Title", "Applicant", "Email", "Status", "Applied On"]],
      body: applications.map((a) => [
        a.jobTitle,
        a.applicant,
        a.email,
        a.status,
        a.appliedDate,
      ]),
    });
    doc.save("applications.pdf");
  };

  const csvData = applications.map((a) => ({
    "Job Title": a.jobTitle,
    Applicant: a.applicant,
    Email: a.email,
    Status: a.status,
    "Applied On": a.appliedDate,
  }));

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Manage Applications</h1>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex items-center space-x-2">
          <button
            onClick={exportPDF}
            className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>
          <CSVLink
            data={csvData}
            filename="applications.csv"
            className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto rounded-lg shadow dark:shadow-gray-900">
        <table className="w-full bg-white dark:bg-gray-800 text-sm border-t border-gray-300 dark:border-gray-700 border-collapse">
          <thead className="bg-blue-500 dark:bg-blue-700 text-white uppercase text-sm">
            <tr>
              {["Job Title", "Applicant", "Email", "Status", "Applied On"].map(
                (head) => <th key={head} className="p-3 text-left font-semibold">{head}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500 border-t border-gray-300">
                  Loading applications...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center p-5 text-red-500 border-t border-gray-300">
                  {error}
                </td>
              </tr>
            ) : displayedApplications.length ? (
              displayedApplications.map((a) => (
                <tr key={a.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3 text-gray-900 dark:text-gray-100">{a.jobTitle}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{a.applicant}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{a.email}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{a.status}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{a.appliedDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500 border-t border-gray-300">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 text-sm font-medium">Show per page:</span>
          <Select
            value={rowsPerPage}
            size="small"
            onChange={(e) => { setRowsPerPage(e.target.value); setPage(1); }}
            className="bg-white"
          >
            {[5, 10, 20, 50].map((num) => <MenuItem key={num} value={num}>{num}</MenuItem>)}
          </Select>
        </div>

        <div className="text-gray-700 text-sm font-medium">
          Page {page} / {totalPages || 1}
        </div>

        <Pagination
          count={totalPages || 1}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={0}
        />
      </div>



      {/* No modals as per requirements */}
    </div>
  );
};

export default ApplicationTable;
