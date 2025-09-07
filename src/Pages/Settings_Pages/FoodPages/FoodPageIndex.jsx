import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUtensils } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const FoodPageIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample food data matching the image
  const [foods, setFoods] = useState([
    { id: 1, category: "Appetizer (Thai)", foodNo: "01", foodName: "Chicken Saizy", serialNo: 1, availability: "Available", quantity: 395.00, price: 395.00 },
    { id: 2, category: "Appetizer (Thai)", foodNo: "02", foodName: "Fried/Grilled Chicken Wings", serialNo: 2, availability: "Available", quantity: 330.00, price: 330.00 },
    { id: 3, category: "Appetizer (Thai)", foodNo: "03", foodName: "Fish Finger (Fish Chup Pang Tod)", serialNo: 3, availability: "Available", quantity: 360.00, price: 360.00 },
    { id: 4, category: "Appetizer (Thai)", foodNo: "04", foodName: "Butter Fried Prawn", serialNo: 4, availability: "Available", quantity: 380.00, price: 380.00 },
    { id: 5, category: "Appetizer (Thai)", foodNo: "05", foodName: "Drums of Haven", serialNo: 5, availability: "Available", quantity: 360.00, price: 360.00 },
    { id: 6, category: "Appetizer (Thai)", foodNo: "06", foodName: "Tempura Vegetable", serialNo: 6, availability: "Available", quantity: 280.00, price: 280.00 },
    { id: 7, category: "Appetizer (Thai)", foodNo: "07", foodName: "Tempura Mixed", serialNo: 7, availability: "Available", quantity: 380.00, price: 380.00 },
    { id: 8, category: "Appetizer (Thai)", foodNo: "08", foodName: "Royal Spring Roll", serialNo: 8, availability: "Available", quantity: 320.00, price: 320.00 },
    { id: 9, category: "Salad (Thai)", foodNo: "09", foodName: "Lab Kai (Chicken Salad)", serialNo: 9, availability: "Available", quantity: 425.00, price: 425.00 },
    { id: 10, category: "Salad (Thai)", foodNo: "10", foodName: "Mixed Seafood Salad (Yan Talay)", serialNo: 10, availability: "Available", quantity: 450.00, price: 450.00 },
    { id: 11, category: "Salad (Thai)", foodNo: "11", foodName: "Cashewnut Salad (Sauç)", serialNo: 11, availability: "Available", quantity: 390.00, price: 390.00 },
    { id: 12, category: "Salad (Thai)", foodNo: "12", foodName: "Papaya Salad (Som Tam)", serialNo: 12, availability: "Available", quantity: 325.00, price: 325.00 },
    { id: 13, category: "Soup (Thai)", foodNo: "13", foodName: "Tom Yam Soup (Clear)", serialNo: 13, availability: "Available", quantity: 400.00, price: 400.00 },
    { id: 14, category: "Soup (Thai)", foodNo: "14", foodName: "Mixed Tom Yam Soup (Cloudy)", serialNo: 14, availability: "Available", quantity: 450.00, price: 450.00 },
    { id: 15, category: "Soup (Thai)", foodNo: "15", foodName: "King Prawn Soup (Clear/Cloudy)", serialNo: 15, availability: "Available", quantity: 550.00, price: 550.00 },
  ]);

  const filteredFoods = foods.filter((food) =>
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.foodNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredFoods.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const paginatedFoods = filteredFoods.slice(startIndex, startIndex + entriesToShow);

  // Delete food function
  const handleDeleteFood = (id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      setFoods(foods.filter(food => food.id !== id));
    }
  };

  const columns = [
    {
      header: "SL No",
      accessor: "serialNo",
    },
    {
      header: "Category Name",
      accessor: "category",
    },
    {
      header: "Food No",
      accessor: "foodNo",
    },
    {
      header: "Food Name",
      accessor: "foodName",
    },
    {
      header: "Serial No",
      accessor: "serialNo",
    },
    {
      header: "Availability",
      accessor: "availability",
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.availability === "Available" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {row.availability}
        </span>
      ),
    },
    {
      header: "Quantity",
      accessor: "quantity",
      render: (row) => row.quantity.toFixed(2),
    },
    {
      header: "Price",
      accessor: "price",
      render: (row) => row.price.toFixed(2),
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
      onClick: (row) => handleDeleteFood(row.id),
      render: (row) => (
        <button
          onClick={() => handleDeleteFood(row.id)}
          className="flex items-center space-x-1 text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
        >
          <FaTrash className="text-sm" />
          <span className="text-sm">Delete</span>
        </button>
      ),
    },
    {
      label: "Add Recipe",
      icon: FaUtensils,
      className: "text-amber-600 hover:text-amber-900",
      render: (row) => (
        <Link 
          to={`recipe/${row.id}`}
          className="flex items-center space-x-1 text-amber-600 hover:text-amber-900 px-2 py-1 rounded hover:bg-amber-50"
        >
          <FaUtensils className="text-sm" />
          <span className="text-sm">Add Recipe</span>
        </Link>
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
    <div className="p-6 max-w-7xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 sm:bg-gray-100 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Food Items
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your restaurant food menu
          </p>
        </div>
        <Link to="create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlus className="mr-2" />
            Add New Food
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
              setCurrentPage(1);
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
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full md:w-64"
          />
        </div>
      </div>

      {/* ✅ Reusable Table */}
      <ReusableTable 
        columns={columns} 
        data={paginatedFoods} 
        actions={actions} 
      />

      {/* Table info and pagination */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-gray-700">
        <div>
          Showing {filteredFoods.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, filteredFoods.length)} of {filteredFoods.length} entries
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

      {foods.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No food items found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding a new food item
          </p>
          <Link to="create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Add New Food
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FoodPageIndex;