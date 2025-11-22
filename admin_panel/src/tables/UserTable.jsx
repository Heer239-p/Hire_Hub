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
import { fetchUsers, addUser, updateUser, deleteUser } from "../services/userService";
import { addActivity } from "../utils/activityLogger";

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

  // Load users from localStorage
  const loadUsersFromStorage = () => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      console.log("📋 UserTable: Loading users from localStorage:", storedUsers.length);
      console.log("📋 UserTable: Raw data:", storedUsers);
      // Convert service format to table format
      const formattedUsers = storedUsers.map(u => ({
        id: u.id,
        first_name: u.name ? u.name.split(' ')[0] : '',
        last_name: u.name ? u.name.split(' ').slice(1).join(' ') : '',
        profile: u.profile || '',
        email: u.email,
        phone: u.phone,
        role: u.role,
        category: u.category || 'IT',
        createdAt: u.date || new Date().toISOString(),
      }));
      setUsers(formattedUsers);
      setLoading(false);
      console.log("📋 UserTable: Users loaded into table state:", formattedUsers.length);
    } catch (error) {
      console.error("❌ UserTable: Error loading users from localStorage:", error);
      setLoading(false);
    }
  };

  // Load users from localStorage on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        // Initialize localStorage with default users if empty
        const stored = localStorage.getItem("users");
        if (!stored || stored === "[]") {
          console.log("Initializing users in localStorage...");
          await fetchUsers(1, "", 1000);
        }
        // Load from localStorage
        loadUsersFromStorage();
      } catch (error) {
        console.error("Error loading users:", error);
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Listen for storage changes (when users are added from Dashboard)
  useEffect(() => {
    const handleStorageChange = (e) => {
      console.log("Storage event received:", e.key);
      if (e.key === "users" || e.key === null) {
        loadUsersFromStorage();
      }
    };

    // Listen for storage events from other tabs/windows
    window.addEventListener("storage", handleStorageChange);

    // Also set up a custom event listener for same-window updates
    const handleCustomStorageChange = () => {
      console.log("🔔 UserTable: Custom localStorage event received - reloading users");
      loadUsersFromStorage();
    };
    window.addEventListener("localStorageUpdated", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageUpdated", handleCustomStorageChange);
    };
  }, []);

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
  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await addUser(newUser);
      // Convert to table format
      const formattedUser = {
        id: addedUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        profile: newUser.profile || '',
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        category: newUser.category,
        createdAt: addedUser.date || new Date().toISOString(),
      };
      setUsers([...users, formattedUser]);
      
      // Log activity to Dashboard
      addActivity("Added", "User", `${newUser.first_name} ${newUser.last_name}`);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, {
        name: `${updatedUser.first_name} ${updatedUser.last_name}`,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        category: updatedUser.category,
        profile: updatedUser.profile,
      });
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      
      // Log activity to Dashboard
      addActivity("Updated", "User", `${updatedUser.first_name} ${updatedUser.last_name}`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const userToDelete = users.find((u) => u.id === id);
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
      
      // Log activity to Dashboard
      if (userToDelete) {
        addActivity("Deleted", "User", `${userToDelete.first_name} ${userToDelete.last_name}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex items-center space-x-2">
          <button
            onClick={exportPDF}
            className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>
          <CSVLink
            data={csvData}
            filename="users.csv"
            className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-lg shadow dark:shadow-gray-900">
        <table className="w-full bg-white dark:bg-gray-800 text-sm border-t border-gray-300 dark:border-gray-700 border-collapse">
          <thead className="bg-blue-500 dark:bg-blue-700 text-white uppercase text-sm">
            <tr>
              {["First Name", "Last Name", "Profile", "Email", "Phone", "Role", "Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3 text-gray-900 dark:text-gray-100">{user.first_name}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{user.last_name}</td>
                  <td className="p-3">
                    {user.profile ? (
                      <img
                        src={user.profile}
                        alt={user.first_name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{user.email}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{user.phone}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{user.role}</td>
                  <td className="p-3 flex items-center space-x-3">
                    <button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" onClick={() => { setSelectedUser(user); setOpenView(true); }}>
                      <FiEye size={18} />
                    </button>
                    <button className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300" onClick={() => { setSelectedUser(user); setOpenUpdate(true); }}>
                      <FiEdit size={18} />
                    </button>
                    <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" onClick={() => { setSelectedUser(user); setOpenDelete(true); }}>
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-5 text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
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
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Show per page:</span>
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
