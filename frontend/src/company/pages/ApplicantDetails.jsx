import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiDownload, FiMail, FiPhone, FiMapPin, FiCalendar, FiBriefcase, FiUser } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApplicationDetails, updateApplicationStatus } from "../../api/applicationApi";

const ApplicantDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  // Get application data from location state or fetch from API
  const applicationData = location.state?.applicationData || location.state?.application;

  // Fetch application details when component mounts
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get application ID from location state or URL params
        const applicationId = applicationData?._id || location.state?.applicationId;
        
        if (!applicationId) {
          setError("No application ID provided");
          setLoading(false);
          return;
        }
        
        const data = await getApplicationDetails(applicationId);
        
        // Transform the data to match the expected structure
        const transformedData = {
          _id: data._id,
          name: `${data.applicant.firstName} ${data.applicant.lastName}`,
          email: data.applicant.email,
          mobile: data.applicant.mobile,
          profileImage: data.applicant.profileImage,
          location: data.applicant.location || "Not specified",
          experience: data.applicant.experienceYears 
            ? `${data.applicant.experienceYears} years` 
            : "Not specified",
          skills: Array.isArray(data.applicant.skills) 
            ? data.applicant.skills 
            : typeof data.applicant.skills === 'string'
            ? data.applicant.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
            : [],
          education: "Education details not provided",
          coverLetter: data.coverLetter || "No cover letter provided",
          resume: data.resume,
          status: data.status,
          appliedDate: data.createdAt,
          jobTitle: data.job?.title || "Not specified",
          jobCompany: data.job?.company || "Not specified",
          jobLocation: data.job?.location || "Not specified",
          jobType: data.job?.jobType || "Not specified",
        };
        
        setApplicant(transformedData);
      } catch (err) {
        console.error("Error fetching application details:", err);
        setError("Failed to load applicant details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [applicationData, location.state]);

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      const applicationId = applicant._id;
      const updatedApplication = await updateApplicationStatus(applicationId, newStatus);
      
      // Update local state with new status
      setApplicant(prev => ({
        ...prev,
        status: updatedApplication.status
      }));
      
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handleDownloadResume = () => {
    if (applicant?.resume) {
      // Create full URL for resume
      const resumeUrl = `http://localhost:5000/uploads/${applicant.resume}`;
      window.open(resumeUrl, "_blank");
    } else {
      toast.info("No resume available for download");
    }
  };

  const statusOptions = [
    { label: "Applied", value: "Applied", color: "bg-blue-100 text-blue-700" },
    { label: "Reviewed", value: "Reviewed", color: "bg-purple-100 text-purple-700" },
    { label: "Shortlisted", value: "Shortlisted", color: "bg-amber-100 text-amber-700" },
    { label: "Rejected", value: "Rejected", color: "bg-red-100 text-red-700" },
    { label: "Hired", value: "Hired", color: "bg-green-100 text-green-700" },
  ];

  const currentStatusColor = {
    Applied: "bg-blue-100 text-blue-700",
    Reviewed: "bg-purple-100 text-purple-700",
    Shortlisted: "bg-amber-100 text-amber-700",
    Rejected: "bg-red-100 text-red-700",
    Hired: "bg-green-100 text-green-700",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-slate-500 text-lg font-semibold animate-pulse">Loading applicant details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-32">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
        <button
          onClick={() => navigate("/company/applicants")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500"
        >
          Back to Applicants
        </button>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="text-center py-32">
        <p className="text-slate-700 text-lg font-semibold">Applicant not found</p>
        <button
          onClick={() => navigate("/company/applicants")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500"
        >
          Back to Applicants
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <ToastContainer />
      
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/company/applicants")}
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 mb-2 flex items-center gap-2"
          >
            ← Back to Applicants
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Applicant Details</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${currentStatusColor[applicant.status] || "bg-slate-100 text-slate-700"}`}>
            {applicant.status}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile & Contact */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                {applicant.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{applicant.name}</h2>
                <p className="text-sm text-slate-500 mt-1">{applicant.jobTitle}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3 text-sm">
                <FiMail className="text-slate-400" />
                <span className="text-slate-700">{applicant.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiPhone className="text-slate-400" />
                <span className="text-slate-700">{applicant.mobile || "Not provided"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiMapPin className="text-slate-400" />
                <span className="text-slate-700">{applicant.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiBriefcase className="text-slate-400" />
                <span className="text-slate-700">{applicant.experience} experience</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiCalendar className="text-slate-400" />
                <span className="text-slate-700">Applied on {new Date(applicant.appliedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <button
              onClick={handleDownloadResume}
              className="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition flex items-center justify-center gap-2"
            >
              <FiDownload />
              Download Resume
            </button>
          </div>

          {/* Status Actions */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Update Status</h3>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusUpdate(option.value)}
                  disabled={updating || applicant.status === option.value}
                  className={`w-full px-4 py-2 rounded-full text-sm font-semibold transition ${
                    applicant.status === option.value
                      ? option.color + " cursor-not-allowed opacity-60"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Applied For */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Job Applied For</h3>
            <div className="space-y-2">
              <p className="text-xl font-bold text-slate-900">{applicant.jobTitle}</p>
              <p className="text-slate-600">{applicant.jobCompany}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500 mt-3">
                <span className="flex items-center gap-1">
                  <FiMapPin />
                  {applicant.jobLocation}
                </span>
                <span className="flex items-center gap-1">
                  <FiBriefcase />
                  {applicant.jobType}
                </span>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Cover Letter</h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{applicant.coverLetter}</p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.skills && applicant.skills.length > 0 ? (
                applicant.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-slate-500">No skills provided</p>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Education</h3>
            <p className="text-slate-700">{applicant.education}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicantDetails;