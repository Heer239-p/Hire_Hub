import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getAllJobs } from "../../../services/api/jobApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 6;
const [viewJob, setViewJob] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");

  // Modal and form state
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch all jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { jobs: fetchedJobs } = await getAllJobs(1, 1000, {});
      setJobs(fetchedJobs);
      setFilteredJobs(fetchedJobs);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...jobs];

    if (search) {
      filtered = filtered.filter((j) =>
        j.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((j) =>
        j.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (jobType) {
      filtered = filtered.filter((j) => {
        if (!j.jobType) return false;
        const jobTypeNormalized = j.jobType.toLowerCase().replace(/[\s-]/g, "");
        const filterNormalized = jobType.toLowerCase().replace(/[\s-]/g, "");
        return jobTypeNormalized.includes(filterNormalized);
      });
    }

    if (salary) {
      const getRange = (j) => {
        if (j.salaryType === "Fixed") {
          const v = Number(j.fixedSalary) || 0;
          return { min: v, max: v };
        }
        const from = Number(j.salaryRange?.from) || 0;
        const to = Number(j.salaryRange?.to) || from;
        return { min: Math.min(from, to), max: Math.max(from, to) };
      };

      const brackets = {
        "Under 10,000": { min: 0, max: 9999 },
        "10,000 - 20,000": { min: 10000, max: 20000 },
        "20,000 - 30,000": { min: 20000, max: 30000 },
        "30,000 - 40,000": { min: 30000, max: 40000 },
      };

      const selected = brackets[salary];

      filtered = filtered.filter((j) => {
        if (!selected) return true;
        const { min, max } = getRange(j);
        return max >= selected.min && min <= selected.max;
      });
    }

    if (experience) {
      filtered = filtered.filter(
        (j) =>
          j.experience &&
          j.experience.toLowerCase().includes(experience.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
    setPage(1);
  }, [search, location, jobType, salary, experience, jobs]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / perPage);
  const displayedJobs = filteredJobs.slice((page - 1) * perPage, page * perPage);

  const clearAllFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setSalary("");
    setExperience("");
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.resume) newErrors.resume = "Resume upload is required";
    if (!formData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    toast.success("🎉 Application Submitted Successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      style: { background: "#2563eb", color: "#fff" },
    });

    setSelectedJob(null);
    setFormData({ name: "", email: "", resume: null, coverLetter: "" });
    setErrors({});
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-8">

          {/* Sidebar Filters */}
          <div className="w-full md:w-1/4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-8 h-150 mt-17">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-800">Job Type</h4>
              <button
                onClick={clearAllFilters}
                className="text-red-500 text-sm font-medium hover:underline"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-2">
              {["Full time", "Part time", "Internship", "Project work", "Volunteering"].map(
                (type) => (
                  <label
                    key={type}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                      jobType === type
                        ? "bg-blue-50 border border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setJobType(type === jobType ? "" : type)}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="jobType"
                        checked={jobType === type}
                        onChange={() => setJobType(type === jobType ? "" : type)}
                        className="w-4 h-4 accent-blue-500"
                      />
                      <span className="text-gray-700 text-sm">{type}</span>
                    </div>
                  </label>
                )
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Salary Range</h4>
              <div className="space-y-2">
                {["Under 10,000","10,000 - 20,000","20,000 - 30,000","30,000 - 40,000"].map(
                  (sal) => (
                    <label
                      key={sal}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                        salary === sal
                          ? "bg-blue-50 border border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSalary(sal === salary ? "" : sal)}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="salary"
                          checked={salary === sal}
                          onChange={() => setSalary(sal === salary ? "" : sal)}
                          className="w-4 h-4 accent-blue-500"
                        />
                        <span className="text-gray-700 text-sm">{sal}</span>
                      </div>
                    </label>
                  )
                )}
              </div>
            </div>
{/* 
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Experience Level</h4>
              <div className="space-y-2">
                {["Entry level", "Intermediate", "Expert"].map((exp) => (
                  <label
                    key={exp}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                      experience === exp
                        ? "bg-blue-50 border border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setExperience(exp === experience ? "" : exp)}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="experience"
                        checked={experience === exp}
                        onChange={() => setExperience(exp === experience ? "" : exp)}
                        className="w-4 h-4 accent-blue-500"
                      />
                      <span className="text-gray-700 text-sm">{exp}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div> */}
          </div>

          {/* Job Cards */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Recommended Jobs</h2>

            {loading ? (
              <p className="text-center text-gray-500 mt-10">Loading jobs...</p>
            ) : displayedJobs.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedJobs.map((job) => (
                  <div key={job._id} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title || "Job Title"}</h3>
                      <p className="text-sm text-gray-500 mb-2">{job.company || "Company"}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.jobType && <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">{job.jobType}</span>}
                        {job.experience && <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">{job.experience}</span>}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          (job.salaryType === "Fixed" && job.fixedSalary > 0) ||
                          (job.salaryRange && (job.salaryRange.from > 0 || job.salaryRange.to > 0))
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {((job.salaryType === "Fixed" && job.fixedSalary > 0) ||
                            (job.salaryRange && (job.salaryRange.from > 0 || job.salaryRange.to > 0)))
                            ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{job.description || "No description available."}</p>
                      <p className="text-gray-700 font-medium mb-1">
                        💰 {job.salaryType === "Fixed" && job.fixedSalary > 0
                          ? `$${job.fixedSalary}`
                          : job.salaryRange && (job.salaryRange.from > 0 || job.salaryRange.to > 0)
                          ? `$${job.salaryRange.from || 0} - $${job.salaryRange.to || 0}`
                          : "Unpaid"}
                      </p>
                      <p className="text-sm text-gray-500">📍 {job.location || "Remote"}</p>
                    </div>
                    <div className="flex justify-between mt-5">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        Apply
                      </button>
                      <button
  onClick={() => setViewJob(job)}
  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
>
  View
</button>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No jobs found.</p>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

     {/* Apply Modal */}
{selectedJob && (
  <div className="fixed inset-0 bg-black/20 flex justify-center items-center px-4 z-50">
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative">
      <ToastContainer />
      <button
        onClick={() => setSelectedJob(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
      >
        ×
      </button>

      <h3 className="text-xl font-bold mb-4 text-gray-800">Apply for {selectedJob.title}</h3>
      <p className="text-gray-600 mb-4">{selectedJob.company} | {selectedJob.location}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full border rounded-lg px-4 py-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full border rounded-lg px-4 py-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <textarea
          rows="4"
          placeholder="Cover Letter"
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          className={`w-full border rounded-lg px-4 py-2 ${errors.coverLetter ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.coverLetter && <p className="text-red-500 text-sm">{errors.coverLetter}</p>}

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
        />
        {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}

        <div className="flex justify-end gap-3 mt-4">
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
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* View Modal */}
{viewJob && (
  <div className="fixed inset-0 bg-black/20 flex justify-center items-center px-4 z-50">
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative">
      <button
        onClick={() => setViewJob(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
      >
        ×
      </button>

      <h3 className="text-xl font-bold mb-2 text-gray-800">{viewJob.title}</h3>
      <p className="text-gray-600 mb-2">{viewJob.company} | {viewJob.location}</p>
      <p className="text-gray-700 mb-2"><strong>Job Type:</strong> {viewJob.jobType || "N/A"}</p>
      <p className="text-gray-700 mb-2"><strong>Experience:</strong> {viewJob.experience || "N/A"}</p>
      <p className="text-gray-700 mb-2"><strong>Salary:</strong> {viewJob.salaryType === "Fixed" ? `$${viewJob.fixedSalary}` : viewJob.salaryRange ? `$${viewJob.salaryRange.from || 0} - $${viewJob.salaryRange.to || 0}` : "Unpaid"}</p>
      <p className="text-gray-600 mt-2">{viewJob.description || "No description available."}</p>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => setViewJob(null)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
};

export default BrowseJobs;
