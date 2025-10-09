import React, { useEffect, useState } from "react";
import { fetchCompanies } from "../services/companyService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEdit, FiTrash2, FiPlus, FiEye } from "react-icons/fi";
import AddModel from '../models/company/addModel'
import ViewModel from '../models/company/viewModel'
import UpdateModel from '../models/company/updateModel'
import DeleteModel from '../models/company/deleteModel'


const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, [page, searchTerm, rowsPerPage]);

  const loadCompanies = async () => {
    try {
      const data = await fetchCompanies(page, searchTerm, rowsPerPage);
      setCompanies(data.companies);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Location", "Industry", "Status"]],
      body: companies.map((c) => [c.name, c.location, c.industry, c.status]),
    });
    doc.save("companies.pdf");
  };

  const csvData = companies.map((c) => ({
    Name: c.name,
    Location: c.location,
    Industry: c.industry,
    Status: c.status,
  }));

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

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setOpenView(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Manage Companies
      </h1>

      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setOpenAdd(true)}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <FiPlus className="mr-2" size={18} />
            Add Company
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

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white text-sm border-t border-gray-300 border-collapse">
          <thead className="bg-blue-500 text-white uppercase text-sm">
            <tr>
              {["Name", "Location", "Industry", "Status", "Actions"].map(
                (head) => (
                  <th key={head} className="p-3 text-left font-semibold">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {companies.length ? (
              companies.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.location}</td>
                  <td className="p-3">{c.industry}</td>
                  <td className="p-3">{c.status}</td>
                  <td className="p-3 flex items-center space-x-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      title="View Company"
                      onClick={() => handleViewCompany(c)}
                    >
                      <FiEye size={18} />
                    </button>

                    <button
                      className="text-green-500 hover:text-green-700"
                      title="Edit Company"
                      onClick={() => {
                        setSelectedCompany(c);
                        setOpenUpdate(true);
                      }}
                    >
                      <FiEdit size={18} />
                    </button>

                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Delete Company"
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
                  colSpan="5"
                  className="text-center p-5 text-gray-500 border-t border-gray-300"
                >
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 text-sm font-medium">
            Show per page:
          </span>
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
          siblingCount={1}
          boundaryCount={0}
        />
      </div>

      {/* 🧩 Modals */}
      {openAdd && (
        <AddModel onClose={() => setOpenAdd(false)} onAdd={handleAddCompany} />
      )}
      {openUpdate && (
        <UpdateModel
          company={selectedCompany}
          onClose={() => setOpenUpdate(false)}
          onUpdate={handleUpdateCompany}
        />
      )}
      {openDelete && (
        <DeleteModel
          company={selectedCompany}
          onClose={() => setOpenDelete(false)}
          onDelete={handleDeleteCompany}
        />
      )}
      {openView && (
        <ViewModel
          company={selectedCompany}
          onClose={() => setOpenView(false)}
        />
      )}
    </div>
  );
};

export default CompaniesTable;
