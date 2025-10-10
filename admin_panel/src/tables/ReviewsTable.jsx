import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiTrash2, FiStar } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

const ReviewsTable = () => {
  // Load reviews from localStorage or use default
  const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [
    {
      id: 1,
      userName: "John Doe",
      companyName: "Tech Corp",
      rating: 5,
      review: "Excellent company to work with. Great culture and benefits!",
      date: "2025-10-05",
      status: "Approved",
    },
    {
      id: 2,
      userName: "Jane Smith",
      companyName: "Design Studio",
      rating: 4,
      review: "Good work environment, but could improve communication.",
      date: "2025-10-08",
      status: "Pending",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      companyName: "StartUp Inc",
      rating: 3,
      review: "Average experience. Management needs improvement.",
      date: "2025-10-10",
      status: "Approved",
    },
  ];

  const [reviews, setReviews] = useState(storedReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedReview, setSelectedReview] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Persist reviews to localStorage
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Filter and paginate reviews
  const filteredReviews = reviews.filter(
    (review) =>
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / rowsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["User", "Company", "Rating", "Review", "Date", "Status"]],
      body: filteredReviews.map((review) => [
        review.userName,
        review.companyName,
        `${review.rating}/5`,
        review.review.substring(0, 50) + "...",
        review.date,
        review.status,
      ]),
    });
    doc.save("reviews.pdf");
  };

  // CSV Export
  const csvData = filteredReviews.map((review) => ({
    User: review.userName,
    Company: review.companyName,
    Rating: review.rating,
    Review: review.review,
    Date: review.date,
    Status: review.status,
  }));

  // Delete review
  const handleDelete = () => {
    setReviews(reviews.filter((r) => r.id !== selectedReview.id));
    setOpenDelete(false);
    setSelectedReview(null);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${
              star <= rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 dark:text-gray-600"
            }`}
            size={16}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Manage Reviews</h1>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center space-x-2">
          <button
            onClick={exportPDF}
            className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export PDF
          </button>

          <CSVLink
            data={csvData}
            filename="reviews.csv"
            className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="overflow-x-auto rounded-lg shadow dark:shadow-gray-900">
        <table className="w-full bg-white dark:bg-gray-800 text-sm border-t border-gray-300 dark:border-gray-700 border-collapse">
          <thead className="bg-blue-500 dark:bg-blue-700 text-white uppercase text-sm">
            <tr>
              {["User", "Company", "Rating", "Review", "Date", "Status", "Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.length ? (
              paginatedReviews.map((review) => (
                <tr key={review.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3 text-gray-900 dark:text-gray-100 font-medium">{review.userName}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{review.companyName}</td>
                  <td className="p-3">{renderStars(review.rating)}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100 max-w-xs truncate">{review.review}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{review.date}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="p-3 flex items-center space-x-3">
                    <button 
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" 
                      onClick={() => { setSelectedReview(review); setOpenView(true); }}
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </button>
                    <button 
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      onClick={() => { setSelectedReview(review); setOpenDelete(true); }}
                      title="Delete Review"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-5 text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Show per page:</span>
          <Select
            value={rowsPerPage}
            size="small"
            onChange={(e) => { setRowsPerPage(e.target.value); setPage(1); }}
            className="bg-white"
          >
            {[5, 10, 20, 50].map((num) => <MenuItem key={num} value={num}>{num}</MenuItem>)}
          </Select>
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">Page {page} / {totalPages}</div>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          shape="rounded"
          siblingCount={0}
          boundaryCount={0}
        />
      </div>

      {/* View Modal */}
      {openView && selectedReview && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto relative">
            {/* Close button */}
            <button
              onClick={() => setOpenView(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Review Details
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Full review information</p>
            </div>

            {/* Review Details */}
            <div className="space-y-4 mb-6">
              {/* User Info */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">User Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{selectedReview.userName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Company:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{selectedReview.companyName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{selectedReview.date}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Rating</h3>
                <div className="flex items-center gap-3">
                  {renderStars(selectedReview.rating)}
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{selectedReview.rating}/5</span>
                </div>
              </div>

              {/* Review Text */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Review</h3>
                <p className="text-gray-900 dark:text-gray-100 leading-relaxed">{selectedReview.review}</p>
              </div>

              {/* Status */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Status</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedReview.status)}`}>
                  {selectedReview.status}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setOpenView(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {openDelete && selectedReview && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-11/12 md:w-1/3 relative">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Delete Review</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this review from <strong>{selectedReview.userName}</strong>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setOpenDelete(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsTable;
