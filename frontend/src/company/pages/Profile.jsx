import React, { useEffect, useMemo, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { updateUserProfile } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const userFieldConfig = [
  { name: "firstName", label: "First Name", required: true },
  { name: "lastName", label: "Last Name", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "mobile", label: "Mobile Number", type: "tel", required: true },
  { name: "location", label: "Preferred Location" },
  { name: "experienceYears", label: "Years of Experience", type: "number" },
  { name: "currentRole", label: "Current Role" },
  { name: "skills", label: "Core Skills (comma separated)" },
  { name: "linkedin", label: "LinkedIn Profile" },
  { name: "portfolio", label: "Portfolio / Resume URL" },
];

const companyFieldConfig = [
  { name: "companyName", label: "Company Name", required: true },
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
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [savingPersonal, setSavingPersonal] = useState(false);
  const [savingCompany, setSavingCompany] = useState(false);

  // Load user data
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        location: user.location || "",
        experienceYears: user.experienceYears || "",
        currentRole: user.currentRole || "",
        skills: user.skills || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",
      });

      if (user.role === "employer") {
        setCompanyInfo({
          companyName: user.companyName || "",
          industry: user.industry || "",
          companyWebsite: user.companyWebsite || "",
          companySize: user.companySize || "",
          foundedYear: user.foundedYear || "",
          headquarters: user.headquarters || "",
          hiringFocus: user.hiringFocus || "",
          culture: user.culture || "",
          companyDescription: user.companyDescription || "",
        });
      }

      if (user.profileImage) {
        setProfileImagePreview(
          `http://localhost:5000/uploads/${user.profileImage}`
        );
      }
    }
  }, [user]);

  const isEmployer = user?.role === "employer";

  // Input change handlers
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  // Save Personal Info
  const handleSavePersonal = async () => {
    if (!user?.token) return toast.error("Please log in");

    if (
      !personalInfo.firstName ||
      !personalInfo.lastName ||
      !personalInfo.email ||
      !personalInfo.mobile
    ) {
      return toast.error("Required fields missing");
    }

    setSavingPersonal(true);
    try {
      const formData = new FormData();
      Object.entries(personalInfo).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await updateUserProfile(formData, user.token);

      const updatedUser = {
        ...user,
        ...response.result,
        token: user.token,
      };

      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("authChange"));

      toast.success("Personal details updated!");
      setProfileImage(null);
    } catch (e) {
      toast.error("Failed to update");
    } finally {
      setSavingPersonal(false);
    }
  };

  // Save Company Info
  const handleSaveCompany = async () => {
    if (!user?.token) return toast.error("Please log in");
    if (!isEmployer) return toast.error("Only employers can update company info");
    if (!companyInfo.companyName) return toast.error("Company Name is required");

    setSavingCompany(true);

    try {
      const formData = new FormData();
      Object.entries(companyInfo).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await updateUserProfile(formData, user.token);

      const updatedUser = {
        ...user,
        ...response.result,
        token: user.token,
      };

      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("authChange"));

      toast.success("Company information updated!");
    } catch (e) {
      toast.error("Failed to update company info");
    } finally {
      setSavingCompany(false);
    }
  };

  const userInitials = useMemo(() => {
    if (!user) return "HH";
    const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
    return initials || "HH";
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <ToastContainer />

      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          {isEmployer ? "Company Profile" : "Your Profile"}
        </h1>

        {/* PROFILE IMAGE */}
        <div className="flex items-center gap-6 mb-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-4xl font-bold">
                  {userInitials}
                </div>
              )}
            </div>

            <label className="absolute bottom-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-full cursor-pointer text-sm">
              Change
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <div className="bg-white shadow rounded-xl p-8 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>

            <button
              onClick={handleSavePersonal}
              className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500"
            >
              {savingPersonal ? "Saving..." : "Save Personal Info"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userFieldConfig.map((field) => (
              <div key={field.name}>
                <label className="text-sm font-medium">{field.label}</label>
                {field.textarea ? (
                  <textarea
                    name={field.name}
                    value={personalInfo[field.name] || ""}
                    onChange={handlePersonalChange}
                    className="w-full mt-1 border rounded-lg p-3"
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={personalInfo[field.name] || ""}
                    onChange={handlePersonalChange}
                    className="w-full mt-1 border rounded-lg p-3"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COMPANY INFO (EMPLOYER ONLY) */}
        {isEmployer && (
          <div className="bg-white shadow rounded-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Company Information</h2>

              <button
                onClick={handleSaveCompany}
                className="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-blue-600"
              >
                {savingCompany ? "Saving..." : "Save Company Info"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companyFieldConfig.map((field) => (
                <div key={field.name}>
                  <label className="text-sm font-medium">{field.label}</label>

                  {field.textarea ? (
                    <textarea
                      name={field.name}
                      value={companyInfo[field.name] || ""}
                      onChange={handleCompanyChange}
                      className="w-full mt-1 border rounded-lg p-3 h-32"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={companyInfo[field.name] || ""}
                      onChange={handleCompanyChange}
                      className="w-full mt-1 border rounded-lg p-3"
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
