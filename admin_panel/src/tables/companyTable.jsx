import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiPlus } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import AddModel from "../models/company/addModel";
import ViewModel from "../models/company/viewModel";
// Import the company service
import { fetchCompanies as fetchCompaniesService } from "../services/companyService";
// Removed UpdateModel and DeleteModel since we're removing edit/delete functionality

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate();

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  // Removed openUpdate and openDelete since we're removing edit/delete functionality

  // Fetch companies from backend API using the service
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await fetchCompaniesService(page, searchTerm, rowsPerPage);
      setCompanies(data.companies);
      setTotalPages(data.totalPages);
      setTotalCompanies(data.total);
    } catch (err) {
      setError("Error fetching companies: " + err.message);
      toast.error("Error fetching companies: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page, searchTerm, rowsPerPage]);

  // Export handlers
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Company Name", "Industry", "Website", "Description"]],
      body: companies.map((c) => [
        c.companyName || "N/A",
        c.industry || "N/A",
        c.companyWebsite || "N/A",
        c.companyDescription || "N/A",
      ]),
    });
    doc.save("companies.pdf");
  };

  const csvData = companies.map((c) => ({
    "Company Name": c.companyName || "N/A",
    "Industry": c.industry || "N/A",
    "Website": c.companyWebsite || "N/A",
    "Description": c.companyDescription || "N/A",
  }));

  // CRUD Handlers (only keeping the ones we need)
  const handleAddCompany = (newCompany) => {
    // This would typically make an API call to add the company
    // For now, we'll just show a toast
    toast.success("Company added successfully!");
    // Refresh the companies list
    fetchCompanies();
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
        <div>Loading companies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Manage Companies
      </h1>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center space-x-2">
          {/* <button
            onClick={() => setOpenAdd(true)}
            className="flex items-center bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <FiPlus className="mr-2" size={18} /> Add Company
          </button> */}

          <button
            onClick={exportPDF}
            className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>

          <CSVLink
            data={csvData}
            filename="companies.csv"
            className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Companies Table */}
      <div className="overflow-x-auto rounded-lg shadow dark:shadow-gray-900">
        <table className="w-full bg-white dark:bg-gray-800 text-sm border-t border-gray-300 dark:border-gray-700 border-collapse">
          <thead className="bg-blue-500 dark:bg-blue-700 text-white uppercase text-sm">
            <tr>
              {["Company Name", "Industry", "Website", "Description", "Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {companies.length ? (
              companies.map((c) => (
                <tr key={c._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3 text-gray-900 dark:text-gray-100 font-semibold">{c.companyName || "N/A"}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{c.industry || "N/A"}</td>
                  <td className="p-3">
                    {c.companyWebsite ? (
                      <a
                        href={c.companyWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 dark:text-blue-400 hover:underline"
                      >
                        {c.companyWebsite}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{c.companyDescription || "N/A"}</td>
                  <td className="p-3 flex items-center space-x-3">
                    <button
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      onClick={() => {
                        setSelectedCompany(c);
                        setOpenView(true);
                      }}
                    >
                      <FiEye size={18} />
                    </button>
                    {/* Removed Edit and Delete buttons as per requirements */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-5 text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700"
                >
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Show per page:</span>
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

        <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          Page {page} / {totalPages} 
        </div>

        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          shape="rounded"
          siblingCount={0}
          boundaryCount={0}
        />
      </div>

      {/* Modals */}
      {openAdd && (
        <AddModel onClose={() => setOpenAdd(false)} onAdd={handleAddCompany} />
      )}
      {openView && selectedCompany && (
        <ViewModel company={selectedCompany} onClose={() => setOpenView(false)} />
      )}
      {/* Removed UpdateModel and DeleteModel modals as per requirements */}
    </div>
  );
};

export default CompaniesTable;