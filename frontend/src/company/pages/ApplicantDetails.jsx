import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiDownload, FiMail, FiPhone, FiMapPin, FiCalendar, FiBriefcase, FiUser } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Mock data - Replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApplicant({
        _id: id,
        name: "Ishaan Shah",
        email: "ishaan.shah@example.com",
        mobile: "+91 98765 43210",
        profileImage: null,
        location: "Mumbai, Maharashtra",
        experience: "4 years",
        skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
        education: "B.Tech in Computer Science - IIT Mumbai (2020)",
        coverLetter: "I am excited to apply for the Frontend Developer position. With 4 years of experience in React and modern web development, I have built scalable applications for fintech and e-commerce companies. I'm passionate about creating intuitive user experiences and am eager to contribute to your team.",
        resume: "/resumes/ishaan_shah_resume.pdf",
        status: "Interview",
        appliedDate: "2024-01-15",
        jobTitle: "Frontend Developer",
        jobCompany: "Tech Innovations Pvt Ltd",
        jobLocation: "Mumbai",
        jobType: "Full-Time",
      });
      setLoading(false);
    }, 800);
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      // TODO: Connect with backend API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setApplicant((prev) => ({ ...prev, status: newStatus }));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handleDownloadResume = () => {
    // TODO: Implement actual resume download
    toast.info("Resume download initiated");
    window.open(applicant.resume, "_blank");
  };

  const statusOptions = [
    { label: "Shortlisted", value: "Shortlisted", color: "bg-amber-100 text-amber-700" },
    { label: "Interview", value: "Interview", color: "bg-green-100 text-green-700" },
    { label: "Rejected", value: "Rejected", color: "bg-red-100 text-red-700" },
    { label: "Hired", value: "Hired", color: "bg-blue-100 text-blue-700" },
  ];

  const currentStatusColor = {
    Applied: "bg-slate-100 text-slate-700",
    Shortlisted: "bg-amber-100 text-amber-700",
    Interview: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Hired: "bg-blue-100 text-blue-700",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-slate-500 text-lg font-semibold animate-pulse">Loading applicant details...</p>
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
                <span className="text-slate-700">{applicant.mobile}</span>
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
              {applicant.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
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


