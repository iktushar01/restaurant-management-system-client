import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { financeService } from "../../../services/financeService";
import { useApiList } from "../../../hooks/useApiList";

const ExpenseIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: entries, totalEntries, totalPages, loading, error, refetch, startIndex } = useApiList(
    financeService.expenseEntries.getAll,
    { searchTerm, currentPage, entriesToShow }
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense record?")) {
      try {
        await financeService.expenseEntries.delete(id);
        refetch();
      } catch (err) {
        alert(err.message || "Failed to delete");
      }
    }
  };

  const columns = [
    { header: "SL No", accessor: "ID" },
    { header: "Expense Head Name", accessor: "expenseHeadName" },
    { header: "Amount", accessor: "amount", render: (row) => Number(row.amount).toFixed(2) },
    { header: "Note", accessor: "note", render: (row) => row.note || <span className="text-gray-400">-</span> },
    { header: "Date", accessor: "date" },
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-blue-600 hover:text-blue-900",
      render: (row) => (
        <Link to={`/expense/Expense/Edit/${row.id}`} className="flex items-center space-x-1">
          <FaEdit className="inline mr-1" />
          <span>Edit</span>
        </Link>
      ),
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-red-600 hover:text-red-900",
      render: (row) => (
        <button onClick={() => handleDelete(row.id)} className="flex items-center space-x-1 text-red-600 hover:text-red-900">
          <FaTrash className="inline mr-1" />
          <span>Delete</span>
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Expense Records</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">Manage your organization's expense records</p>
        </div>
        <Link to="Create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlus className="mr-2" />
            Create New Expense
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
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search expense records..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full md:w-64"
          />
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
      {loading ? <div className="text-center py-12 text-gray-500">Loading...</div> : (
        <ReusableTable columns={columns} data={entries} actions={actions} className="mt-6" />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-gray-700">
        <div>
          Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries} entries
        </div>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-50 hover:bg-gray-100"}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === totalPages || totalPages === 0 ? "bg-gray-100 text-gray-400" : "bg-gray-50 hover:bg-gray-100"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseIndex;
