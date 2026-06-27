import React, { useState, useEffect } from "react";
import { formatMoney } from "@/lib/currency";
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
      render: (row) => formatMoney(row.advanceAmount)},
    },
    {
      header: "Menu",
      accessor: "menu",
      render: (row) => row.menu || <span className="text-muted-foreground">Not specified</span>,
    },
    {
      header: "Description",
      accessor: "description",
      render: (row) => row.description || <span className="text-muted-foreground">Not specified</span>,
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Booked"
              ? "bg-primary/10 text-foreground"
              : row.status === "Resolved"
                ? "bg-success/10 text-success"
                : "bg-muted text-foreground"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6    mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-muted/40 sm:bg-muted/40 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Today's Events</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            {currentDate && `Events scheduled for ${currentDate}`}
          </p>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading today's events...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-primary">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider"
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {todayEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-muted/40">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
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
            <h3 className="text-lg font-medium text-foreground mb-2">No events scheduled for today</h3>
            <p className="text-muted-foreground mb-6">All events are organized and managed efficiently</p>
            <Link to="/events/create">
              <button className="px-5 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 inline-flex items-center">
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
