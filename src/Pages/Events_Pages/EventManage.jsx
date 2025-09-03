import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const EventManage = () => {
  // Sample event data
  const [events, setEvents] = useState([
    {
      id: 1,
      subject: "test event",
      customerName: "tushar",
      phone: "2342342234234",
      date: "04/09/2025 00:00:00",
      noOfPerson: 24,
      advanceAmount: "34534534.00",
      menu: "sadfast",
      description: "fastasd asf asfghdihrt.rt",
      status: "Booked"
    },
    {
      id: 2,
      subject: "test",
      customerName: "fweff stwe",
      phone: "234234",
      date: "03/09/2025 00:00:00",
      noOfPerson: 234,
      advanceAmount: "23.00",
      menu: "sis fs fed",
      description: "f sdsdff sofsd ff",
      status: "Booked"
    },
    {
      id: 3,
      subject: "birthday party",
      customerName: "Yasin",
      phone: "87568732465",
      date: "15/08/2025 00:00:00",
      noOfPerson: 12,
      advanceAmount: "100.00",
      menu: "dfg dfg",
      description: "das a f fafa",
      status: "Resolved"
    },
    {
      id: 4,
      subject: "birthday party",
      customerName: "bappa",
      phone: "87568732465",
      date: "30/11/2022 00:00:00",
      noOfPerson: 20,
      advanceAmount: "100.00",
      menu: "",
      description: "",
      status: "Resolved"
    },
    {
      id: 5,
      subject: "Birthday",
      customerName: "Mr. Reza",
      phone: "01817111963",
      date: "23/11/2022 00:00:00",
      noOfPerson: 300,
      advanceAmount: "5000.00",
      menu: "huji",
      description: "Jkk",
      status: "Resolved"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter events based on search term
  const filteredEvents = events.filter(event =>
    event.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.phone.includes(searchTerm)
  );

  // Handle delete event
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  // Format date to display only date part
  const formatDate = (dateString) => {
    return dateString.split(' ')[0];
  };

  // Table columns
  const columns = [
    { header: "SL No", accessor: "id" },
    { header: "Subject", accessor: "subject" },
    { header: "Customer Name", accessor: "customerName" },
    { header: "Phone", accessor: "phone" },
    { 
      header: "Date", 
      accessor: "date",
      render: (row) => formatDate(row.date)
    },
    { header: "No Of Person", accessor: "noOfPerson" },
    { 
      header: "Advance Amount", 
      accessor: "advanceAmount",
      render: (row) => `$${parseFloat(row.advanceAmount).toLocaleString()}`
    },
    { 
      header: "Menu", 
      accessor: "menu",
      render: (row) => row.menu || <span className="text-gray-400">Not specified</span>
    },
    { 
      header: "Description", 
      accessor: "description",
      render: (row) => row.description || <span className="text-gray-400">Not specified</span>
    },
    { 
      header: "Status", 
      accessor: "status",
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === "Booked" ? "bg-blue-100 text-blue-800" :
          row.status === "Received" ? "bg-green-100 text-green-800" :
          "bg-gray-100 text-gray-800"
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="p-6 max-w-7xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 sm:bg-gray-100 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Event Management
          </h1>
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
              onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
              {filteredEvents.map((event, index) => (
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
        
        {filteredEvents.length === 0 && (
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
    </div>
  );
};

export default EventManage;