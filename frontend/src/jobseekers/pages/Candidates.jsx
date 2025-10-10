import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getOnlyUsers } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center mt-10">Loading candidates...</p>;

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="pt-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Candidates</h2>
        <p className="text-gray-600 mb-6">Find talented professionals for your company.</p>

        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {candidates.length > 0 ? (
            candidates.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
              >
                <img
                  src={user.profileImage ? `http://localhost:5000/uploads/${user.profileImage}` : "/default-avatar.png"}
                  alt={user.firstName}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />

                <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-gray-500">{user.mobile}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No candidates found.</p>
          )}
        </div>
      </div>

    </>
  );
};

export default Candidates;
