import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const TodayEventIndex = () => {
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

  const [todayEvents, setTodayEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  // Get today's date in the format "DD/MM/YYYY (Day)"
  useEffect(() => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[today.getDay()];
    
    setCurrentDate(`${day}/${month}/${year} (${dayName})`);
    
    // Filter events for today (matching the date format in events)
    const todayFormatted = `${day}/${month}/${year}`;
    const todaysEvents = events.filter(event => {
      const eventDate = event.date.split(' ')[0]; // Get just the date part
      return eventDate === todayFormatted;
    });
    
    setTodayEvents(todaysEvents);
  }, [events]);

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
          row.status === "Resolved" ? "bg-green-100 text-green-800" :
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
            Today's Events
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            {currentDate && `Events scheduled for ${currentDate}`}
          </p>
        </div>
      </div>

      {/* Today's Events Table */}
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {todayEvents.map((event, index) => (
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
        
        {todayEvents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events scheduled for today
            </h3>
            <p className="text-gray-500 mb-6">
              All events are organized and managed efficiently
            </p>
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