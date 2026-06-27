import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDaysIcon, PlusIcon, UsersIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EventCalendar from "@/components/events/EventCalendar";
import { getEventStatusBadgeClass } from "@/lib/eventUtils";
import { LoadingState } from "@/Shared/PageStates/PageStates";
import PageHeader from "@/Shared/PageHeader/PageHeader";
import PageLayout from "@/Shared/PageLayout/PageLayout";
import { inventoryService } from "../../services/inventoryService";

const STATUS_LEGEND = [
  { label: "Booked", className: "bg-[#facc15] border-[#ca8a04]" },
  { label: "Confirmed", className: "bg-sky-500 border-sky-600" },
  { label: "Resolved", className: "bg-emerald-500 border-emerald-600" },
  { label: "Cancelled", className: "bg-red-500 border-red-600" },
];

const EventDetailCard = ({ event }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/30">
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
      <UsersIcon className="size-4" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-semibold text-foreground truncate">{event.title}</h4>
        <Badge variant="outline" className={getEventStatusBadgeClass(event.status)}>
          {event.status}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{event.customerName}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {event.date.toLocaleString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  </div>
);

const EventDashBoard = () => {
  const navigate = useNavigate();
  const [rawEvents, setRawEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    inventoryService.events
      .getAll({ limit: 200 })
      .then((res) => setRawEvents(res.data || []))
      .catch(() => setRawEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const events = useMemo(
    () =>
      rawEvents.map((e) => ({
        id: e.id,
        subject: e.subject,
        title: e.subject,
        customerName: e.customerName,
        phone: e.phone,
        date: new Date(e.dateISO || e.date),
        status: e.status,
        dateISO: e.dateISO,
      })),
    [rawEvents]
  );

  const selectedDayEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear()
      ),
    [events, selectedDate]
  );

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return events.filter((e) => e.date >= now).sort((a, b) => a.date - b.date).slice(0, 6);
  }, [events]);

  const handleEventClick = (fcEvent) => {
    if (fcEvent?.id) {
      navigate(`/events/edit/${fcEvent.id}`);
    }
  };

  if (loading) {
    return (
      <PageLayout className="p-4 md:p-6 lg:px-8">
        <LoadingState message="Loading event calendar..." />
      </PageLayout>
    );
  }

  return (
    <PageLayout className="p-4 md:p-6 lg:px-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <PageHeader
          title="Event Calendar"
          subtitle="Month, week, day & agenda views — click an event to edit"
          className="flex-1 border shadow-sm"
        />
        <Button render={<Link to="/events/create" />} className="shrink-0 gap-2">
          <PlusIcon className="size-4" />
          Create Event
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-muted/30 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
          <CalendarDaysIcon className="size-3.5" />
          Legend
        </span>
        {STATUS_LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`size-3 rounded-sm border ${item.className}`} />
            {item.label}
          </div>
        ))}
      </div>

      <Card className="overflow-hidden shadow-sm">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <EventCalendar
            events={rawEvents}
            onEventClick={handleEventClick}
            onDateSelect={setSelectedDate}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {selectedDate.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedDayEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No events on this day.
              </p>
            ) : (
              selectedDayEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => navigate(`/events/edit/${event.id}`)}
                  className="w-full text-left"
                >
                  <EventDetailCard event={event} />
                </button>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-6 space-y-3">
                <p className="text-sm text-muted-foreground">No upcoming events scheduled.</p>
                <Button variant="outline" size="sm" render={<Link to="/events/create" />}>
                  Schedule first event
                </Button>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => navigate(`/events/edit/${event.id}`)}
                  className="w-full text-left"
                >
                  <EventDetailCard event={event} />
                </button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default EventDashBoard;
