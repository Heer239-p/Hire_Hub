import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMyApplications, withdrawApplication } from "../../../services/api/applicationApi";

const ApplicationCard = ({ app, onWithdraw }) => {
  const { job = {}, status, _id } = app || {};
  const { title = "No title", company = "Unknown", location = "Unknown", salary = "N/A", jobType = "N/A" } = job;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-500">{company} • {location}</p>
      <p className="text-gray-500">{salary} • {jobType}</p>
      <p className="mt-2 text-gray-700 font-medium">Status: {status}</p>
      <button
        onClick={() => onWithdraw(_id)}
        className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Withdraw
      </button>
    </div>
  );
};

const UserApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getMyApplications();
      setApplications(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Failed to load applications");
    }
  };

  const handleWithdraw = async (id) => {
    try {
      await withdrawApplication(id);
      toast.success("Application withdrawn successfully!");
      fetchApplications(); // refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to withdraw application");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading applications...</p>;

  return (
    <section className="py-5 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto px-3 md:px-0">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          My Job Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not applied to any jobs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app) => (
              <ApplicationCard
                key={app._id}
                app={app}
                onWithdraw={handleWithdraw}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UserApplications;
