import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

import AddModel from "../models/user/addModel";
import ViewModel from "../models/user/viewModel";
import UpdateModel from "../models/user/updateModel";
import DeleteModel from "../models/user/deleteModel";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // ================================
  // ✅ FETCH USERS FROM API
  // ================================
  const fetchApiUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });

      const res = await response.json();

      if (res.status === "success" && Array.isArray(res.data)) {
        const formatted = res.data.map(u => ({
          id: u._id,
          first_name: u.firstName,
          last_name: u.lastName,
          phone: u.mobile,
          email: u.email,
          role: u.role,
          profile: u.profileImage
            ? `http://localhost:5000/uploads/${u.profileImage}`
            : null,
          createdAt: u.createdAt
        }));

        setUsers(formatted);
      }

      setLoading(false);
    } catch (error) {
      console.error("❌ API Fetch Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiUsers();
  }, []);

  // ================================
  // FILTER + PAGINATION
  // ================================
  const filteredUsers = users.filter((u) =>
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // ================================
  // EXPORT PDF
  // ================================
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
        new Date(u.createdAt).toLocaleDateString(),
      ]),
    });
    doc.save("users.pdf");
  };

  // ================================
  // CSV Data
  // ================================
  const csvData = filteredUsers.map((u) => ({
    "First Name": u.first_name,
    "Last Name": u.last_name,
    Email: u.email,
    Phone: u.phone,
    Role: u.role,
    "Created At": new Date(u.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Manage Users</h1>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="border rounded-lg px-4 py-2 w-1/3 bg-white dark:bg-gray-800"
        />

        <div className="flex items-center gap-2">
          <button onClick={exportPDF} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow">
            Export PDF
          </button>

          <CSVLink data={csvData} filename="users.csv" className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow">
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white dark:bg-gray-800 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Profile</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.length ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="p-3">{user.first_name}</td>
                  <td className="p-3">{user.last_name}</td>

                  <td className="p-3">
                    {user.profile ? (
                      <img
                        src={user.profile}
                        alt="profile"
                        className="w-10 h-10 rounded-full border object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>

                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.role}</td>

                  <td className="p-3 flex gap-3">
                    <button onClick={() => { setSelectedUser(user); setOpenView(true); }}>
                      <FiEye className="text-blue-500" />
                    </button>

                    <button onClick={() => { setSelectedUser(user); setOpenUpdate(true); }}>
                      <FiEdit className="text-green-500" />
                    </button>

                    <button onClick={() => { setSelectedUser(user); setOpenDelete(true); }}>
                      <FiTrash2 className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2">
          Show:
          <Select
            value={rowsPerPage}
            size="small"
            onChange={(e) => { setRowsPerPage(e.target.value); setPage(1); }}
          >
            {[5, 10, 20, 50].map((n) => <MenuItem value={n} key={n}>{n}</MenuItem>)}
          </Select>
        </div>

        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
        />
      </div>

      {/* Modals */}
      {openAdd && <AddModel onClose={() => setOpenAdd(false)} />}
      {openView && <ViewModel user={selectedUser} onClose={() => setOpenView(false)} />}
      {openUpdate && <UpdateModel user={selectedUser} onClose={() => setOpenUpdate(false)} />}
      {openDelete && <DeleteModel user={selectedUser} onClose={() => setOpenDelete(false)} />}
    </div>
  );
};

export default UserTable;
