import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const jobs = [
  { id: 1, title: "Frontend Developer", company: "TechNova", location: "Mumbai", salary: "₹8,00,000 / yr", jobType: "Full-time", image: "https://cdn.dribbble.com/userupload/37640742/file/original-d6f5b9970a53b9172434cf7c721472ec.jpg?resize=1504x1128&vertical=center" },
  { id: 2, title: "Backend Engineer", company: "CodeWorks", location: "Pune", salary: "₹10,00,000 / yr", jobType: "Remote", image: "https://cdn.dribbble.com/userupload/37640742/file/original-d6f5b9970a53b9172434cf7c721472ec.jpg?resize=1504x1128&vertical=center" },
  { id: 3, title: "UI/UX Designer", company: "DesignLab", location: "Bangalore", salary: "₹7,50,000 / yr", jobType: "Hybrid", image: "https://cdn.dribbble.com/userupload/37640742/file/original-d6f5b9970a53b9172434cf7c721472ec.jpg?resize=1504x1128&vertical=center" },
  { id: 4, title: "Full Stack Developer", company: "InnoSoft", location: "Hyderabad", salary: "₹12,00,000 / yr", jobType: "Full-time", image: "https://cdn.dribbble.com/userupload/37640742/file/original-d6f5b9970a53b9172434cf7c721472ec.jpg?resize=1504x1128&vertical=center" },
  { id: 5, title: "Digital Marketing Executive", company: "Brandify", location: "Delhi", salary: "₹6,50,000 / yr", jobType: "On-site", image: "https://cdn.dribbble.com/userupload/37640742/file/original-d6f5b9970a53b9172434cf7c721472ec.jpg?resize=1504x1128&vertical=center" },
  { id: 6, title: "Project Manager", company: "NextGen Tech", location: "Chennai", salary: "₹15,00,000 / yr", jobType: "Full-time", image: "https://cdn.dribbble.com/userupload/37640742/file/original-d6f5b9970a53b9172434cf7c721472ec.jpg?resize=1504x1128&vertical=center" },
];

const AvailableJobs = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
  });
  const [errors, setErrors] = useState({});

  // Validate form before submit
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

  // Handle form submit
  const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fill all required fields correctly!", {
      position: "bottom-right",
      autoClose: 3000,
      style: { background: "#ef4444", color: "#ffffff" },
    });
    return;
  }

  // Show success toast immediately
  toast.success("🎉 Application Submitted Successfully!", {
    position: "bottom-right",
    autoClose: 3000,
    style: { background: "#2563eb", color: "#ffffff" },
  });

  // Redirect immediately without waiting for toast
  setSelectedJob(null);
  navigate("/jobs");
};


  return (
    <section className="py-10 bg-gray-50">
      <ToastContainer />
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Available Jobs</h2>
        <p className="text-gray-500 mb-12">
          Explore the latest job openings tailored for your skills
        </p>

        {/* Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all text-left border border-gray-100"
            >
              {/* Job Image */}
              <img
                src={job.image}
                alt={job.company}
                className="w-full h-70 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
              <p className="text-blue-600 font-medium mb-1">{job.company}</p>
              <p className="text-gray-500 mb-3">{job.location}</p>

              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {job.jobType}
                </span>
                <span className="text-gray-700 font-semibold">{job.salary}</span>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
{selectedJob && (
  <div className="fixed inset-0 bg-black/20 flex justify-center items-start px-4 z-50 overflow-auto pt-20 pb-20">
    <div className="bg-white rounded-3xl shadow-md max-w-3xl w-full p-8 relative">
      
      {/* Modal Header with Job Image */}
      <div className="flex items-center gap-4 mb-6">
        {selectedJob.image && (
          <img
            src={selectedJob.image}
            alt={selectedJob.company}
            className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
          />
        )}
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            Apply for {selectedJob.title}
          </h3>
          <p className="text-blue-600 font-medium">{selectedJob.company}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Full Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none ${errors.name ? "border-red-500" : ""}`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Email Address</label>
          <input
            type="email"
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none ${errors.email ? "border-red-500" : ""}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Resume */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-700 font-medium mb-1">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm ${errors.resume ? "border-red-500" : ""}`}
            onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
          />
          {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
        </div>

        {/* Cover Letter */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-700 font-medium mb-1">Cover Letter</label>
          <textarea
            rows="4"
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none ${errors.coverLetter ? "border-red-500" : ""}`}
            placeholder="Write a short message..."
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          ></textarea>
          {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 md:col-span-2 mt-2">
          <button
            type="button"
            onClick={() => setSelectedJob(null)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition shadow-sm"
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
