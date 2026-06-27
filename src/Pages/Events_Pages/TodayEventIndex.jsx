import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { inventoryService } from "../../services/inventoryService";

const TodayEventIndex = () => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[today.getDay()];

    setCurrentDate(`${day}/${month}/${year} (${dayName})`);

    const fetchTodayEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await inventoryService.events.getToday();
        setTodayEvents(res.data || []);
      } catch (err) {
        setError(err.message || "Failed to load today's events");
      } finally {
        setLoading(false);
      }
    };

    fetchTodayEvents();
  }, []);

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Today's Events</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            {currentDate && `Events scheduled for ${currentDate}`}
          </p>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading today's events...</div>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {todayEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {column.render ? column.render(event) : event[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && todayEvents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events scheduled for today</h3>
            <p className="text-gray-500 mb-6">All events are organized and managed efficiently</p>
            <Link to="/events/create">
              <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
                <FaPlus className="mr-2" />
                Schedule an Event
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayEventIndex;
