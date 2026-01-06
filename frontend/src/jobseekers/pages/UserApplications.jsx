import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMyApplications, withdrawApplication } from "../../api/applicationApi";
import ApplicationCard from "../../components/ApplicationCard";
import useApplicationUpdates from "../../hooks/useApplicationUpdates";

const UserApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Use the custom hook for application updates
  const { lastUpdated, startPolling, stopPolling } = useApplicationUpdates(
    applications,
    setApplications,
    30000 // Poll every 30 seconds
  );

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
    
    // Start polling for updates
    startPolling();
    
    // Clean up polling on component unmount
    return () => {
      stopPolling();
    };
  }, []);

  if (loading) return <p className="text-center mt-20">Loading applications...</p>;

  return (
    <section className="py-5 bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="container mx-auto px-3 md:px-0">
         <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#0b132b] mb-3">My Applications</h2>
          <p className="text-gray-600 text-lg">
            
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              You have not applied to any jobs yet.
            </p>
            <a 
              href="/browse-jobs" 
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </a>
          </div>
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