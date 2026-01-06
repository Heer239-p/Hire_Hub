import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiTrash2, FiStar, FiRefreshCw } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllContactMessages, deleteContactMessage } from "../services/contactService";

const ReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedReview, setSelectedReview] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Fetch reviews from API
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const reviewData = await fetchAllContactMessages();
        setReviews(reviewData);
        setError(null);
        // Show success message only when not refreshing
        if (!refreshFlag) {
          toast.success("Reviews loaded successfully!");
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
        setError("Failed to load reviews. Please try again later.");
        toast.error("Failed to load reviews. Please try again later.");
        // Fallback to localStorage data if API fails
        const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [
          {
            id: 1,
            userName: "John Doe",
            companyName: "Tech Corp",
            rating: 5,
            review: "Excellent company to work with. Great culture and benefits!",
            date: "2025-10-05",
          },
          {
            id: 2,
            userName: "Jane Smith",
            companyName: "Design Studio",
            rating: 4,
            review: "Good work environment, but could improve communication.",
            date: "2025-10-08",
          },
          {
            id: 3,
            userName: "Mike Johnson",
            companyName: "StartUp Inc",
            rating: 3,
            review: "Average experience. Management needs improvement.",
            date: "2025-10-10",
          },
        ];
        setReviews(storedReviews);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [refreshFlag]);

  // Filter and paginate reviews
  const filteredReviews = reviews.filter(
    (review) =>
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / rowsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // PDF Export
  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [["User", "Email", "Rating", "Review", "Date"]],
        body: filteredReviews.map((review) => [
          review.userName,
          review.email,
          `${review.rating}/5`,
          review.review.substring(0, 50) + "...",
          review.date,
        ]),
      });
      doc.save("reviews.pdf");
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("Failed to export PDF:", error);
      toast.error("Failed to export PDF. Please try again.");
    }
  };

  // CSV Export
  const csvData = filteredReviews.map((review) => ({
    User: review.userName,
    Email: review.email,
    Rating: review.rating,
    Review: review.review,
    Date: review.date,
  }));

  // Handle CSV export success
  const handleCsvExport = () => {
    toast.success("CSV exported successfully!");
  };

  // Delete review
  const handleDelete = async () => {
    try {
      await deleteContactMessage(selectedReview.id);
      setReviews(reviews.filter((r) => r.id !== selectedReview.id));
      setOpenDelete(false);
      setSelectedReview(null);
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Failed to delete review. Please try again.");
    }
  };

  // Refresh reviews
  const handleRefresh = () => {
    setRefreshFlag(!refreshFlag);
    toast.info("Refreshing reviews...");
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

  // Show loading or error state
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Manage Reviews</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading reviews...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Manage Reviews</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600 dark:text-red-400">{error}</div>
        </div>
      </div>
    );
  }

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
            onClick={handleCsvExport}
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
              {["User", "Email", "Rating", "Review", "Date", "Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.length ? (
              paginatedReviews.map((review) => (
                <tr key={review.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3 text-gray-900 dark:text-gray-100 font-medium">{review.userName}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{review.email}</td>
                  <td className="p-3">{renderStars(review.rating)}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100 max-w-xs truncate">{review.review}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{review.date}</td>
                  <td className="p-3 flex items-center space-x-3">
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
                <td colSpan="6" className="text-center p-5 text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
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