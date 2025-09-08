import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaMoneyBillWave, 
  FaCoins, 
  FaBoxOpen, 
  FaExchangeAlt, 
  FaMapMarkerAlt, 
  FaFilePdf,
  FaEye,
  FaSignOutAlt
} from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const InventoryHomeIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const inventoryItems = [
    { 
      id: 1, 
      category: "Raw Materials", 
      subCategory: "Meat", 
      brand: "", 
      item: "Chicken (20.00)", 
      unit: "KG" 
    },
    { 
      id: 2, 
      category: "Raw Materials", 
      subCategory: "Meat", 
      brand: "", 
      item: "Beef (20.00)", 
      unit: "KG" 
    },
    { 
      id: 3, 
      category: "Raw Materials", 
      subCategory: "Meat", 
      brand: "", 
      item: "Mutton (20.00)", 
      unit: "KG" 
    },
  ];

  const filteredItems = inventoryItems.filter((item) =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + entriesToShow);

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

  const handleLocate = (id) => {
    // Navigate to locate page with item id
    navigate(`/inventory/locate/${id}`);
  };

  const handleStockOut = (id) => {
    // Navigate to stock out page with item id
    navigate(`/inventory/stock-out/${id}`);
  };

  const columns = [
    {
      header: "SL No",
      accessor: "id",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "SubCategory",
      accessor: "subCategory",
    },
    {
      header: "Brand",
      accessor: "brand",
      render: (row) => row.brand || <span className="text-gray-400">-</span>,
    },
    {
      header: "Item",
      accessor: "item",
    },
    {
      header: "Unit",
      accessor: "unit",
    },
    {
      header: "Locate",
      accessor: "locate",
      render: (row) => (
        <button
          onClick={() => handleLocate(row.id)}
          className="flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          title="Locate Item"
        >
          <FaEye className="mr-1" /> Locate
        </button>
      ),
    },
    {
      header: "Stock Out",
      accessor: "stockOut",
      render: (row) => (
        <button
          onClick={() => handleStockOut(row.id)}
          className="flex items-center justify-center p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          title="Stock Out"
        >
          <FaSignOutAlt className="mr-1" /> Stock Out
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 sm:bg-gray-100 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your inventory items and operations
          </p>
        </div>
      </div>

      {/* Navigation Buttons Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <Link to="/inventory/pay">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2">
            <FaMoneyBillWave className="text-xl mb-1" />
            Pay
          </button>
        </Link>
        
        <Link to="/inventory/cashback">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2">
            <FaCoins className="text-xl mb-1" />
            Cashback
          </button>
        </Link>
        
        <Link to="/inventory/stock-in">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2">
            <FaBoxOpen className="text-xl mb-1" />
            Stock In
          </button>
        </Link>
        
        <Link to="/inventory/move-stock">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2">
            <FaExchangeAlt className="text-xl mb-1" />
            Move Stock
          </button>
        </Link>
        
        <Link to="/inventory/location">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2">
            <FaMapMarkerAlt className="text-xl mb-1" />
            Location
          </button>
        </Link>
        
        <Link to="/inventory/pdf">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2">
            <FaFilePdf className="text-xl mb-1" />
            PDF
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
        
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Search:</span>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-3 pr-4 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* ✅ Reusable Table */}
      <ReusableTable columns={columns} data={paginatedItems} />

      {/* Table info and pagination */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-gray-700">
        <div>
          Showing {filteredItems.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, filteredItems.length)} of {filteredItems.length} entries
        </div>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button 
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            Previous
          </button>
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 hover:bg-gray-100'}`}
          >
            Next
          </button>
        </div>
      </div>

      {inventoryItems.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No inventory items found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding inventory items
          </p>
          <Link to="/inventory/items/create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
              Add Item
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default InventoryHomeIndex;