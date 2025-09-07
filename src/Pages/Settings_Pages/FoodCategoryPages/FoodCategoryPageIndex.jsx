import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaCheck } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const FoodCategoryPageIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample food category data matching the image
  const [categories, setCategories] = useState([
    { id: 1, name: "Appetizer (Thai)", note: "", serialNo: 1 },
    { id: 2, name: "Salad (Thai)", note: "", serialNo: 2 },
    { id: 3, name: "Soup (Thai)", note: "", serialNo: 3 },
    { id: 4, name: "Rice (Thai)", note: "", serialNo: 4 },
    { id: 5, name: "Noodles (Thai)", note: "", serialNo: 5 },
    { id: 6, name: "Beef (Thai)", note: "", serialNo: 6 },
    { id: 7, name: "Chicken (Thai)", note: "", serialNo: 7 },
    { id: 8, name: "Seafood (Thai)", note: "", serialNo: 8 },
    { id: 9, name: "Vegetarian (Thai)", note: "", serialNo: 9 },
    { id: 10, name: "Dessert (Thai)", note: "", serialNo: 10 },
  ]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategories.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + entriesToShow);

  // Delete category function
  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  const columns = [
    {
      header: "Sl. No",
      accessor: "id",
    },
    {
      header: "Category Name",
      accessor: "name",
    },
    {
      header: "Note",
      accessor: "note",
      render: (row) =>
        row.note ? (
          row.note
        ) : (
          <span className="text-gray-400">Not specified</span>
        ),
    },
    {
      header: "Serial No",
      accessor: "serialNo",
      render: (row) => (
        <div className="flex items-center justify-center">
          <FaCheck className="text-green-500" />
          <span className="ml-1">{row.serialNo}</span>
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-indigo-600 hover:text-indigo-900",
      render: (row) => (
        <Link 
          to={`edit/${row.id}`}
          className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded hover:bg-indigo-50"
        >
          <FaEdit className="text-sm" />
          <span className="text-sm">Edit</span>
        </Link>
      ),
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-red-600 hover:text-red-900",
      onClick: (row) => handleDeleteCategory(row.id),
      render: (row) => (
        <button
          onClick={() => handleDeleteCategory(row.id)}
          className="flex items-center space-x-1 text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
        >
          <FaTrash className="text-sm" />
          <span className="text-sm">Delete</span>
        </button>
      ),
    },
  ];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 sm:bg-gray-100 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Food Categories
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your restaurant food categories
          </p>
        </div>
        <Link to="create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlus className="mr-2" />
            Add New Category
          </button>
        </Link>
      </div>

      {/* Search and entries filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Show</span>
          <select
            value={entriesToShow}
            onChange={(e) => {
              setEntriesToShow(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing entries
            }}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="ml-2 text-gray-700">entries</span>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full md:w-64"
          />
        </div>
      </div>

      {/* ✅ Reusable Table */}
      <ReusableTable 
        columns={columns} 
        data={paginatedCategories} 
        actions={actions} 
      />

      {/* Table info and pagination */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-gray-700">
        <div>
          Showing {filteredCategories.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, filteredCategories.length)} of {filteredCategories.length} entries
        </div>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button 
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === page ? 'bg-indigo-50 text-indigo-600 font-medium' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            Next
          </button>
        </div>
      </div>

      {categories.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No categories found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding a new food category
          </p>
          <Link to="create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Add New Category
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FoodCategoryPageIndex;