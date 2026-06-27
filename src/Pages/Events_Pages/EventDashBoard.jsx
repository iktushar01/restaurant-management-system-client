import React, { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import {
  CalendarDaysIcon,
  CalendarIcon,
  LayoutListIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getEventStatusBadgeClass } from "@/lib/eventUtils";
import { LoadingState } from "@/Shared/PageStates/PageStates";
import PageHeader from "@/Shared/PageHeader/PageHeader";
import PageLayout from "@/Shared/PageLayout/PageLayout";
import { inventoryService } from "../../services/inventoryService";

const VIEW_OPTIONS = [
  { key: "month", label: "Month", icon: CalendarIcon },
  { key: "week", label: "Week", icon: CalendarDaysIcon },
  { key: "day", label: "Day", icon: CalendarDaysIcon },
  { key: "agenda", label: "Agenda", icon: LayoutListIcon },
];

const EventCard = ({ event }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/40 transition-colors">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
      <UsersIcon className="size-4" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-semibold text-foreground truncate">{event.title}</h4>
        <Badge variant="outline" className={getEventStatusBadgeClass(event.status)}>
          {event.status}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mt-0.5">{event.customerName}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {event.date.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}{" "}
        ·{" "}
        {event.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  </div>
);

const EventDashBoard = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    inventoryService.events
      .getAll({ limit: 100 })
      .then((res) => {
        const mapped = (res.data || []).map((e) => ({
          id: e.id,
          title: e.subject,
          customerName: e.customerName,
          date: new Date(e.dateISO || e.date),
          status: e.status,
        }));
        setEvents(mapped);
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const getDayEvents = (day) =>
    events.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );

  const agendaEvents = useMemo(() => {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 7);
    return events
      .filter((event) => event.date >= startDate && event.date <= endDate)
      .sort((a, b) => a.date - b.date);
  }, [events, date]);

  const weekDays = useMemo(() => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  }, [date]);

  const renderView = () => {
    switch (view) {
      case "month":
        return (
          <Card>
            <CardContent className="p-4 md:p-6 [&_.react-calendar]:w-full [&_.react-calendar]:border-0 [&_.react-calendar]:bg-transparent">
              <Calendar
                onChange={setDate}
                value={date}
                tileContent={({ date: tileDate, view: calView }) => {
                  if (calView !== "month") return null;
                  const count = getDayEvents(tileDate).length;
                  if (!count) return null;
                  return (
                    <p className="text-[10px] font-semibold text-primary text-center mt-0.5">
                      {count} evt
                    </p>
                  );
                }}
              />
            </CardContent>
          </Card>
        );

      case "week":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {weekDays[0].toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                {" – "}
                {weekDays[6].toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto pb-4">
              <div className="grid grid-cols-7 gap-2 min-w-[640px]">
                {weekDays.map((day) => {
                  const dayEvents = getDayEvents(day);
                  const isSelected = day.toDateString() === date.toDateString();
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => setDate(day)}
                      className={cn(
                        "rounded-lg border p-2 text-left min-h-[100px] transition-colors",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-muted/30 hover:bg-muted/50"
                      )}
                    >
                      <p className="text-xs font-medium text-muted-foreground">
                        {day.toLocaleDateString(undefined, { weekday: "short" })}
                      </p>
                      <p className="text-lg font-bold">{day.getDate()}</p>
                      <div className="mt-2 space-y-1">
                        {dayEvents.slice(0, 2).map((ev) => (
                          <p key={ev.id} className="text-[10px] truncate text-foreground">
                            {ev.title}
                          </p>
                        ))}
                        {dayEvents.length > 2 && (
                          <p className="text-[10px] text-muted-foreground">+{dayEvents.length - 2} more</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );

      case "day": {
        const dayEvents = getDayEvents(date);
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {date.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {dayEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">No events on this day.</p>
              ) : (
                dayEvents.map((event) => <EventCard key={event.id} event={event} />)
              )}
            </CardContent>
          </Card>
        );
      }

      case "agenda":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Agenda — next 7 days</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agendaEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">No upcoming events.</p>
              ) : (
                agendaEvents.map((event) => <EventCard key={event.id} event={event} />)
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
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
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <PageHeader
          title="Event Calendar"
          subtitle="View and plan upcoming bookings"
          className="flex-1 border shadow-sm"
        />
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" className="md:hidden" onClick={() => setMobileMenuOpen((v) => !v)}>
            {mobileMenuOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </Button>
          <Button render={<Link to="/events/create" />}>Create Event</Button>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-wrap gap-2",
          mobileMenuOpen ? "flex" : "hidden md:flex"
        )}
      >
        {VIEW_OPTIONS.map((btn) => {
          const Icon = btn.icon;
          return (
            <Button
              key={btn.key}
              variant={view === btn.key ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setView(btn.key);
                setMobileMenuOpen(false);
              }}
              className="gap-1.5"
            >
              <Icon className="size-4" />
              {btn.label}
            </Button>
          );
        })}
      </div>

      {renderView()}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events
            .filter((e) => e.date >= new Date())
            .sort((a, b) => a.date - b.date)
            .slice(0, 5)
            .map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          {events.filter((e) => e.date >= new Date()).length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">No upcoming events scheduled.</p>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default EventDashBoard;
