// import React, { useState } from "react";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { CSVLink } from "react-csv";
// import { Pagination, Select, MenuItem } from "@mui/material";
// import { FiEdit, FiTrash2 } from "react-icons/fi"; // 👈 icons imported

// const Companies = () => {
//   const allCompanies = [  
//     { id: 1, name: "ABC Corp", location: "New York", industry: "Tech", status: "Active" },
//     { id: 2, name: "XYZ Ltd", location: "California", industry: "Finance", status: "Active" },
//     { id: 3, name: "Acme Inc", location: "Texas", industry: "Manufacturing", status: "Inactive" },
//     { id: 4, name: "Globex", location: "Florida", industry: "Retail", status: "Active" },
//     { id: 5, name: "Initech", location: "New Jersey", industry: "IT", status: "Active" },
//     { id: 6, name: "Umbrella", location: "Nevada", industry: "Pharma", status: "Inactive" },
//   ];

//   const [companies, setCompanies] = useState(allCompanies);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const filteredCompanies = companies.filter(
//     (c) =>
//       c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.industry.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredCompanies.length / rowsPerPage);
//   const paginatedCompanies = filteredCompanies.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     autoTable(doc, {
//       head: [["Name", "Location", "Industry", "Status"]],
//       body: filteredCompanies.map((c) => [c.name, c.location, c.industry, c.status]),
//     });
//     doc.save("companies.pdf");
//   };

//   const csvData = filteredCompanies.map((c) => ({
//     Name: c.name,
//     Location: c.location,
//     Industry: c.industry,
//     Status: c.status,
//   }));

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-semibold mb-6 text-gray-800">Manage Companies</h1>

//       {/* Search & Export */}
//       <div className="flex items-center justify-between mb-5">
//         <input
//           type="text"
//           placeholder="Search companies..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <div className="space-x-2">
//           <button
//             onClick={exportPDF}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
//           >
//             Export PDF
//           </button>
//           <CSVLink
//             data={csvData}
//             filename="companies.csv"
//             className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
//           >
//             Export CSV
//           </CSVLink>
//         </div>
//       </div>

//       {/* Companies Table */}
//       <div className="overflow-x-auto rounded-lg shadow">
//         <table className="w-full bg-white text-sm border-t border-gray-300 border-collapse">
//           <thead className="bg-blue-500 text-white uppercase text-sm">
//             <tr>
//               {["Name", "Location", "Industry", "Status", "Actions"].map((head) => (
//                 <th key={head} className="p-3 text-left font-semibold">{head}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedCompanies.length ? (
//               paginatedCompanies.map((c) => (
//                 <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
//                   <td className="p-3">{c.name}</td>
//                   <td className="p-3">{c.location}</td>
//                   <td className="p-3">{c.industry}</td>
//                   <td className="p-3">{c.status}</td>

//                   {/* 👇 Action Icons */}
//                   <td className="p-3 flex items-center space-x-3">
//                     <button
//                       className="text-blue-500 hover:text-blue-700"
//                       title="Edit Company"
//                     >
//                       <FiEdit size={18} />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-700"
//                       title="Delete Company"
//                     >
//                       <FiTrash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center p-5 text-gray-500 border-t border-gray-300">
//                   No companies found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4 gap-4">
//         <div className="flex items-center space-x-2">
//           <span className="text-gray-700 text-sm font-medium">Show per page:</span>
//           <Select
//             value={rowsPerPage}
//             size="small"
//             onChange={(e) => { setRowsPerPage(e.target.value); setPage(1); }}
//             className="bg-white"
//           >
//             {[5, 10, 20, 50].map((num) => (
//               <MenuItem key={num} value={num}>{num}</MenuItem>
//             ))}
//           </Select>
//         </div>

//         <div className="text-gray-700 text-sm font-medium">
//           Page {page} of {totalPages}
//         </div>

//         <Pagination
//           count={totalPages}
//           page={page}
//           onChange={(e, value) => setPage(value)}
//           color="primary"
//           shape="rounded"
//           siblingCount={1}
//           boundaryCount={0}
//         />
//       </div>
//     </div>
//   );
// };

// export default Companies;




// /pages/company.jsx
import React from 'react';
import CompanyTable from '../tables/companyTable';

const Employers = () => {
  return <CompanyTable />;
};

export default Employers;
