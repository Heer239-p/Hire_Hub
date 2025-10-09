import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

import AddModel from "../models/job/addModel";
import ViewModel from "../models/job/viewModel";
import UpdateModel from "../models/job/updateModel";
import DeleteModel from "../models/job/deleteModel";

const JobTable = () => {
  // Load jobs from localStorage or use default
  const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      category: "IT",
      location: "Remote",
      type: "Full-time",
      postedDate: "2025-10-01",
      expiryDate: "2025-11-01",
      applications: 5,
      status: "Active",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Creative Studio",
      category: "Design",
      location: "Onsite",
      type: "Contract",
      postedDate: "2025-09-20",
      expiryDate: "2025-10-20",
      applications: 3,
      status: "Active",
    },
  ];

  const [jobs, setJobs] = useState(storedJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedJob, setSelectedJob] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Persist jobs to localStorage whenever jobs state changes
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Filter and paginate jobs
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / rowsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        ["Title", "Company", "Category", "Location", "Type", "Posted", "Expiry", "Apps", "Status"],
      ],
      body: filteredJobs.map((job) => [
        job.title,
        job.company,
        job.category,
        job.location,
        job.type,
        job.postedDate,
        job.expiryDate,
        job.applications,
        job.status,
      ]),
    });
    doc.save("jobs.pdf");
  };

  // CSV Export
  const csvData = filteredJobs.map((job) => ({
    Title: job.title,
    Company: job.company,
    Category: job.category,
    Location: job.location,
    Type: job.type,
    Posted: job.postedDate,
    Expiry: job.expiryDate,
    Applications: job.applications,
    Status: job.status,
  }));

  // CRUD Handlers
  const handleAddJob = (newJob) => {
    const jobWithId = { id: Date.now(), applications: 0, status: "Active", ...newJob };
    setJobs([...jobs, jobWithId]);
  };

  const handleUpdateJob = (updatedJob) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Jobs</h1>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setOpenAdd(true)}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <FiPlus className="mr-2" size={18} /> Add Job
          </button>

          <button
            onClick={exportPDF}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>

          <CSVLink
            data={csvData}
            filename="jobs.csv"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white text-sm border-t border-gray-300 border-collapse">
          <thead className="bg-blue-500 text-white uppercase text-sm">
            <tr>
              {["Title","Company","Category","Location","Type","Posted","Expiry","Apps","Status","Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.length ? (
              paginatedJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">{job.company}</td>
                  <td className="p-3">{job.category}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3">{job.type}</td>
                  <td className="p-3">{job.postedDate}</td>
                  <td className="p-3">{job.expiryDate}</td>
                  <td className="p-3 text-center">{job.applications}</td>
                  <td className="p-3">{job.status}</td>
                  <td className="p-3 flex items-center space-x-3">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => { setSelectedJob(job); setOpenView(true); }}><FiEye size={18} /></button>
                    <button className="text-green-500 hover:text-green-700" onClick={() => { setSelectedJob(job); setOpenUpdate(true); }}><FiEdit size={18} /></button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => { setSelectedJob(job); setOpenDelete(true); }}><FiTrash2 size={18} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-5 text-gray-500 border-t border-gray-300">
                  No jobs found.
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
            {[5, 10, 20, 50].map((num) => <MenuItem key={num} value={num}>{num}</MenuItem>)}
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
      {openAdd && <AddModel onClose={() => setOpenAdd(false)} onAdd={handleAddJob} />}
      {openView && <ViewModel job={selectedJob} onClose={() => setOpenView(false)} />}
      {openUpdate && <UpdateModel job={selectedJob} onClose={() => setOpenUpdate(false)} onUpdate={handleUpdateJob} />}
      {openDelete && <DeleteModel job={selectedJob} onClose={() => setOpenDelete(false)} onConfirm={() => { handleDeleteJob(selectedJob.id); setOpenDelete(false); }} />}
    </div>
  );
};

export default JobTable;
