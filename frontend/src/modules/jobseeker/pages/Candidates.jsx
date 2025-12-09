import React, { useEffect, useState } from "react";
import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";
import { getOnlyUsers } from "@/services/api/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // For modal

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo?.token) {
          toast.error("You are not logged in");
          setLoading(false);
          return;
        }

        const users = await getOnlyUsers(userInfo.token);
        setCandidates(users);
      } catch (error) {
        console.error("Failed to load candidates:", error);
        toast.error(error.response?.data?.message || "Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading candidates...</p>;

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="py-12 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Candidates</h2>
          <p className="text-gray-500 text-lg">Find talented professionals for your company.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {candidates.length > 0 ? (
            candidates.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transform transition-all hover:-translate-y-2 hover:shadow-xl hover:bg-blue-50"
              >
                <img
                  src={
                    user.profileImage
                      ? `http://localhost:5000/uploads/${user.profileImage}`
                      : "/default-avatar.png"
                  }
                  alt={user.firstName}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-blue-100 shadow-sm"
                />
                <h3 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
                <p className="text-gray-500">{user.email}</p>

                <button
                  onClick={() => setSelectedUser(user)} // Open modal
                  className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  View Profile
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg col-span-full text-center">No candidates found.</p>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50 overflow-auto px-4">
          <div className="bg-white rounded-3xl shadow-md max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={
                  selectedUser.profileImage
                    ? `http://localhost:5000/uploads/${selectedUser.profileImage}`
                    : "/default-avatar.png"
                }
                alt={selectedUser.firstName}
                className="w-32 h-32 rounded-full mb-4 object-cover border-2 border-blue-100 shadow-sm"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedUser.firstName} {selectedUser.lastName}</h3>
              <p className="text-gray-500 mb-1">{selectedUser.email}</p>
              <p className="text-gray-500 mb-1">{selectedUser.country || "Country not provided"}</p>
              <p className="text-gray-500 mb-1">{selectedUser.city || "City not provided"}</p>
              <p className="text-gray-500 mb-1">{selectedUser.phone || "Phone not provided"}</p>
              <p className="text-gray-500">{selectedUser.role || "Role not specified"}</p>
            </div>
          </div>
        </div>
      )}

   
    </>
  );
};

export default Candidates;
