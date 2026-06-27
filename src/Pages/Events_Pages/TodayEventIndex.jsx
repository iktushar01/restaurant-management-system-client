import React, { useState, useEffect } from "react";
import { formatMoney } from "@/lib/currency";
import { formatEventDate, getEventStatusBadgeClass } from "@/lib/eventUtils";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorBanner } from "@/Shared/ErrorBanner/ErrorBanner";
import { EmptyState, LoadingState } from "@/Shared/PageStates/PageStates";
import PageHeader from "@/Shared/PageHeader/PageHeader";
import PageLayout from "@/Shared/PageLayout/PageLayout";
import ReusableTable from "@/Shared/ReusableTable/ReusableTable";
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

    setCurrentDate(`${day}/${month}/${year} (${days[today.getDay()]})`);

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

  const columns = [
    { header: "Subject", accessor: "subject" },
    { header: "Customer", accessor: "customerName" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Time",
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

  return (
    <PageLayout className="p-4 md:p-6 lg:px-8">
      <PageHeader
        title="Today's Events"
        subtitle={currentDate ? `Scheduled for ${currentDate}` : "Loading date..."}
      >
        <Button variant="outline" render={<Link to="/events/create" />} className="w-full sm:w-auto">
          <FaPlus className="mr-2" />
          Schedule Event
        </Button>
      </PageHeader>

      <ErrorBanner message={error} className="mb-4" />

      {loading ? (
        <LoadingState message="Loading today's events..." />
      ) : todayEvents.length === 0 ? (
        <EmptyState
          title="No events scheduled for today"
          description="You're all clear — or schedule something new."
        >
          <Button render={<Link to="/events/create" />}>
            <FaPlus className="mr-2" />
            Schedule an Event
          </Button>
        </EmptyState>
      ) : (
        <ReusableTable columns={columns} data={todayEvents} />
      )}
    </PageLayout>
  );
};

export default TodayEventIndex;
