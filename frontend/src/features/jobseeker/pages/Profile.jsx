import React, { useEffect, useMemo, useState } from "react";
import useAuthUser from "../../../hooks/useAuthUser";

const userFieldConfig = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "mobile", label: "Mobile Number", type: "tel" },
  { name: "location", label: "Preferred Location" },
  { name: "experienceYears", label: "Years of Experience", type: "number" },
  { name: "currentRole", label: "Current Role" },
  { name: "skills", label: "Core Skills (comma separated)" },
  { name: "linkedin", label: "LinkedIn Profile" },
  { name: "portfolio", label: "Portfolio / Resume URL" },
];

const companyFieldConfig = [
  { name: "companyName", label: "Company Name" },
  { name: "industry", label: "Industry" },
  { name: "companyWebsite", label: "Company Website" },
  { name: "companySize", label: "Team Size" },
  { name: "foundedYear", label: "Founded Year", type: "number" },
  { name: "headquarters", label: "Headquarters" },
  { name: "hiringFocus", label: "Hiring For" },
  { name: "culture", label: "Work Culture Highlights" },
  { name: "companyDescription", label: "Company Description", textarea: true },
];

const Profile = () => {
  const user = useAuthUser();
  const [personalInfo, setPersonalInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    if (user) {
      setPersonalInfo((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        ...prev,
      }));

      if (user.role === "employer") {
        setCompanyInfo((prev) => ({
          ...prev,
          companyName: user.companyName || "",
          industry: user.industry || "",
          companyWebsite: user.companyWebsite || "",
          companyDescription: user.companyDescription || "",
          ...prev,
        }));
      }
    }
  }, [user]);

  const isEmployer = user?.role === "employer";

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const userInitials = useMemo(() => {
    if (!user) return "HH";
    const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.trim();
    return initials || "HH";
  }, [user]);

  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg font-semibold">
          Please log in to view your profile.
        </p>
      </section>
    );
  }

  const handleSave = () => {
    alert("Profile changes saved locally. Hook up API to persist.");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow">
            {userInitials}
          </div>
          <div>
            <p className="text-sm uppercase text-slate-500 font-semibold">Profile</p>
            <h1 className="text-3xl font-bold text-slate-900">
              {isEmployer ? "Employer Profile" : "Jobseeker Profile"}
            </h1>
            <p className="text-slate-500">
              Manage everything recruiters and applicants need to know about you.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow border border-slate-100 p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
              <p className="text-sm text-slate-500">
                Update your core account details and talent preferences.
              </p>
            </div>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-500"
            >
              Save Personal Info
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {userFieldConfig.map((field) => (
              <div key={field.name} className={`col-span-1 ${field.textarea ? "md:col-span-2" : ""}`}>
                <label className="text-sm font-semibold text-slate-600 block mb-1">
                  {field.label}
                </label>
                {field.textarea ? (
                  <textarea
                    name={field.name}
                    value={personalInfo[field.name] || ""}
                    onChange={handlePersonalChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={personalInfo[field.name] || ""}
                    onChange={handlePersonalChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {isEmployer && (
          <div className="bg-white rounded-3xl shadow border border-slate-100 p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Company Information</h2>
                <p className="text-sm text-slate-500">
                  Show jobseekers what makes your company and roles special.
                </p>
              </div>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold shadow hover:bg-blue-600"
              >
                Save Company Info
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {companyFieldConfig.map((field) => (
                <div
                  key={field.name}
                  className={`col-span-1 ${field.textarea ? "md:col-span-2" : ""}`}
                >
                  <label className="text-sm font-semibold text-slate-600 block mb-1">
                    {field.label}
                  </label>
                  {field.textarea ? (
                    <textarea
                      name={field.name}
                      value={companyInfo[field.name] || ""}
                      onChange={handleCompanyChange}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={companyInfo[field.name] || ""}
                      onChange={handleCompanyChange}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
