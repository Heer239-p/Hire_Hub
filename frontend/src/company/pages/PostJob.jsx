import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CameraIcon } from "@heroicons/react/24/solid";
import { updateJob } from "../../services/api/jobApi";
import useAuthUser from "../../hooks/useAuthUser";

const defaultForm = {
  title: "",
  company: "",
  location: "",
  jobType: "Full-Time",
  salaryType: "Fixed",
  fixedSalary: "",
  salaryRangeFrom: "",
  salaryRangeTo: "",
  description: "",
  category: "Other",
  attachment: null
};

const PostJob = () => {
  const user = useAuthUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [jobId, setJobId] = useState(null);

  // Check if we're editing an existing job
  useEffect(() => {
    if (location.state && location.state.isEditing) {
      setIsEditing(true);
      setJobId(location.state.jobId);
      
      // Try to get job data from localStorage
      const editJobData = JSON.parse(localStorage.getItem('editJobData'));
      if (editJobData) {
        // Map job data to form fields
        const mappedForm = {
          title: editJobData.title || "",
          company: editJobData.company || "",
          location: editJobData.location || "",
          jobType: editJobData.jobType || "Full-Time",
          salaryType: editJobData.salaryType || "Fixed",
          fixedSalary: editJobData.fixedSalary || "",
          salaryRangeFrom: editJobData.salaryRange?.from || "",
          salaryRangeTo: editJobData.salaryRange?.to || "",
          description: editJobData.description || "",
          category: editJobData.category || "Other",
          attachment: null // We can't pre-fill file inputs for security reasons
        };
        
        setForm(mappedForm);
        
        // Set image preview if job has an attachment
        if (editJobData.attachment) {
          setImagePreview(`http://localhost:5000/uploads/${editJobData.attachment}`);
        }
        
        // Clean up localStorage
        localStorage.removeItem('editJobData');
      }
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, attachment: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!form.title || !form.company || !form.location || !form.description) {
      toast.error("Please fill all required fields!", {
        position: "bottom-right"
      });
      setIsSubmitting(false);
      return;
    }

    // Check if user is authenticated
    if (!user || !user.token) {
      toast.error("You must be logged in to post a job!", {
        position: "bottom-right"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditing) {
        // Update existing job
        const updatedData = {
          title: form.title,
          company: form.company,
          location: form.location,
          jobType: form.jobType,
          salaryType: form.salaryType,
          description: form.description,
          category: form.category
        };

        // Add salary information based on salary type
        if (form.salaryType === "Fixed") {
          updatedData.fixedSalary = form.fixedSalary || undefined;
        } else {
          updatedData.salaryFrom = form.salaryRangeFrom || undefined;
          updatedData.salaryTo = form.salaryRangeTo || undefined;
        }

        // Add attachment if provided
        if (form.attachment) {
          updatedData.attachment = form.attachment;
        }

        const response = await updateJob(jobId, updatedData);
        
        if (response.status === "success") {
          toast.success("🎉 Job updated successfully!", {
            position: "bottom-right"
          });
          // Redirect to manage jobs page after successful update
          setTimeout(() => {
            navigate('/company/manage-jobs');
          }, 1500);
        } else {
          toast.error(response.message || "Failed to update job!", {
            position: "bottom-right"
          });
        }
      } else {
        // Create new job (existing functionality)
        // Prepare form data for file upload
        const formData = new FormData();
        
        // Append text fields
        formData.append("title", form.title);
        formData.append("company", form.company);
        formData.append("location", form.location);
        formData.append("jobType", form.jobType);
        formData.append("salaryType", form.salaryType);
        formData.append("description", form.description);
        formData.append("category", form.category);
        
        // Append salary information based on salary type
        if (form.salaryType === "Fixed") {
          if (form.fixedSalary) formData.append("fixedSalary", form.fixedSalary);
        } else {
          if (form.salaryRangeFrom) formData.append("salaryFrom", form.salaryRangeFrom);
          if (form.salaryRangeTo) formData.append("salaryTo", form.salaryRangeTo);
        }
        
        // Append attachment if provided
        if (form.attachment) {
          formData.append("attachment", form.attachment);
        }

        // Connect with backend job creation API
        const response = await fetch("http://localhost:5000/api/jobs/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
          body: formData
        });

        const data = await response.json();

        if (data.status === "success") {
          toast.success("🎉 Job posted successfully!", {
            position: "bottom-right"
          });
          setForm(defaultForm);
          setImagePreview(null);
        } else {
          // Check if it's a subscription limit error
          if (response.status === 403) {
            toast.error(data.message || "Subscription limit reached!", {
              position: "bottom-right"
            });
            
            // Redirect to subscription page after a delay
            setTimeout(() => {
              navigate('/company/subscription');
            }, 2000);
          } else {
            toast.error(data.message || "Failed to post job!", {
              position: "bottom-right"
            });
          }
        }
      }
    } catch (error) {
      toast.error("Server error! Try again.", {
        position: "bottom-right"
      });
      console.error("Error posting/updating job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <section className="py-10 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            You need to be logged in as an employer to post a job.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto px-6">
        <div className="mb-8 py-12 text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Edit Job" : "Post a new opportunity"}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isEditing 
              ? "Update your job details below." 
              : "Share what makes this role special, and we'll showcase it to the right talent pool."}
          </p>
          {!isEditing && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg max-w-2xl mx-auto border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Note:</span> Free accounts can post up to 3 jobs. 
                <button 
                  onClick={() => navigate('/company/subscription')}
                  className="underline font-medium ml-1 hover:text-blue-900"
                >
                  Upgrade your plan
                </button> to post more jobs.
              </p>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 space-y-6"
        >
          {/* Job Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Job preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-indigo-700 text-4xl">💼</span>
                </div>
              )}
              <label
                htmlFor="attachment"
                className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-full cursor-pointer hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center shadow-md transition-all duration-300"
              >
                <CameraIcon className="w-5 h-5" />
              </label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Upload a job image or document (optional)</p>
          </div>

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Job title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="e.g. Senior Product Designer"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Company *</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="e.g. Google"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Location *</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="e.g. Ahmedabad · Remote friendly"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="IT & Software">IT & Software</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Engineering">Engineering</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Job Type and Salary */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Job type</label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="Full-Time">Full-time</option>
                <option value="Part-Time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Salary Type</label>
              <select
                name="salaryType"
                value={form.salaryType}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="Fixed">Fixed</option>
                <option value="Range">Range</option>
              </select>
            </div>
            
            {form.salaryType === "Fixed" ? (
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Fixed Salary</label>
                <input
                  name="fixedSalary"
                  type="number"
                  value={form.fixedSalary}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="e.g. 800000"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">From</label>
                  <input
                    name="salaryRangeFrom"
                    type="number"
                    value={form.salaryRangeFrom}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="e.g. 600000"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">To</label>
                  <input
                    name="salaryRangeTo"
                    type="number"
                    value={form.salaryRangeTo}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="e.g. 1200000"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Job Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Role overview *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 transition-all duration-300"
              placeholder="Tell candidates about the outcomes you expect and what they'll work on."
              required
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-end">
            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  navigate('/company/manage-jobs');
                } else {
                  setForm(defaultForm);
                  setImagePreview(null);
                }
              }}
              className="px-5 py-3 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              {isEditing ? "Cancel" : "Clear draft"}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:opacity-60 shadow-md transition-all duration-300"
            >
              {isSubmitting ? (isEditing ? "Updating..." : "Saving...") : (isEditing ? "Update Job" : "Post job")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostJob;