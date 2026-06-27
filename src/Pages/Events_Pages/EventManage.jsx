import React, { useState } from "react";
import { formatMoney } from "@/lib/currency";
import { formatEventDate, getEventStatusBadgeClass } from "@/lib/eventUtils";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { EmptyState, LoadingState } from "@/Shared/PageStates/PageStates";
import PageHeader from "@/Shared/PageHeader/PageHeader";
import PageLayout from "@/Shared/PageLayout/PageLayout";
import ReusableTable from "@/Shared/ReusableTable/ReusableTable";
import { ErrorBanner } from "@/Shared/ErrorBanner/ErrorBanner";
import { inventoryService } from "../../services/inventoryService";
import { useApiList } from "../../hooks/useApiList";
import { toast } from "sonner";

const EventManage = () => {
  const { confirm } = useConfirmDialog();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: events, totalEntries, totalPages, loading, error, refetch } =
    useApiList(inventoryService.events.getAll, { searchTerm, currentPage, entriesToShow });

  const handleDelete = async (id) => {
    const ok = await confirm({
      title: "Delete event?",
      description: "This event will be permanently removed.",
      confirmLabel: "Delete",
    });
    if (!ok) return;
    try {
      await inventoryService.events.delete(id);
      toast.success("Event deleted");
      refetch();
    } catch (err) {
      toast.error(err.message || "Failed to delete event");
    }
  };

  const columns = [
    { header: "Subject", accessor: "subject" },
    { header: "Customer", accessor: "customerName" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Date",
      accessor: "date",
      render: (row) => formatEventDate(row.date),
    },
    { header: "Guests", accessor: "noOfPerson" },
    {
      header: "Advance",
      accessor: "advanceAmount",
      render: (row) => formatMoney(row.advanceAmount),
    },
    {
      header: "Menu",
      accessor: "menu",
      render: (row) => row.menu || <span className="text-muted-foreground">—</span>,
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <Badge variant="outline" className={getEventStatusBadgeClass(row.status)}>
          {row.status}
        </Badge>
      ),
    },
  ];

  const actions = [
    {
      label: "Edit",
      render: (row) => (
        <Link
          to={`/events/edit/${row.id}`}
          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"
        >
          <FaEdit /> Edit
        </Link>
      ),
    },
    {
      label: "Delete",
      render: (row) => (
        <button
          type="button"
          onClick={() => handleDelete(row.id)}
          className="inline-flex items-center gap-1 text-sm text-destructive hover:text-destructive/80"
        >
          <FaTrash /> Delete
        </button>
      ),
    },
  ];

  return (
    <PageLayout className="p-4 md:p-6 lg:px-8">
      <PageHeader
        title="Event Management"
        subtitle="Manage bookings, parties, and scheduled events"
      >
        <Button render={<Link to="/events/create" />} className="w-full sm:w-auto">
          <FaPlus className="mr-2" />
          Create Event
        </Button>
      </PageHeader>

      <ErrorBanner message={error} className="mb-4" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span>Show</span>
          <SelectField
            value={entriesToShow}
            onValueChange={(v) => {
              setEntriesToShow(Number(v));
              setCurrentPage(1);
            }}
            className="w-20"
            options={[
              { value: "10", label: "10" },
              { value: "25", label: "25" },
              { value: "50", label: "50" },
            ]}
          />
          <span>entries</span>
        </div>
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-3.5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 py-2 w-full border border-border rounded-md bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading events..." />
      ) : events.length === 0 ? (
        <EmptyState
          title={searchTerm ? "No matching events" : "No events yet"}
          description={
            searchTerm
              ? "Try a different search term."
              : "Create your first event booking to get started."
          }
        >
          {!searchTerm && (
            <Button render={<Link to="/events/create" />}>
              <FaPlus className="mr-2" />
              Create Event
            </Button>
          )}
        </EmptyState>
      ) : (
        <>
          <ReusableTable columns={columns} data={events} actions={actions} />
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
              <p className="text-sm text-muted-foreground">{totalEntries} total events</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </PageLayout>
  );
};

export default EventManage;
