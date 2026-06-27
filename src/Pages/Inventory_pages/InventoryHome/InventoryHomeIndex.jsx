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
  FaSignOutAlt,
} from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { inventoryService } from "../../../services/inventoryService";
import { useApiList } from "../../../hooks/useApiList";

const InventoryHomeIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const { data: items, totalEntries, totalPages, loading, error, startIndex } = useApiList(
    inventoryService.items.getAll,
    { searchTerm, currentPage, entriesToShow }
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const columns = [
    { header: "SL No", accessor: "id" },
    { header: "Category", accessor: "category" },
    { header: "SubCategory", accessor: "subCategory" },
    {
      header: "Brand",
      accessor: "brand",
      render: (row) => row.brand || <span className="text-gray-400">-</span>,
    },
    { header: "Item", accessor: "item" },
    { header: "Unit", accessor: "unit" },
    {
      header: "Locate",
      accessor: "locate",
      render: (row) => (
        <button
          onClick={() => navigate(`/inventory/locate/${row.id}`)}
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
          onClick={() => navigate(`/inventory/stock-out/${row.id}`)}
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 sm:bg-gray-100 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">Manage your inventory items and operations</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <Link to="/inventory/pay">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm">
            <FaMoneyBillWave className="text-xl mb-1" /> Pay
          </button>
        </Link>
        <Link to="/inventory/cashback">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm">
            <FaCoins className="text-xl mb-1" /> Cashback
          </button>
        </Link>
        <Link to="/inventory/stock-in">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-sm">
            <FaBoxOpen className="text-xl mb-1" /> Stock In
          </button>
        </Link>
        <Link to="/inventory/move-stock">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-sm">
            <FaExchangeAlt className="text-xl mb-1" /> Move Stock
          </button>
        </Link>
        <Link to="/inventory/location">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm">
            <FaMapMarkerAlt className="text-xl mb-1" /> Location
          </button>
        </Link>
        <Link to="/inventory/purchase">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-sm">
            <FaFilePdf className="text-xl mb-1" /> Purchase
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Show</span>
          <select
            value={entriesToShow}
            onChange={(e) => { setEntriesToShow(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2 text-gray-700">entries</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Search:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-3 pr-4 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full md:w-64"
          />
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading inventory...</div>
      ) : (
        <ReusableTable columns={columns} data={items} />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-gray-700">
        <div>
          Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries} entries
        </div>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-50 hover:bg-gray-100"}`}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0} className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === totalPages || totalPages === 0 ? "bg-gray-100 text-gray-400" : "bg-gray-50 hover:bg-gray-100"}`}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryHomeIndex;
