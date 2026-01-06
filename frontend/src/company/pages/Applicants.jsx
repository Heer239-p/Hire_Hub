import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getApplicantsForJob, updateApplicationStatus } from "../../api/applicationApi";

const statusOptions = [
  { value: "Applied", label: "Applied" },
  { value: "Reviewed", label: "Reviewed" },
  { value: "Shortlisted", label: "Shortlisted" },
  { value: "Rejected", label: "Rejected" },
  { value: "Hired", label: "Hired" }
];

const statusStyles = {
  Applied: "bg-blue-100 text-blue-700",
  Reviewed: "bg-purple-100 text-purple-700",
  Shortlisted: "bg-amber-100 text-amber-700",
  Rejected: "bg-red-100 text-red-700",
  Hired: "bg-green-100 text-green-700",
};

const filterOptions = ["All", "Applied", "Reviewed", "Shortlisted", "Rejected", "Hired"];

const Applicants = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract job ID from location state or URL params
  const jobId = location.state?.jobId || useParams().jobId;

  // Fetch applicants when component mounts or jobId changes
  useEffect(() => {
    if (!jobId) {
      setError("No job ID provided");
      setLoading(false);
      return;
    }
    
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getApplicantsForJob(jobId);
        setApplicants(data);
        
        // Set job title from the first application if available
        if (data.length > 0 && data[0].job) {
          setJobTitle(data[0].job.title);
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError("Failed to load applicants. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const updatedApplication = await updateApplicationStatus(applicationId, newStatus);
      
      // Update the local state with the new status
      setApplicants(prevApplicants => 
        prevApplicants.map(applicant => 
          applicant._id === applicationId 
            ? { ...applicant, status: updatedApplication.status } 
            : applicant
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  // Filter Logic
  const filteredApplicants =
    activeFilter === "All"
      ? applicants
      : applicants.filter((applicant) => applicant.status === activeFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-slate-500 text-lg font-semibold">Loading applicants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8 py-12 text-center space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">
          {jobTitle ? `Applicants for ${jobTitle}` : "Job Applicants"}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Review and manage candidates who have applied for this position.
        </p>
      </div>

      {/* 🔵 FILTER BAR */}
      <div className="flex items-center gap-3 mb-6 py-2">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition 
              ${
                activeFilter === filter
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-slate-100">
        <div className="grid grid-cols-4 py-4 px-6 text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-slate-100">
          <span>Candidate</span>
          <span>Role</span>
          <span>Experience</span>
          <span>Status</span>
        </div>

        {filteredApplicants.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-slate-500">
              {activeFilter === "All" 
                ? "No applicants found for this job." 
                : `No applicants with status "${activeFilter}" found.`}
            </p>
          </div>
        ) : (
          filteredApplicants.map((application) => (
            <div
              key={application._id}
              className="grid grid-cols-4 items-center py-5 px-6 border-b border-slate-50 last:border-none"
            >
              <div>
                <p className="font-semibold text-slate-900">
                  {application.applicant.firstName} {application.applicant.lastName}
                </p>
                <p className="text-xs text-slate-500">
                  Applied {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p className="text-sm font-medium text-slate-700">
                {application.applicant.currentRole || "Not specified"}
              </p>
              
              <p className="text-sm text-slate-500">
                {application.applicant.experienceYears 
                  ? `${application.applicant.experienceYears} years` 
                  : "Not specified"}
              </p>

              <div className="flex items-center gap-3">
                <select
                  value={application.status}
                  onChange={(e) => handleStatusChange(application._id, e.target.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border-0 focus:ring-2 focus:ring-blue-500 ${
                    statusStyles[application.status] || "bg-slate-100 text-slate-700"
                  }`}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                <button 
                  className="text-sm font-semibold text-blue-600 hover:text-blue-500"
                  onClick={() => navigate('/company/applicant-details', { 
                    state: { 
                      applicationId: application._id, 
                      applicant: application.applicant,
                      job: application.job
                    } 
                  })}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Applicants;