import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllContactMessages } from "../../api/contactApi";

// Component to display a single review
const ReviewCard = ({ name, role, rating, comment, date }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-left transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center text-xl font-bold text-indigo-700 shadow-sm">
          {name[0]}
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-gray-900">{name}</h4>
          {/* <p className="text-gray-500 text-sm">{role}</p> */}
          {/* {date && (
            <p className="text-gray-400 text-xs mt-1">
              {new Date(date).toLocaleDateString()}
            </p>
          )} */}
        </div>
      </div>
      <div className="mb-3 text-yellow-500 text-lg">
        {"★".repeat(rating) + "☆".repeat(5 - rating)}
      </div>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
};

// Homepage Review Section
const ReviewsSection = () => {
  const defaultReviews = [
    { name: "Alice", role: "Frontend Developer", rating: 5, comment: "Amazing platform, found my dream job here!" },
    { name: "Bob", role: "Backend Developer", rating: 4, comment: "Very professional and easy to navigate." },
    { name: "Charlie", role: "UI/UX Designer", rating: 4, comment: "Loved the variety of job opportunities available." },
    { name: "David", role: "Data Analyst", rating: 5, comment: "Highly recommend this site for job seekers." },
    { name: "Eva", role: "Product Manager", rating: 3, comment: "Good but could use more filtering options." },
  ];

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6; // Show 6 reviews per page

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllContactMessages();
        if (response.status === "success") {
          // Transform contact messages to match review format
          const contactReviews = response.result.map(msg => ({
            name: msg.name,
            role: "User",
            rating: msg.rating,
            comment: msg.message,
            date: msg.createdAt
          }));
          setReviews([...defaultReviews, ...contactReviews]);
        } else {
          // Fallback to default reviews if API fails
          setReviews(defaultReviews);
          toast.error(response.message || "Failed to load reviews");
        }
      } catch (error) {
        // Fallback to default reviews if API fails
        setReviews(defaultReviews);
        toast.error(error.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Get current reviews for the page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">User Reviews</h2>
          <p className="text-gray-600 mb-12">Loading reviews...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <ToastContainer />
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">User Reviews</h2>
        <p className="text-gray-600 mb-12">See what our users say about their experience</p>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews available yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentReviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  name={review.name}
                  role={review.role}
                  rating={review.rating}
                  comment={review.comment}
                  date={review.date}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => {
                  const pageNumber = i + 1;
                  // Show first, last, current, and nearby pages
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    Math.abs(pageNumber - currentPage) <= 1
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`px-3 py-1 rounded ${
                          currentPage === pageNumber
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:text-blue-600"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  // Show ellipsis for skipped pages
                  if (pageNumber === 2 && currentPage > 3) {
                    return <span key="start-ellipsis" className="px-1">...</span>;
                  }
                  if (pageNumber === totalPages - 1 && currentPage < totalPages - 2) {
                    return <span key="end-ellipsis" className="px-1">...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;