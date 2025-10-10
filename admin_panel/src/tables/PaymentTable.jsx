import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiDownload, FiPlus } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

const PaymentTable = () => {
  // Load payments from localStorage or use default
  const storedPayments = JSON.parse(localStorage.getItem("payments")) || [
    {
      id: 1,
      transactionId: "TXN001",
      userName: "John Doe",
      amount: 5000,
      date: "2025-10-01",
      status: "Completed",
      method: "Credit Card",
    },
    {
      id: 2,
      transactionId: "TXN002",
      userName: "Jane Smith",
      amount: 3500,
      date: "2025-10-05",
      status: "Pending",
      method: "PayPal",
    },
    {
      id: 3,
      transactionId: "TXN003",
      userName: "Mike Johnson",
      amount: 7500,
      date: "2025-10-08",
      status: "Completed",
      method: "Bank Transfer",
    },
  ];

  const [payments, setPayments] = useState(storedPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openView, setOpenView] = useState(false);

  // Persist payments to localStorage
  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  // Filter and paginate payments
  const filteredPayments = payments.filter(
    (payment) =>
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Transaction ID", "User", "Amount", "Date", "Status", "Method"]],
      body: filteredPayments.map((payment) => [
        payment.transactionId,
        payment.userName,
        `₹${payment.amount}`,
        payment.date,
        payment.status,
        payment.method,
      ]),
    });
    doc.save("payments.pdf");
  };

  // CSV Export
  const csvData = filteredPayments.map((payment) => ({
    "Transaction ID": payment.transactionId,
    User: payment.userName,
    Amount: payment.amount,
    Date: payment.date,
    Status: payment.status,
    Method: payment.method,
  }));

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  // Download Receipt Function
  const downloadReceipt = (payment) => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246); // Blue color
    doc.text("PAYMENT RECEIPT", 105, 20, { align: "center" });
    
    // Add company info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("HireHub Admin Panel", 105, 30, { align: "center" });
    doc.text("Payment Management System", 105, 37, { align: "center" });
    
    // Add line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 45, 190, 45);
    
    // Add payment details
    doc.setFontSize(11);
    let yPos = 60;
    
    doc.setFont(undefined, "bold");
    doc.text("Transaction Details:", 20, yPos);
    yPos += 10;
    
    doc.setFont(undefined, "normal");
    doc.text(`Transaction ID: ${payment.transactionId}`, 20, yPos);
    yPos += 8;
    doc.text(`Date: ${payment.date}`, 20, yPos);
    yPos += 8;
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 20, yPos);
    yPos += 15;
    
    doc.setFont(undefined, "bold");
    doc.text("Customer Information:", 20, yPos);
    yPos += 10;
    
    doc.setFont(undefined, "normal");
    doc.text(`Name: ${payment.userName}`, 20, yPos);
    yPos += 15;
    
    doc.setFont(undefined, "bold");
    doc.text("Payment Information:", 20, yPos);
    yPos += 10;
    
    doc.setFont(undefined, "normal");
    doc.text(`Payment Method: ${payment.method}`, 20, yPos);
    yPos += 8;
    doc.text(`Status: ${payment.status}`, 20, yPos);
    yPos += 15;
    
    // Add amount box
    doc.setFillColor(59, 130, 246);
    doc.rect(20, yPos, 170, 25, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text(`Total Amount: ₹${payment.amount.toLocaleString()}`, 105, yPos + 16, { align: "center" });
    
    // Add footer
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(9);
    doc.text("Thank you for your payment!", 105, 270, { align: "center" });
    doc.text("This is a computer-generated receipt.", 105, 277, { align: "center" });
    
    // Save PDF
    doc.save(`Receipt_${payment.transactionId}.pdf`);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Manage Payments</h1>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search payments..."
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
            filename="payments.csv"
            className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto rounded-lg shadow dark:shadow-gray-900">
        <table className="w-full bg-white dark:bg-gray-800 text-sm border-t border-gray-300 dark:border-gray-700 border-collapse">
          <thead className="bg-blue-500 dark:bg-blue-700 text-white uppercase text-sm">
            <tr>
              {["Transaction ID", "User", "Amount", "Date", "Status", "Method", "Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.length ? (
              paginatedPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3 text-gray-900 dark:text-gray-100 font-medium">{payment.transactionId}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{payment.userName}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100 font-semibold">₹{payment.amount.toLocaleString()}</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{payment.date}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">{payment.method}</td>
                  <td className="p-3 flex items-center space-x-3">
                    <button 
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" 
                      onClick={() => { setSelectedPayment(payment); setOpenView(true); }}
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </button>
                    <button 
                      className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                      onClick={() => downloadReceipt(payment)}
                      title="Download Receipt"
                    >
                      <FiDownload size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-5 text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
                  No payments found.
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

      {/* View Modal - Enhanced */}
      {openView && selectedPayment && (
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
                Payment Receipt
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Transaction Details</p>
            </div>

            {/* Transaction ID Badge */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Transaction ID</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{selectedPayment.transactionId}</span>
              </div>
            </div>

            {/* Payment Details Grid */}
            <div className="space-y-4 mb-6">
              {/* Customer Info */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Customer Information</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Name:</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{selectedPayment.userName}</span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Payment Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{selectedPayment.method}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{selectedPayment.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedPayment.status)}`}>
                      {selectedPayment.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount - Highlighted */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold">₹{selectedPayment.amount.toLocaleString()}</p>
                  </div>
                  <div className="text-5xl opacity-20">💳</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => downloadReceipt(selectedPayment)}
                className="flex-1 bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <FiDownload size={18} />
                Download Receipt
              </button>
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
    </div>
  );
};

export default PaymentTable;
