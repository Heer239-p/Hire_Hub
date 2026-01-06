import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyJobs, deleteJob } from "../../services/api/jobApi";
import useAuthUser from "../../hooks/useAuthUser";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const user = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Prepare filters
        const filters = {};
        if (searchTerm) {
          filters.title = searchTerm;
        }
        
        const data = await getMyJobs(currentPage, rowsPerPage, filters);
        
        if (data.status === "success") {
          const result = data.result;
          setJobs(result.jobs || []);
          setTotalPages(result.totalPages || 1);
        } else {
          setJobs([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage, rowsPerPage, searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await deleteJob(jobId);
      if (response.status === "success") {
        // Refresh the job list
        const data = await getMyJobs(currentPage, rowsPerPage, searchTerm ? { title: searchTerm } : {});
        if (data.status === "success") {
          const result = data.result;
          setJobs(result.jobs || []);
          setTotalPages(result.totalPages || 1);
        }
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEditJob = (job) => {
    // Store job data in localStorage to pass to PostJob page
    localStorage.setItem('editJobData', JSON.stringify(job));
    // Navigate to PostJob page with edit flag
    navigate('/company/post-job', { state: { isEditing: true, jobId: job._id } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-slate-500 text-lg font-semibold animate-pulse">Loading jobs...</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8 py-12 text-center space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">Manage Your Jobs</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Review, edit, and manage your job postings from a single place.
        </p>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg max-w-2xl mx-auto border border-blue-100">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">Note:</span> Free accounts can post up to 3 jobs. Upgrade your plan to post more jobs and get additional features.
            <button 
              onClick={() => navigate('/company/subscription')}
              className="ml-2 underline font-medium hover:text-blue-900"
            >
              View Subscription Plans
            </button>
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search your jobs..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <p className="text-lg font-semibold text-slate-900">{job.title}</p>
              <p className="text-sm text-slate-500">
                {job.company || user?.companyName || "Your Company"} · {job.location || "Remote"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Posted on {new Date(job.createdAt).toLocaleDateString()} · 
                
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full hover:border-blue-300 transition"
                onClick={() => navigate(`/company/applicants/${job._id}`, { state: { jobId: job._id } })}
              >
                View Applicants
              </button>
              <button 
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full hover:border-slate-300 transition"
                onClick={() => handleEditJob(job)}
              >
                Edit
              </button>
              <button 
                className="px-4 py-2 text-sm font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-full hover:border-red-300 transition"
                onClick={() => {
                  setSelectedJob(job);
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="text-center py-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-dashed border-slate-200">
            <p className="text-lg font-semibold text-slate-700">No jobs posted yet</p>
            <p className="text-sm text-slate-500 mt-2">
              Create your first job to start receiving applicants.
            </p>
            <button 
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
              onClick={() => navigate('/company/post-job')}
            >
              Post a Job
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 px-4 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 text-sm font-medium">Show per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              Previous
            </button>
            
            <span className="text-gray-700 text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedJob && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50"style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">Confirm Deletion</h3>
            <p className="mb-6 text-slate-600">
              Are you sure you want to delete the job "<strong className="text-slate-900">{selectedJob.title}</strong>"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-slate-700 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteJob(selectedJob._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageJobs;