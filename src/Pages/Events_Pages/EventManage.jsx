import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { inventoryService } from "../../services/inventoryService";
import { useApiList } from "../../hooks/useApiList";

const EventManage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: events, totalEntries, totalPages, loading, error, refetch } = useApiList(
    inventoryService.events.getAll,
    { searchTerm, currentPage, entriesToShow }
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await inventoryService.events.delete(id);
        refetch();
      } catch (err) {
        alert(err.message || "Failed to delete event");
      }
    }
  };

  const formatDate = (dateString) => dateString.split(",")[0] || dateString.split(" ")[0];

  const columns = [
    { header: "SL No", accessor: "id" },
    { header: "Subject", accessor: "subject" },
    { header: "Customer Name", accessor: "customerName" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Date",
      accessor: "date",
      render: (row) => formatDate(row.date),
    },
    { header: "No Of Person", accessor: "noOfPerson" },
    {
      header: "Advance Amount",
      accessor: "advanceAmount",
      render: (row) => `$${parseFloat(row.advanceAmount).toLocaleString()}`,
    },
    {
      header: "Menu",
      accessor: "menu",
      render: (row) => row.menu || <span className="text-gray-400">Not specified</span>,
    },
    {
      header: "Description",
      accessor: "description",
      render: (row) => row.description || <span className="text-gray-400">Not specified</span>,
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Booked"
              ? "bg-blue-100 text-blue-800"
              : row.status === "Resolved"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 sm:bg-gray-100 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your organization's events and bookings
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 focus:outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Link to="Create" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
              <FaPlus className="mr-2" />
              Create New Event
            </button>
          </Link>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading events...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-yellow-400">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      {column.header}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {column.render ? column.render(event) : event[column.accessor]}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                      <Link
                        to={`/events/edit/${event.id}`}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-rose-600 hover:text-rose-900 flex items-center"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No matching events found" : "No events found"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? "Try adjusting your search terms" : "Get started by creating a new event"}
            </p>
            {!searchTerm && (
              <Link to="Create">
                <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
                  <FaPlus className="mr-2" />
                  Create New Event
                </button>
              </Link>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-gray-600">
            Page {currentPage} of {totalPages} ({totalEntries} events)
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EventManage;
