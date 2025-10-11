import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

import AddModel from "../models/company/addModel";
import ViewModel from "../models/company/viewModel";
import UpdateModel from "../models/company/updateModel";
import DeleteModel from "../models/company/deleteModel";

const CompaniesTable = () => {
  // Load from localStorage if exists, or default sample data
  const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [
    {
      id: 1,
      name: "Google",
      industry: "Technology",
      website: "https://google.com",
      description: "Leading search engine and technology company",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    },
    {
      id: 2,
      name: "Microsoft",
      industry: "Technology",
      website: "https://microsoft.com",
      description: "Global technology company and software provider",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/768px-Microsoft_logo.svg.png",
    },
    {
      id: 3,
      name: "Apple",
      industry: "Technology",
      website: "https://apple.com",
      description: "Consumer electronics and software company",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png",
    },
    {
      id: 4,
      name: "Amazon",
      industry: "E-commerce",
      website: "https://amazon.com",
      description: "E-commerce and cloud computing company",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png",
    },
    {
      id: 5,
      name: "Meta",
      industry: "Social Media",
      website: "https://meta.com",
      description: "Social media and technology conglomerate",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/768px-Meta_Platforms_Inc._logo.svg.png",
    },
  ];

  const [companies, setCompanies] = useState(storedCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Persist changes in localStorage
  useEffect(() => {
    localStorage.setItem("companies", JSON.stringify(companies));
  }, [companies]);

  // Filtered and paginated companies
  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCompanies.length / rowsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Export handlers
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Industry", "Website", "Description"]],
      body: filteredCompanies.map((c) => [
        c.name,
        c.industry,
        c.website,
        c.description,
      ]),
    });
    doc.save("companies.pdf");
  };

  const csvData = filteredCompanies.map((c) => ({
    Name: c.name,
    Industry: c.industry,
    Website: c.website,
    Description: c.description,
  }));

  // CRUD Handlers
  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, { id: Date.now(), ...newCompany }]);
  };

  const handleUpdateCompany = (updatedCompany) => {
    setCompanies(
      companies.map((c) => (c.id === updatedCompany.id ? updatedCompany : c))
    );
  };

  const handleDeleteCompany = (id) => {
    setCompanies(companies.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
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
          <button
            onClick={() => setOpenAdd(true)}
            className="flex items-center bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <FiPlus className="mr-2" size={18} /> Add Company
          </button>

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
              {["Logo", "Name", "Industry", "Website", "Description", "Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedCompanies.length ? (
              paginatedCompanies.map((c) => (
                <tr key={c.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3">
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="w-12 h-12 object-contain rounded"
                    />
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-100 font-semibold">{c.name}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{c.industry}</td>
                  <td className="p-3">
                    <a
                      href={c.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      {c.website}
                    </a>
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{c.description}</td>
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
                    <button
                      className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                      onClick={() => {
                        setSelectedCompany(c);
                        setOpenUpdate(true);
                      }}
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      onClick={() => {
                        setSelectedCompany(c);
                        setOpenDelete(true);
                      }}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
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
      {openUpdate && selectedCompany && (
        <UpdateModel
          company={selectedCompany}
          onClose={() => setOpenUpdate(false)}
          onUpdate={handleUpdateCompany}
        />
      )}
      {openDelete && selectedCompany && (
        <DeleteModel
          company={selectedCompany}
          onClose={() => setOpenDelete(false)}
          onDelete={handleDeleteCompany}
        />
      )}
    </div>
  );
};

export default CompaniesTable;
