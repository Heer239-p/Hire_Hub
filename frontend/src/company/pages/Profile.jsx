import React from "react";
import useAuthUser from "../../hooks/useAuthUser";

const Profile = () => {
  const user = useAuthUser();

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase text-slate-500 font-semibold">Company</p>
        <h1 className="text-3xl font-bold text-slate-900">Profile & Branding</h1>
        <p className="text-slate-500 mt-2">
          Keep your info fresh so candidates know what makes your team unique.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-2xl font-bold text-blue-600">
              {(user?.companyName || user?.firstName || "H")
                .toString()
                .charAt(0)
                .toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mt-4">
              {user?.companyName || "HireHub Partner"}
            </h2>
            <p className="text-sm text-slate-500">{user?.industry || "Industry not set"}</p>
            <a
              href={user?.companyWebsite || "#"}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 text-sm font-semibold mt-2"
            >
              {user?.companyWebsite || "Add website"}
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-6">
          <div>
            <label className="text-sm font-semibold text-slate-600 block mb-2">
              Company description
            </label>
            <div className="rounded-2xl border border-slate-200 px-5 py-4 text-sm text-slate-600 min-h-[120px]">
              {user?.companyDescription || "Tell jobseekers about your mission, values, and culture."}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-slate-600 block mb-2">Contact</label>
              <div className="rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-600 space-y-1">
                <p>{user?.email || "Add hiring email"}</p>
                <p>{user?.mobile ? `+91 ${user.mobile}` : "Add phone number"}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-600 block mb-2">Point of Contact</label>
              <div className="rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-600 space-y-1">
                <p>
                  {user
                    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Assign owner"
                    : "Assign owner"}
                </p>
                <p className="text-slate-400 text-xs">Automatically pulled from your profile</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button className="px-5 py-3 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-400 transition">
              Edit details
            </button>
            <button className="px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-blue-600 transition">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
