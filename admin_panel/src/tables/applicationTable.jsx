import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiTrash2, FiEdit, FiPlus } from "react-icons/fi";
import RecentActivity, { addActivity, getActivities } from "../pages/recentActivity";
import AddModel from "../models/application/addModel";
import ViewModel from "../models/application/viewModel";
import UpdateModel from "../models/application/updateModel";
import DeleteModel from "../models/application/deleteModel";

const ApplicationTable = () => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("applications");
    return saved ? JSON.parse(saved) : [];
  });

  const [recentActivities, setRecentActivities] = useState(getActivities());

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Sync applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  // Add Application
  const handleAddApplication = (newApplication) => {
    const addedApp = { id: Date.now(), appliedDate: new Date().toLocaleDateString(), ...newApplication };
    setApplications([...applications, addedApp]);

    // Update Recent Activity
    const updated = addActivity("Added", "Application", newApplication.jobTitle);
    setRecentActivities(updated);
  };

  // Update Application
  const handleUpdateApplication = (updatedApplication) => {
    setApplications(
      applications.map((a) => (a.id === updatedApplication.id ? updatedApplication : a))
    );

    const updated = addActivity("Updated", "Application", updatedApplication.jobTitle);
    setRecentActivities(updated);
  };

  // Delete Application
  const handleDeleteApplication = (id) => {
    const deletedApp = applications.find((a) => a.id === id);
    setApplications(applications.filter((a) => a.id !== id));

    const updated = addActivity("Deleted", "Application", deletedApp.jobTitle);
    setRecentActivities(updated);
  };

  // Filtered & paginated applications
  const filteredApplications = applications.filter((a) =>
    a.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);
  const displayedApplications = filteredApplications.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Job Title", "Applicant", "Email", "Status", "Applied On"]],
      body: applications.map((a) => [
        a.jobTitle,
        a.applicant,
        a.email,
        a.status,
        a.appliedDate,
      ]),
    });
    doc.save("applications.pdf");
  };

  const csvData = applications.map((a) => ({
    "Job Title": a.jobTitle,
    Applicant: a.applicant,
    Email: a.email,
    Status: a.status,
    "Applied On": a.appliedDate,
  }));

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Manage Applications</h1>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setOpenAdd(true)}
            className="flex items-center bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <FiPlus className="mr-2" size={18} /> Add Application
          </button>
          <button
            onClick={exportPDF}
            className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>
          <CSVLink
            data={csvData}
            filename="applications.csv"
            className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto rounded-lg shadow dark:shadow-gray-900">
        <table className="w-full bg-white dark:bg-gray-800 text-sm border-t border-gray-300 dark:border-gray-700 border-collapse">
          <thead className="bg-blue-500 dark:bg-blue-700 text-white uppercase text-sm">
            <tr>
              {["Job Title", "Applicant", "Email", "Status", "Applied On", "Actions"].map(
                (head) => <th key={head} className="p-3 text-left font-semibold">{head}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayedApplications.length ? (
              displayedApplications.map((a) => (
                <tr key={a.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3 text-gray-900 dark:text-gray-100">{a.jobTitle}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{a.applicant}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{a.email}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{a.status}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{a.appliedDate}</td>
                  <td className="p-3 flex items-center space-x-3">
                    <button
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      onClick={() => { setSelectedApplication(a); setOpenView(true); }}
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                      onClick={() => { setSelectedApplication(a); setOpenUpdate(true); }}
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      onClick={() => { setSelectedApplication(a); setOpenDelete(true); }}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-5 text-gray-500 border-t border-gray-300">
                  No applications found.
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
            {[5, 10, 20, 50].map((num) => <MenuItem key={num} value={num}>{num}</MenuItem>)}
          </Select>
        </div>

        <div className="text-gray-700 text-sm font-medium">
          Page {page} / {totalPages || 1}
        </div>

        <Pagination
          count={totalPages || 1}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={0}
        />
      </div>



      {/* Modals */}
      {openAdd && <AddModel onClose={() => setOpenAdd(false)} onAdd={handleAddApplication} />}
      {openView && <ViewModel application={selectedApplication} onClose={() => setOpenView(false)} />}
      {openUpdate && <UpdateModel application={selectedApplication} onClose={() => setOpenUpdate(false)} onUpdate={handleUpdateApplication} />}
      {openDelete && <DeleteModel application={selectedApplication} onClose={() => setOpenDelete(false)} onDelete={handleDeleteApplication} />}
    </div>
  );
};

export default ApplicationTable;
