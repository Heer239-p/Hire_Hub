import React, { useState, useEffect } from "react";
import { Pagination, Select, MenuItem } from "@mui/material";
import { FiEye, FiEdit, FiTrash2, FiPlus, FiTag as FiTagIcon } from "react-icons/fi";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import AddModel from "../models/category/AddModel";
import ViewModel from "../models/category/ViewModel";
import UpdateModel from "../models/category/UpdateModel";
import DeleteModel from "../models/category/DeleteModel";

// React icons for categories
import { FiCpu, FiMonitor, FiCheckSquare, FiBriefcase, FiTag, FiBox, FiLayers, FiCode } from "react-icons/fi";

// Icon pool
export const iconPool = [
  <FiCpu className="text-blue-500 w-10 h-10" />,
  <FiMonitor className="text-purple-500 w-10 h-10" />,
  <FiCheckSquare className="text-green-500 w-10 h-10" />,
  <FiBriefcase className="text-yellow-500 w-10 h-10" />,
  <FiTag className="text-pink-500 w-10 h-10" />,
  <FiBox className="text-red-500 w-10 h-10" />,
  <FiLayers className="text-orange-500 w-10 h-10" />,
  <FiCode className="text-teal-500 w-10 h-10" />,
];

// Initial categories
const initialCategories = [
  { id: 1, iconIndex: 0, title: "IT & Software", description: "Explore top IT and software jobs near you.", createdDate: new Date().toLocaleDateString() },
  { id: 2, iconIndex: 1, title: "Marketing", description: "Discover marketing job opportunities.", createdDate: new Date().toLocaleDateString() },
  { id: 3, iconIndex: 2, title: "Design", description: "Creative design, UI/UX, and branding jobs.", createdDate: new Date().toLocaleDateString() },
  { id: 4, iconIndex: 3, title: "Finance", description: "Finance, accounting, and related jobs.", createdDate: new Date().toLocaleDateString() },
  { id: 5, iconIndex: 4, title: "Engineering", description: "Engineering and technical jobs.", createdDate: new Date().toLocaleDateString() },
  { id: 6, iconIndex: 5, title: "Business", description: "Business development, management jobs.", createdDate: new Date().toLocaleDateString() },
];

const CategoryTable = () => {
  const storedCategories = JSON.parse(localStorage.getItem("categories")) || initialCategories;
  const [categories, setCategories] = useState(storedCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Save categories in localStorage
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Filter & paginate
  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Title", "Description", "Date"]],
      body: filteredCategories.map((cat) => [cat.title, cat.description, cat.createdDate]),
    });
    doc.save("categories.pdf");
  };

  // CSV Export
  const csvData = filteredCategories.map((cat) => ({
    Title: cat.title,
    Description: cat.description,
    Date: cat.createdDate,
  }));

  // CRUD Handlers
  const handleAddCategory = (newCategory) => {
    const usedIndexes = categories.map((cat) => cat.iconIndex);
    let nextIconIndex = iconPool.findIndex((_, i) => !usedIndexes.includes(i));
    if (nextIconIndex === -1) nextIconIndex = 0;

    const catWithId = {
      id: Date.now(),
      ...newCategory,
      iconIndex: nextIconIndex,
      createdDate: new Date().toLocaleDateString(),
    };
    setCategories([...categories, catWithId]);
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id
          ? { ...updatedCategory, iconIndex: cat.iconIndex }
          : cat
      )
    );
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-100">
       Manage Categories
      </h1>

      {/* Search & Actions */}
      <div className="flex items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-1/3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex items-center space-x-2">
          <button onClick={() => setOpenAdd(true)} className="flex items-center bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
            <FiPlus className="mr-2" /> Add Category
          </button>
          <button onClick={exportPDF} className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">Export PDF</button>
          <CSVLink data={csvData} filename="categories.csv" className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow">Export CSV</CSVLink>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow dark:shadow-gray-900">
        <table className="w-full bg-white dark:bg-gray-800 text-sm border-t border-gray-300 dark:border-gray-700 border-collapse">
          <thead className="bg-blue-500 dark:bg-blue-700 text-white uppercase text-sm">
            <tr>
              {["Title", "Description", "Date", "Actions"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.length ? paginatedCategories.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="p-3 font-medium text-gray-700 dark:text-gray-100">{cat.title}</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">{cat.description}</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">{cat.createdDate}</td>
                <td className="p-3 flex items-center space-x-3">
                  <button className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" onClick={() => { setSelectedCategory(cat); setOpenView(true); }} title="View Details">
                    <FiEye size={20} />
                  </button>
                  <button className="text-green-500 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300" onClick={() => { setSelectedCategory(cat); setOpenUpdate(true); }} title="Edit Category">
                    <FiEdit size={20} />
                  </button>
                  <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" onClick={() => { setSelectedCategory(cat); setOpenDelete(true); }} title="Delete Category">
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500 dark:text-gray-400">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Show per page:</span>
          <Select value={rowsPerPage} size="small" onChange={(e) => { setRowsPerPage(e.target.value); setPage(1); }} className="bg-white">
            {[5,10,20,50].map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)}
          </Select>
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-sm font-medium">Page {page} / {totalPages}</div>
        <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="primary" shape="rounded" siblingCount={0} boundaryCount={0} />
      </div>

      {/* Modals */}
      {openAdd && <AddModel onClose={() => setOpenAdd(false)} onAdd={handleAddCategory} />}
      {openView && <ViewModel category={selectedCategory} onClose={() => setOpenView(false)} />}
      {openUpdate && <UpdateModel category={selectedCategory} onClose={() => setOpenUpdate(false)} onUpdate={handleUpdateCategory} />}
      {openDelete && <DeleteModel category={selectedCategory} onClose={() => setOpenDelete(false)} onConfirm={() => { handleDeleteCategory(selectedCategory.id); setOpenDelete(false); }} />}
    </div>
  );
};

export default CategoryTable;
