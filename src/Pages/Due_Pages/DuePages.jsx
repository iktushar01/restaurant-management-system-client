import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import ReusableTable from "../../Shared/ReusableTable/ReusableTable";
import { dueService } from "../../services/dueService";
import { useApiList } from "../../hooks/useApiList";

const DuePages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: dueData, totalEntries, totalPages, loading, error, refetch, startIndex } = useApiList(
    dueService.entries.getAll,
    { searchTerm, currentPage, entriesToShow }
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await dueService.entries.delete(id);
        refetch();
      } catch (err) {
        alert(err.message || "Failed to delete");
      }
    }
  };

  const columns = [
    { header: "Guest Name", accessor: "guestName" },
    { header: "Phone No", accessor: "phoneNo" },
    {
      header: "Total Due Amount",
      accessor: "totalDueAmount",
      render: (row) => `$${Number(row.totalDueAmount).toFixed(2)}`,
    },
    { header: "Payment Method", accessor: "paymentMethod" },
    {
      header: "Pay Amount",
      accessor: "payAmount",
      render: (row) => `$${Number(row.payAmount).toFixed(2)}`,
    },
  ];

  const actions = [
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
    <div className="p-6 max-w-7xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Due Management</h1>
          <p className="text-gray-600 mt-1">Manage guest due payments</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={entriesToShow}
            onChange={(e) => { setEntriesToShow(Number(e.target.value)); setCurrentPage(1); }}
            className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <ReusableTable
          columns={columns}
          data={dueData}
          actions={actions}
          containerClass="bg-white rounded-lg shadow overflow-hidden"
          tableClass="min-w-full divide-y divide-gray-200"
          theadClass="bg-gray-100"
          thClass="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          tbodyClass="bg-white divide-y divide-gray-200"
          tdClass="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 bg-white p-4 rounded-lg shadow">
        <div className="text-sm text-gray-600">
          Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded text-sm ${currentPage === 1 ? "text-gray-400 bg-gray-100" : "text-gray-600 hover:bg-gray-50"}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border border-gray-300 rounded text-sm ${currentPage === totalPages || totalPages === 0 ? "text-gray-400 bg-gray-100" : "text-gray-600 hover:bg-gray-50"}`}
          >
            Next
          </button>
        </div>
      </div>

      {!loading && totalEntries === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No due records found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? "Try a different search term" : "Get started by creating a new payment record"}
          </p>
          <Link to="Create">
            <button className="px-5 py-2.5 bg-yellow-400 text-gray-900 font-medium rounded-lg hover:bg-yellow-500 transition-colors inline-flex items-center">
              <FaPlus className="mr-2" />
              New Payment
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DuePages;
