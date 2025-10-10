import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getAllJobs } from "../../api/jobApi";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Filters
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");

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

    // 🔍 Search by title
    if (search) {
      filtered = filtered.filter((j) =>
        j.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📍 Location filter
    if (location) {
      filtered = filtered.filter((j) =>
        j.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // 💼 Job Type filter (normalize hyphens/spaces)
    if (jobType) {
      filtered = filtered.filter((j) => {
        if (!j.jobType) return false;
        const jobTypeNormalized = j.jobType.toLowerCase().replace(/[\s-]/g, "");
        const filterNormalized = jobType.toLowerCase().replace(/[\s-]/g, "");
        return jobTypeNormalized.includes(filterNormalized);
      });
    }

    // 💰 Salary filter
    if (salary) {
      filtered = filtered.filter((j) => {
        const sal = j.fixedSalary || 0;
        if (salary === "Under 10,000") return sal < 10000;
        if (salary === "10,000 - 20,000") return sal >= 10000 && sal <= 20000;
        if (salary === "20,000 - 30,000") return sal >= 20000 && sal <= 30000;
        if (salary === "30,000 - 40,000") return sal >= 30000 && sal <= 40000;
        return true;
      });
    }

    // 🧠 Experience filter
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

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / perPage);
  const displayedJobs = filteredJobs.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const clearAllFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setSalary("");
    setExperience("");
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* ---------------- Sidebar Filters ---------------- */}
            <div className="w-full md:w-1/4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-8">
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
                      onClick={() => setJobType(type)}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="jobType"
                          checked={jobType === type}
                          onChange={() => setJobType(type)}
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
                  {[
                    "Under 10,000",
                    "10,000 - 20,000",
                    "20,000 - 30,000",
                    "30,000 - 40,000",
                  ].map((sal) => (
                    <label
                      key={sal}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                        salary === sal
                          ? "bg-blue-50 border border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSalary(sal)}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="salary"
                          checked={salary === sal}
                          onChange={() => setSalary(sal)}
                          className="w-4 h-4 accent-blue-500"
                        />
                        <span className="text-gray-700 text-sm">{sal}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Experience Level
                </h4>
                <div className="space-y-2">
                  {["Entry level", "Intermediate", "Expert"].map((exp) => (
                    <label
                      key={exp}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                        experience === exp
                          ? "bg-blue-50 border border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setExperience(exp)}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="experience"
                          checked={experience === exp}
                          onChange={() => setExperience(exp)}
                          className="w-4 h-4 accent-blue-500"
                        />
                        <span className="text-gray-700 text-sm">{exp}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* ---------------- Job Cards Section ---------------- */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Recommended Jobs</h2>

              {loading ? (
                <p className="text-center text-gray-500">Loading jobs...</p>
              ) : displayedJobs.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedJobs.map((job) => (
                    <div
                      key={job._id}
                      className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {job.title || "Product Designer"}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {job.company || "Company"}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.jobType && (
                            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                              {job.jobType}
                            </span>
                          )}
                          {job.experience && (
                            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                              {job.experience}
                            </span>
                          )}
                          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                            {job.salaryRange ? "Paid" : "Unpaid"}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {job.description || "No description available."}
                        </p>
                        <p className="text-gray-700 font-medium mb-1">
                          💰{" "}
                          {job.salaryType === "Fixed"
                            ? `$${job.fixedSalary || "N/A"}`
                            : job.salaryRange
                            ? `$${job.salaryRange.from || "N/A"} - $${job.salaryRange.to || "N/A"}`
                            : "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          📍 {job.location || "Remote"}
                        </p>
                      </div>

                      <div className="flex justify-between mt-5">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                          Apply
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No jobs found.</p>
              )}

              {/* ---------------- Pagination ---------------- */}
              <div className="flex justify-center items-center space-x-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      page === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default BrowseJobs;
