import React, { useState, useEffect } from "react";
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
  // Load users from localStorage or use default
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      profile: "https://randomuser.me/api/portraits/men/1.jpg",
      email: "john@example.com",
      phone: "1234567890",
      role: "Admin",
      category: "IT",
      createdAt: "2025-10-01T08:30:00Z",
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      profile: "https://randomuser.me/api/portraits/women/2.jpg",
      email: "jane@example.com",
      phone: "9876543210",
      role: "User",
      category: "Design",
      createdAt: "2025-09-25T14:15:00Z",
    },
  ];

  const [users, setUsers] = useState(storedUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Persist users to localStorage whenever users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const filteredUsers = users.filter(
    (u) =>
      u.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["First Name", "Last Name", "Email", "Phone", "Role", "Created At"]],
      body: filteredUsers.map((u) => [
        u.first_name,
        u.last_name,
        u.email,
        u.phone,
        u.role,
        new Date(u.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      ]),
    });
    doc.save("users.pdf");
  };

  // CSV Export
  const csvData = filteredUsers.map((u) => ({
    "First Name": u.first_name,
    "Last Name": u.last_name,
    Email: u.email,
    Phone: u.phone,
    Role: u.role,
    "Created At": new Date(u.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));

  // CRUD Handlers
  const handleAddUser = (newUser) => {
    const userWithId = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...newUser,
    };
    setUsers([...users, userWithId]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
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
              {["First Name", "Last Name", "Profile", "Email", "Phone", "Role", "Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3">{user.first_name}</td>
                  <td className="p-3">{user.last_name}</td>
                  <td className="p-3">
                    {user.profile ? (
                      <img
                        src={user.profile}
                        alt={user.first_name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.role}</td>
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
                <td colSpan="7" className="text-center p-5 text-gray-500 border-t border-gray-300">
                  No users found.
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

        <div className="text-gray-700 text-sm font-medium">Page {page} / {totalPages}</div>

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
      {openAdd && <AddModel onClose={() => setOpenAdd(false)} onAdd={handleAddUser} />}
      {openView && <ViewModel user={selectedUser} onClose={() => setOpenView(false)} />}
      {openUpdate && <UpdateModel user={selectedUser} onClose={() => setOpenUpdate(false)} onUpdate={handleUpdateUser} />}
      {openDelete && <DeleteModel user={selectedUser} onClose={() => setOpenDelete(false)} onDelete={handleDeleteUser} />}
    </div>
  );
};

export default UserTable;
