// /components/UserTable.jsx
import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService"; // create this service
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { Pagination, Select, MenuItem } from "@mui/material";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    loadUsers();
  }, [page, searchTerm, rowsPerPage]);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers(page, searchTerm, rowsPerPage); // pass rowsPerPage to API
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Email", "Phone Number", "Role", "Date"]],
      body: users.map((user) => [
        user.name,
        user.email,
        user.phone,
        user.role,
        user.createdAt,
      ]),
    });
    doc.save("users.pdf");
  };

  // Export to CSV
  const csvData = users.map((user) => ({
    Name: user.name,
    Email: user.email,
    "Phone Number": user.phone,
    Role: user.role,
    Date: user.createdAt,
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Users</h1>

      {/* Search & Export */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search users..."
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
              {["Name", "Email", "Phone Number", "Role", "Date", "Actions"].map(
                (head) => (
                  <th key={head} className="p-3 text-left font-semibold">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.createdAt}</td>
                  <td className="p-3 space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Delete
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
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4 gap-4">
        {/* Left: Show per page */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 text-sm font-medium">Show per page:</span>
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

        {/* Center: Page info */}
        <div className="text-gray-700 text-sm font-medium">
          Page {page} of {totalPages}
        </div>

        {/* Right: Numbered Pagination */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          shape="rounded"
          siblingCount={0} // only show exact page numbers
          boundaryCount={0} // remove first/last buttons
          hidePrevButton={false}
          hideNextButton={false}
        />
      </div>
    </div>
  );
};

export default UserTable;
