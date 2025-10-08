import React, { useEffect, useState } from "react";
import { fetchApplications } from "../services/applicationServices"; // import service
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { Pagination, Select, MenuItem } from "@mui/material";

const ApplicationTable = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch applications on load or when filters change
  useEffect(() => {
    loadApplications();
  }, [page, searchTerm, rowsPerPage]);

  const loadApplications = async () => {
    try {
      const data = await fetchApplications(page, searchTerm, rowsPerPage);
      setApplications(data.applications);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  // Export to PDF
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

  // Export to CSV
  const csvData = applications.map((a) => ({
    "Job Title": a.jobTitle,
    Applicant: a.applicant,
    Email: a.email,
    Status: a.status,
    "Applied On": a.appliedDate,
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Applications</h1>

      {/* Search & Export */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="space-x-2">
          <button
            onClick={exportPDF}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>
          <CSVLink
            data={csvData}
            filename="applications.csv"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white text-sm border-t border-gray-300 border-collapse">
          <thead className="bg-blue-500 text-white uppercase text-sm">
            <tr>
              {["Job Title", "Applicant", "Email", "Status", "Applied On", "Actions"].map(
                (head) => (
                  <th key={head} className="p-3 text-left font-semibold">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {applications.length ? (
              applications.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{a.jobTitle}</td>
                  <td className="p-3">{a.applicant}</td>
                  <td className="p-3">{a.email}</td>
                  <td className="p-3">{a.status}</td>
                  <td className="p-3">{a.appliedDate}</td>
                  <td className="p-3 space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                      View
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-5 text-gray-500 border-t border-gray-300"
                >
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4 gap-4">
        {/* Left: Rows per page */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 text-sm font-medium">Show per page:</span>
          <Select
            value={rowsPerPage}
            size="small"
            onChange={(e) => {
              setRowsPerPage(e.target.value);
              setPage(1);
            }}
            className="bg-white"
          >
            {[5, 10, 20, 50].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Center: Page info */}
        <div className="text-gray-700 text-sm font-medium">
          Page {page} / {totalPages}
        </div>

        {/* Right: Pagination */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={0}
        />
      </div>
    </div>
  );
};

export default ApplicationTable;
