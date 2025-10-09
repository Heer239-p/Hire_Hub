import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

import AddModel from "../models/employer/addModel";
import ViewModel from "../models/employer/viewModel";
import UpdateModel from "../models/employer/updateModel";
import DeleteModel from "../models/employer/deleteModel";

const EmployerTable = () => {
  // Load from localStorage if exists
  const storedEmployers = JSON.parse(localStorage.getItem("employers")) || [
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
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
  ];

  const [employers, setEmployers] = useState(storedEmployers);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEmployer, setSelectedEmployer] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    localStorage.setItem("employers", JSON.stringify(employers));
  }, [employers]);

  const filteredEmployers = employers.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployers.length / rowsPerPage);
  const paginatedEmployers = filteredEmployers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Email", "Company", "Description", "Website", "Industry"]],
      body: filteredEmployers.map((e) => [
        e.name,
        e.email,
        e.companyName,
        e.companyDescription,
        e.companyWebsite,
        e.industry,
      ]),
    });
    doc.save("employers.pdf");
  };

  const csvData = filteredEmployers.map((e) => ({
    Name: e.name,
    Email: e.email,
    Company: e.companyName,
    Description: e.companyDescription,
    Website: e.companyWebsite,
    Industry: e.industry,
  }));

  // CRUD Handlers
  const handleAddEmployer = (newEmployer) => {
    setEmployers([...employers, { id: Date.now(), ...newEmployer }]);
  };

  const handleUpdateEmployer = (updatedEmployer) => {
    setEmployers(
      employers.map((e) => (e.id === updatedEmployer.id ? updatedEmployer : e))
    );
  };

  const handleDeleteEmployer = (id) => {
    setEmployers(employers.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Employers</h1>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search employers..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setOpenAdd(true)}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <FiPlus className="mr-2" size={18} /> Add Employer
          </button>

          <button
            onClick={exportPDF}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>

          <CSVLink
            data={csvData}
            filename="employers.csv"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Employer Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white text-sm border-t border-gray-300 border-collapse">
          <thead className="bg-blue-500 text-white uppercase text-sm">
            <tr>
              {["Name", "Email", "Profile Image", "Company Name", "Description", "Website", "Industry", "Actions"].map(
                (head) => (
                  <th key={head} className="p-3 text-left font-semibold">{head}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedEmployers.length ? (
              paginatedEmployers.map((e) => (
                <tr key={e.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3">{e.name}</td>
                  <td className="p-3">{e.email}</td>
                  <td className="p-3">
                    <img src={e.profileImage} alt={e.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="p-3">{e.companyName}</td>
                  <td className="p-3">{e.companyDescription}</td>
                  <td className="p-3">
                    <a href={e.companyWebsite} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                      {e.companyWebsite}
                    </a>
                  </td>
                  <td className="p-3">{e.industry}</td>
                  <td className="p-3 flex items-center space-x-3">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => { setSelectedEmployer(e); setOpenView(true); }}>
                      <FiEye size={18} />
                    </button>
                    <button className="text-green-500 hover:text-green-700" onClick={() => { setSelectedEmployer(e); setOpenUpdate(true); }}>
                      <FiEdit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => { setSelectedEmployer(e); setOpenDelete(true); }}>
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-5 text-gray-500 border-t border-gray-300">
                  No employers found.
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
            onChange={(e) => { setRowsPerPage(e.target.value); setPage(1); }}
            className="bg-white"
          >
            {[5, 10, 20, 50].map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
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
      {openAdd && <AddModel onClose={() => setOpenAdd(false)} onAdd={handleAddEmployer} />}
      {openView && <ViewModel employer={selectedEmployer} onClose={() => setOpenView(false)} />}
      {openUpdate && <UpdateModel employer={selectedEmployer} onClose={() => setOpenUpdate(false)} onUpdate={handleUpdateEmployer} />}
      {openDelete && <DeleteModel employer={selectedEmployer} onClose={() => setOpenDelete(false)} onDelete={handleDeleteEmployer} />}
    </div>
  );
};

export default EmployerTable;
