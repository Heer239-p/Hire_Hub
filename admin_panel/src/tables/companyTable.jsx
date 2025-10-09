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
      name: "TechCorp",
      industry: "IT",
      website: "https://techcorp.com",
      description: "Leading software solutions provider",
      logo: "https://www.clipartmax.com/png/middle/183-1833550_company-profile-icon.png", // Updated default logo
    },
    {
      id: 2,
      name: "DesignHub",
      industry: "Design",
      website: "https://designhub.com",
      description: "Creative design agency",
      logo: "https://www.clipartmax.com/png/middle/183-1833550_company-profile-icon.png", // Updated default logo
    },
    {
      id: 3,
      name: "HealthPlus",
      industry: "Healthcare",
      website: "https://healthplus.com",
      description: "Healthcare solutions and consulting",
      logo: "https://www.clipartmax.com/png/middle/183-1833550_company-profile-icon.png", // Updated default logo
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
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
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setOpenAdd(true)}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <FiPlus className="mr-2" size={18} /> Add Company
          </button>

          <button
            onClick={exportPDF}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>

          <CSVLink
            data={csvData}
            filename="companies.csv"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Companies Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white text-sm border-t border-gray-300 border-collapse">
          <thead className="bg-blue-500 text-white uppercase text-sm">
            <tr>
              {["Name", "Industry", "Website", "Description", "Logo", "Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedCompanies.length ? (
              paginatedCompanies.map((c) => (
                <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.industry}</td>
                  <td className="p-3">
                    <a
                      href={c.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {c.website}
                    </a>
                  </td>
                  <td className="p-3">{c.description}</td>
                  <td className="p-3">
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3 flex items-center space-x-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelectedCompany(c);
                        setOpenView(true);
                      }}
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => {
                        setSelectedCompany(c);
                        setOpenUpdate(true);
                      }}
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
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
                  className="text-center p-5 text-gray-500 border-t border-gray-300"
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

        <div className="text-gray-700 text-sm font-medium">
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
