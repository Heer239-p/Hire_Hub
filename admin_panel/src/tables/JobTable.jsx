import React, { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi"; // 👈 added icons

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    loadJobs();
  }, [page, searchTerm, rowsPerPage]);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs(page, searchTerm, rowsPerPage);
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "Title",
          "Company",
          "Category",
          "Location",
          "Type",
          "Posted",
          "Expiry",
          "Apps",
          "Status",
        ],
      ],
      body: jobs.map((job) => [
        job.title,
        job.company,
        job.category,
        job.location,
        job.type,
        job.postedDate,
        job.expiryDate,
        job.applications,
        job.status,
      ]),
    });
    doc.save("jobs.pdf");
  };

  // Export to CSV
  const csvData = jobs.map((job) => ({
    Title: job.title,
    Company: job.company,
    Category: job.category,
    Location: job.location,
    Type: job.type,
    Posted: job.postedDate,
    Expiry: job.expiryDate,
    Applications: job.applications,
    Status: job.status,
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Jobs</h1>

      {/* Search & Export */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            filename="jobs.csv"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white text-sm border-t border-gray-300 border-collapse">
          <thead className="bg-blue-500 text-white uppercase text-sm">
            <tr>
              {[
                "Title",
                "Company",
                "Category",
                "Location",
                "Type",
                "Posted",
                "Expiry",
                "Apps",
                "Status",
                "Actions",
              ].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.length ? (
              jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">{job.company}</td>
                  <td className="p-3">{job.category}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3">{job.type}</td>
                  <td className="p-3">{job.postedDate}</td>
                  <td className="p-3">{job.expiryDate}</td>
                  <td className="p-3 text-center">{job.applications}</td>
                  <td className="p-3">{job.status}</td>

                  {/* 👇 Action Icons */}
                  <td className="p-3 flex items-center space-x-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      title="View Job"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      title="Edit Job"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Delete Job"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center p-5 text-gray-500 border-t border-gray-300"
                >
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 text-sm font-medium">
            Show per page:
          </span>
          <Select
            value={rowsPerPage}
            size="small"
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="bg-white"
          >
            {[5, 10, 20, 50].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="text-gray-700 text-sm font-medium">
          Page {page} / {totalPages}
        </div>

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

export default JobTable;
