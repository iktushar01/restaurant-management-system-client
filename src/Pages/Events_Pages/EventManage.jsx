import React, { useState } from "react";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";
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
    const ok = await confirm({ description: "Are you sure you want to delete this event?" });
    if (!ok) return;
    try {
        await inventoryService.events.delete(id);
        refetch();
      } catch (err) {
        toast.error(err.message || "Failed to delete event");
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-muted/40 sm:bg-muted/40 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Event Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage your organization's events and bookings
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring focus:outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Link to="Create" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
              <FaPlus className="mr-2" />
              Create New Event
            </button>
          </Link>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading events...</div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-muted/40">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {column.render ? column.render(event) : event[column.accessor]}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                      <Link
                        to={`/events/edit/${event.id}`}
                        className="text-primary hover:text-primary/80 flex items-center"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-destructive hover:text-destructive/80 flex items-center"
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
            <h3 className="text-lg font-medium text-foreground mb-2">
              {searchTerm ? "No matching events found" : "No events found"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Try adjusting your search terms" : "Get started by creating a new event"}
            </p>
            {!searchTerm && (
              <Link to="Create">
                <button className="px-5 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 inline-flex items-center">
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
          <span className="px-3 py-1 text-sm text-muted-foreground">
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
