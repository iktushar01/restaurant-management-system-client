import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { waiterService } from "../../../services/waiterService";

const WaiterPageIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [waiters, setWaiters] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWaiters = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await waiterService.getAll({ search: searchTerm, page: currentPage, limit: entriesToShow });
      setWaiters(res.data || []);
      setTotalEntries(res.meta?.total || 0);
      setTotalPages(res.meta?.totalPages || 0);
    } catch (err) {
      setError(err.message || "Failed to load waiters");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage, entriesToShow]);

  useEffect(() => { fetchWaiters(); }, [fetchWaiters]);

  const handleDeleteWaiter = async (id) => {
    if (window.confirm("Are you sure you want to delete this waiter?")) {
      try {
        await waiterService.delete(id);
        fetchWaiters();
      } catch (err) {
        alert(err.message || "Failed to delete waiter");
      }
    }
  };

  const columns = [
    {
      header: "ID",
      accessor: "ID",
    },
    {
      header: "Name",
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
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-indigo-600 hover:text-indigo-900",
      render: (row) => (
        <Link
          to={`/WorkPeriod/waiters/edit/${row.ID}`}
          className="flex items-center space-x-1"
        >
          <FaEdit />
          <span>Edit</span>
        </Link>
      ),
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-red-600 hover:text-red-900",
      onClick: (row) => handleDeleteWaiter(row.ID),
      render: (row) => (
        <button
          onClick={() => handleDeleteWaiter(row.ID)}
          className="flex items-center space-x-1"
        >
          <FaTrash />
          <span>Delete</span>
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 sm:bg-gray-100 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Waiters
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your restaurant waiters
          </p>
        </div>
        <Link to="create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlus className="mr-2" />
            Add New Waiter
          </button>
        </Link>
      </div>

      {/* Search and entries filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Show</span>
          <select
            value={entriesToShow}
            onChange={(e) => setEntriesToShow(Number(e.target.value))}
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
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* ✅ Reusable Table */}
      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading waiters...</div>
      ) : (
        <ReusableTable columns={columns} data={waiters} actions={actions} />
      )}

      {/* Table info and pagination */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-gray-700">
        <div>
          Showing {totalEntries > 0 ? 1 : 0} to {Math.min(entriesToShow, totalEntries)} of {totalEntries} entries
        </div>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-indigo-50 text-indigo-600 font-medium">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>

      {waiters.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No waiters found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding a new waiter
          </p>
          <Link to="create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Add New Waiter
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WaiterPageIndex;