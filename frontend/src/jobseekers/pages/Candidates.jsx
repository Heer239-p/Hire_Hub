import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getOnlyUsers } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const candidatesPerPage = 8; // Show 8 candidates per page

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
        setTotalPages(Math.ceil(users.length / candidatesPerPage));
      } catch (error) {
        console.error("Failed to load candidates:", error);
        toast.error(error.response?.data?.message || "Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Get current candidates for the page
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6">
          {currentCandidates.length > 0 ? (
            currentCandidates.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transform transition-all hover:-translate-y-2 hover:shadow-xl hover:bg-blue-50 h-full flex flex-col"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={
                      user.profileImage
                        ? `http://localhost:5000/uploads/${user.profileImage}`
                        : "/default-avatar.png"
                    }
                    alt={user.firstName}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-blue-100 shadow-sm"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 text-center">{user.firstName} {user.lastName}</h3>
                  <p className="text-gray-500 text-center text-sm mt-1">{user.email}</p>
                  
                  {/* Essential information */}
                  {user.currentRole && (
                    <p className="text-gray-600 text-center mt-3 text-sm font-medium">{user.currentRole}</p>
                  )}
                  
                  <div className="mt-3 space-y-2 w-full">
                    {user.experienceYears && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Experience:</span>
                        <span className="text-gray-700 text-sm">
                          {user.experienceYears} year{user.experienceYears !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                    
                    {user.skills && (
                      <div className="flex justify-between items-start">
                        <span className="text-gray-500 text-sm">Skills:</span>
                        <span className="text-gray-700 text-sm text-right flex-1 ml-2">
                          {user.skills.length > 30 ? `${user.skills.substring(0, 30)}...` : user.skills}
                        </span>
                      </div>
                    )}
                    
                    {(user.city || user.country) && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Location:</span>
                        <span className="text-gray-700 text-sm">
                          {[user.city, user.country].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {user.linkedin && (
                    <a 
                      href={user.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                      </svg>
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg col-span-full text-center">No candidates found.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Candidates;