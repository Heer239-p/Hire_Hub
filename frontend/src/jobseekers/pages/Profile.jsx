import React, { useEffect, useMemo, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { getUserProfile, updateUserProfile } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";

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
  { name: "companyDescription", label: "Company Description", textarea: true },
];

const Profile = () => {
  const user = useAuthUser();
  const [personalInfo, setPersonalInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [savingPersonal, setSavingPersonal] = useState(false);
  const [savingCompany, setSavingCompany] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
    // Test toast to verify it's working
    toast.info("Profile page loaded successfully!");
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const profileData = await getUserProfile(user.token);
      
      // Check if profileData exists before accessing its properties
      if (profileData) {
        // Set personal info
        setPersonalInfo({
          firstName: profileData.firstName || "",
          lastName: profileData.lastName || "",
          email: profileData.email || "",
          mobile: profileData.mobile || "",
          location: profileData.location || "",
          experienceYears: profileData.experienceYears || "",
          currentRole: profileData.currentRole || "",
          skills: profileData.skills || "",
          linkedin: profileData.linkedin || "",
          portfolio: profileData.portfolio || "",
        });

        // Set company info if user is employer
        if (profileData.role === "employer") {
          setCompanyInfo({
            companyName: profileData.companyName || "",
            industry: profileData.industry || "",
            companyWebsite: profileData.companyWebsite || "",
            companySize: profileData.companySize || "",
            foundedYear: profileData.foundedYear || "",
            companyDescription: profileData.companyDescription || "",
          });
        }
        
        // Set profile image if exists
        if (profileData.profileImage) {
          setPreviewImage(`http://localhost:5000/uploads/${profileData.profileImage}`);
        }
      } else {
        // If no profile data, initialize with empty values
        setPersonalInfo({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          location: "",
          experienceYears: "",
          currentRole: "",
          skills: "",
          linkedin: "",
          portfolio: "",
        });
        
        setCompanyInfo({
          companyName: "",
          industry: "",
          companyWebsite: "",
          companySize: "",
          foundedYear: "",
          companyDescription: "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const isEmployer = user?.role === "employer";

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const userInitials = useMemo(() => {
    if (!user) return "HH";
    const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.trim();
    return initials || "HH";
  }, [user]);

  const handleSavePersonal = async () => {
    try {
      setSavingPersonal(true);
      
      // Create form data
      const formData = new FormData();
      Object.keys(personalInfo).forEach(key => {
        formData.append(key, personalInfo[key]);
      });
      
      // Append profile image if selected
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      
      const response = await updateUserProfile(formData, user.token);
      console.log("Profile update successful, showing success toast");
      toast.success("Personal information updated successfully!");
      
      // Update localStorage with new profile data
      if (response.result) {
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUser) {
          // Update the stored user with new profile data
          const updatedUser = {
            ...storedUser,
            ...response.result
          };
          localStorage.setItem("userInfo", JSON.stringify(updatedUser));
          // Dispatch event to notify other components of the change
          window.dispatchEvent(new Event("authChange"));
        }
      }
    } catch (error) {
      console.error("Error updating personal info:", error);
      console.log("Profile update failed, showing error toast");
      toast.error("Failed to update personal information");
    } finally {
      setSavingPersonal(false);
    }
  };

  const handleSaveCompany = async () => {
    try {
      setSavingCompany(true);
      
      // Create form data
      const formData = new FormData();
      Object.keys(companyInfo).forEach(key => {
        formData.append(key, companyInfo[key]);
      });
      
      const response = await updateUserProfile(formData, user.token);
      console.log("Company profile update successful, showing success toast");
      toast.success("Company information updated successfully!");
      
      // Update localStorage with new profile data
      if (response.result) {
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUser) {
          // Update the stored user with new profile data
          const updatedUser = {
            ...storedUser,
            ...response.result
          };
          localStorage.setItem("userInfo", JSON.stringify(updatedUser));
          // Dispatch event to notify other components of the change
          window.dispatchEvent(new Event("authChange"));
        }
      }
    } catch (error) {
      console.error("Error updating company info:", error);
      console.log("Company profile update failed, showing error toast");
      toast.error("Failed to update company information");
    } finally {
      setSavingCompany(false);
    }
  };

  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg font-semibold">
          Please log in to view your profile.
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg font-semibold">
          Loading profile...
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="toast-container-wrapper" style={{ position: 'fixed', zIndex: 9999 }}>
        <ToastContainer 
          position="bottom-right" 
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        <div className="flex items-center gap-6">
          {/* Profile Image Upload */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow overflow-hidden">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                userInitials
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
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
              onClick={handleSavePersonal}
              disabled={savingPersonal}
              className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-500 disabled:opacity-50"
            >
              {savingPersonal ? "Saving..." : "Save Personal Info"}
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
                onClick={handleSaveCompany}
                disabled={savingCompany}
                className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold shadow hover:bg-blue-600 disabled:opacity-50"
              >
                {savingCompany ? "Saving..." : "Save Company Info"}
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