import React, { useState } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

import AddModel from "../models/user/addModel";
import ViewModel from "../models/user/viewModel";
import UpdateModel from "../models/user/updateModel";
import DeleteModel from "../models/user/deleteModel";

const UserTable = () => {
  const allUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", role: "Admin", createdAt: "2025-10-01T08:30:00Z" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543210", role: "User", createdAt: "2025-09-25T14:15:00Z" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "5556667777", role: "User", createdAt: "2025-10-05T10:00:00Z" },
    { id: 4, name: "Bob Williams", email: "bob@example.com", phone: "4445556666", role: "Admin", createdAt: "2025-10-07T12:45:00Z" },
  ];

  const [users, setUsers] = useState(allUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(Math.ceil(allUsers.length / 5));
  const [selectedUser, setSelectedUser] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Email", "Phone", "Role", "Date"]],
      body: filteredUsers.map((u) => [
        u.name,
        u.email,
        u.phone,
        u.role,
        new Date(u.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      ]),
    });
    doc.save("users.pdf");
  };

  const csvData = filteredUsers.map((u) => ({
    Name: u.name,
    Email: u.email,
    Phone: u.phone,
    Role: u.role,
    Date: new Date(u.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
  }));

  const handleAddUser = (newUser) => {
    setUsers([...users, { id: Date.now(), createdAt: new Date().toISOString(), ...newUser }]);
    setTotalPages(Math.ceil((filteredUsers.length + 1) / rowsPerPage));
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const handleDeleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    setTotalPages(Math.ceil(updated.length / rowsPerPage));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Users</h1>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
          <div className="flex items-center space-x-2">
    {/* Add User button */}
    <button
      onClick={() => setOpenAdd(true)}
      className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
    >
      <FiPlus className="mr-2" size={18} /> Add User
    </button>
          <button
            onClick={exportPDF}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>
          <CSVLink
            data={csvData}
            filename="users.csv"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white text-sm border-t border-gray-300 border-collapse">
          <thead className="bg-blue-500 text-white uppercase text-sm">
            <tr>
              {["Name", "Email", "Phone", "Role", "Date", "Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{new Date(user.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td className="p-3 flex items-center space-x-3">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => { setSelectedUser(user); setOpenView(true); }}>
                      <FiEye size={18} />
                    </button>
                    <button className="text-green-500 hover:text-green-700" onClick={() => { setSelectedUser(user); setOpenUpdate(true); }}>
                      <FiEdit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => { setSelectedUser(user); setOpenDelete(true); }}>
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-5 text-gray-500 border-t border-gray-300">
                  No users found.
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
          siblingCount={1}
          boundaryCount={0}
        />
      </div>

      {/* Modals */}
      {openAdd && <AddModel onClose={() => setOpenAdd(false)} onAdd={handleAddUser} />}
      {openView && <ViewModel user={selectedUser} onClose={() => setOpenView(false)} />}
      {openUpdate && <UpdateModel user={selectedUser} onClose={() => setOpenUpdate(false)} onUpdate={handleUpdateUser} />}
      {openDelete && <DeleteModel user={selectedUser} onClose={() => setOpenDelete(false)} onDelete={handleDeleteUser} />}
    </div>
  );
};

export default UserTable;
