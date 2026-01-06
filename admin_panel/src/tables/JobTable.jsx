import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiEdit, FiTrash2, FiPlus, FiRefreshCw } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddModel from "../models/job/addModel";
import ViewModel from "../models/job/viewModel";
import UpdateModel from "../models/job/updateModel";
import DeleteModel from "../models/job/deleteModel";
import { fetchJobs, addJob, updateJob, deleteJob } from "../services/jobService";

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedJob, setSelectedJob] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Fetch jobs from API
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const jobData = await fetchJobs(page, searchTerm, rowsPerPage);
        setJobs(jobData.jobs);
        setError(null);
      } catch (err) {
        console.error("Failed to load jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [page, rowsPerPage, searchTerm, refreshFlag]);

  // Filter and paginate jobs (for client-side filtering if needed)
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.salary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(jobs.length / rowsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        ["Image", "Title", "Company", "Category", "Location", "Salary", "Job Type", "Status"],
      ],
      body: filteredJobs.map((job) => [
        job.attachment || "No attachment",
        job.title,
        job.company,
        job.category,
        job.location,
        job.salary,
        job.jobType,
        job.status,
      ]),
    });
    doc.save("jobs.pdf");
  };

  // CSV Export
  const csvData = filteredJobs.map((job) => ({
    Image: job.attachment || "No attachment",
    Title: job.title,
    Company: job.company,
    Category: job.category,
    Location: job.location,
    Salary: job.salary,
    JobType: job.jobType,
    Status: job.status,
  }));

  // CRUD Handlers
  const handleAddJob = async (newJob) => {
    try {
      const addedJob = await addJob(newJob);
      setRefreshFlag(!refreshFlag); // Trigger refresh
      toast.success("Job added successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error adding job:", error);
      toast.error("Failed to add job. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleUpdateJob = async (updatedJob) => {
    try {
      const result = await updateJob(updatedJob.id, updatedJob);
      setRefreshFlag(!refreshFlag); // Trigger refresh
      toast.success("Job updated successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      setRefreshFlag(!refreshFlag); // Trigger refresh
      toast.success("Job deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Show loading or error state
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Manage Jobs</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading jobs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Manage Jobs</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600 dark:text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Manage Jobs</h1>

      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-5 gap-3">
        <div className="flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-full sm:w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
       
          {/* <button
            onClick={() => setOpenAdd(true)}
            className="flex items-center bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <FiPlus className="mr-2" size={18} /> Add Job
          </button> */}

          <button
            onClick={exportPDF}
            className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>

          <CSVLink
            data={csvData}
            filename="jobs.csv"
            className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto rounded-lg shadow dark:shadow-gray-900">
        <table className="w-full bg-white dark:bg-gray-800 text-sm border-t border-gray-300 dark:border-gray-700 border-collapse">
          <thead className="bg-blue-500 dark:bg-blue-700 text-white uppercase text-sm">
            <tr>
              {["Image", "Title","Company","Category","Location","Salary","Job Type","Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.length ? (
              paginatedJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3">
                    {job.attachment ? (
                      <img 
                        src={`http://localhost:5000/uploads/${job.attachment}`} 
                        alt="Job attachment" 
                        className="w-12 h-12 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/48x48?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600">
                        <span className="text-gray-500 dark:text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-100 font-medium">{job.title}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{job.company}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{job.category}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{job.location}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{job.salary}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{job.jobType}</td>
                  {/* <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      job.status === "Active" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : job.status === "Pending" 
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" 
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}>
                      {job.status}
                    </span>
                  </td> */}
                  <td className="p-3 flex items-center space-x-3">
                    <button 
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" 
                      onClick={() => { setSelectedJob(job); setOpenView(true); }}
                      title="View Job"
                    >
                      <FiEye size={18} />
                    </button>
                    {/* <button 
                      className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300" 
                      onClick={() => { setSelectedJob(job); setOpenUpdate(true); }}
                      title="Edit Job"
                    >
                      <FiEdit size={18} />
                    </button> */}
                    <button 
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" 
                      onClick={() => { setSelectedJob(job); setOpenDelete(true); }}
                      title="Delete Job"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-5 text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
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
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Show per page:</span>
          <Select
            value={rowsPerPage}
            size="small"
            onChange={(e) => { setRowsPerPage(e.target.value); setPage(1); }}
            className="bg-white dark:bg-gray-800"
          >
            {[5, 10, 20, 50].map((num) => <MenuItem key={num} value={num}>{num}</MenuItem>)}
          </Select>
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">Page {page} / {totalPages || 1}</div>
        <Pagination
          count={totalPages || 1}
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