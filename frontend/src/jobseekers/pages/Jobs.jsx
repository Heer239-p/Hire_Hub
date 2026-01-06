import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { applyJob } from "../../services/api/applicationApi"; // Import the applyJob API function
import { getAllJobs } from "../../services/api/jobApi"; // Import the getAllJobs API function

const AvailableJobs = () => {
  const locationHook = useLocation();
  const params = new URLSearchParams(locationHook.search);

  const search = params.get("search") || "";
  const filterLocation = params.get("location") || "";
  const category = params.get("category") || "";

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ============================================
  // ✅ FETCH JOBS (POST API with pagination)
  // ============================================
  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      // Prepare filters
      const filters = {};
      if (search) filters.title = search;
      if (filterLocation) filters.location = filterLocation;
      if (category) filters.category = category;

      // Fetch jobs with pagination
      const data = await getAllJobs(page, 9, filters);
      
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Fetch Jobs Error:", error);
      toast.error("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, [search, filterLocation, category]);

  // ============================================
  // PAGINATION HANDLERS
  // ============================================
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchJobs(newPage);
    }
  };

  // ============================================
  // FORM VALIDATION  
  // ============================================
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.resume) newErrors.resume = "Resume upload is required";
    if (!formData.coverLetter.trim())
      newErrors.coverLetter = "Cover letter is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================
  // ✅ APPLY JOB API CALL  
  // ============================================
  const applyJobAPI = async () => {
    const jobId = selectedJob._id;

    const fd = new FormData();
    fd.append("resume", formData.resume);
    fd.append("coverLetter", formData.coverLetter);

    try {
      const data = await applyJob(jobId, fd);

      if (data.status === "success") {
        toast.success("🎉 Job applied successfully!", {
          position: "bottom-right"
        });
        setSelectedJob(null);
      } else {
        toast.error(data.message || "Failed to apply!", {
          position: "bottom-right"
        });
      }
    } catch (error) {
      toast.error(error.message || "Server error! Try again.", {
        position: "bottom-right"
      });
      console.log(error);
    }
  };

  // ============================================
  // FORM SUBMIT  
  // ============================================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields!", {
        position: "bottom-right"
      });
      return;
    }

    applyJobAPI();
  };

  return (
    <section className="py-10 bg-gray-50">
      <ToastContainer />
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Available Jobs
        </h2>
        <p className="text-gray-500 mb-12">
          Explore the latest job openings tailored for your skills
        </p>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center my-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* JOB LIST */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {jobs.map(job => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all text-left border border-gray-100"
                >
                  <img
                    src={job.attachment ? `http://localhost:5000/uploads/${job.attachment}` : "/job_6.jpg"}
                    alt={job.company}
                    className="w-full h-70 object-cover rounded-xl mb-4"
                  />

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {job.title}
                  </h3>

                  <p className="text-blue-600 font-medium mb-1">{job.company}</p>
                  <p className="text-gray-500 mb-3">{job.location}</p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {job.jobType}
                    </span>
                    <span className="text-gray-700 font-semibold">
                      {job.salaryType === "Fixed" 
                        ? `$${job.fixedSalary}` 
                        : job.salaryType === "Range" 
                          ? `$${job.salaryRange?.from} - $${job.salaryRange?.to}`
                          : "N/A"}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
                  >
                    Apply
                  </button>
                </div>
              ))}

              {jobs.length === 0 && !loading && (
                <p className="col-span-full text-gray-500 text-lg mt-4">
                  No jobs found matching your criteria.
                </p>
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-blue-600 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-blue-600 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* APPLY MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-start px-4 z-50 overflow-auto pt-20 pb-20">
          <div className="bg-white rounded-3xl shadow-md max-w-3xl w-full p-8 relative">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedJob.attachment ? `http://localhost:5000/uploads/${selectedJob.attachment}` : "/job_6.jpg"}
                className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Apply for {selectedJob.title}
                </h3>
                <p className="text-blue-600 font-medium">{selectedJob.company}</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg px-4 py-2 shadow-sm ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full border rounded-lg px-4 py-2 shadow-sm ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-gray-700 font-medium mb-1">
                  Upload Resume <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  className={`w-full border rounded-lg px-4 py-2 shadow-sm ${
                    errors.resume ? "border-red-500" : ""
                  }`}
                  onChange={(e) =>
                    setFormData({ ...formData, resume: e.target.files[0] })
                  }
                />
                {errors.resume && (
                  <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                )}
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-gray-700 font-medium mb-1">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  className={`w-full border rounded-lg px-4 py-2 shadow-sm ${
                    errors.coverLetter ? "border-red-500" : ""
                  }`}
                  value={formData.coverLetter}
                  onChange={(e) =>
                    setFormData({ ...formData, coverLetter: e.target.value })
                  }
                ></textarea>
                {errors.coverLetter && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.coverLetter}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 md:col-span-2 mt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AvailableJobs;