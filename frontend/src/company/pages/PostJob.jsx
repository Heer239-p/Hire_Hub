import React, { useState } from "react";

const defaultForm = {
  title: "",
  location: "",
  jobType: "Full-time",
  salaryRange: "",
  description: "",
  requirements: "",
  responsibilities: "",
};

const PostJob = () => {
  const [form, setForm] = useState(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Connect with backend job creation API
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setForm(defaultForm);
    setIsSubmitting(false);
    alert("Job draft saved! Hook up API to persist.");
  };

  return (
    <section>
      <div className="mb-8 py-12 text-center space-y-3">
        
        <h1 className="text-3xl font-bold text-slate-900">Post a new opportunity</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Share what makes this role special, and we’ll showcase it to the right talent pool.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-slate-600 block mb-2">Job title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Senior Product Designer"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-600 block mb-2">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ahmedabad · Remote friendly"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-semibold text-slate-600 block mb-2">Job type</label>
            <select
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-600 block mb-2">Salary range</label>
            <input
              name="salaryRange"
              value={form.salaryRange}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="₹8L - ₹14L per annum"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-600 block mb-2">Remote policy</label>
            <select
              name="remotePolicy"
              value={form.remotePolicy || "Hybrid"}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>On-site</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-600 block mb-2">Role overview</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Tell candidates about the outcomes you expect and what they'll work on."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-slate-600 block mb-2">
              Mandatory requirements
            </label>
            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Years of experience, core skills, tech stack..."
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-600 block mb-2">
              Key responsibilities
            </label>
            <textarea
              name="responsibilities"
              value={form.responsibilities}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Break down top 3-4 things the hire will own."
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-end">
          <button
            type="button"
            onClick={() => setForm(defaultForm)}
            className="px-5 py-3 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-400 transition"
          >
            Clear draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Publish role"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostJob;
