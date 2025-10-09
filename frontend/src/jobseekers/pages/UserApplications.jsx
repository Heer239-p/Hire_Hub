import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMyApplications, withdrawApplication } from "../api/applicationApi";
import ApplicationCard from "../components/ApplicationCard";

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
      toast.error(error.response?.data?.message || "Failed to load applications");
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
    <section className="py-10 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto px-6">
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
