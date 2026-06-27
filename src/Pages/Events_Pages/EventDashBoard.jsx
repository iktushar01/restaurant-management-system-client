import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {
  FaCalendarAlt,
  FaList,
  FaCalendarDay,
  FaCalendarWeek,
  FaBars,
  FaTimes
} from "react-icons/fa";
import "react-calendar/dist/Calendar.css";
import { inventoryService } from "../../services/inventoryService";

// Utility: Random avatar generator
const getAvatar = (id) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`;

const EventBadge = ({ type }) => {
  const colors = {
    meeting: "bg-primary/10 text-foreground",
    call: "bg-success/10 text-success",
    event: "bg-purple-100 text-purple-800",
    deadline: "bg-destructive/10 text-red-800",
    personal: "bg-yellow-100 text-yellow-800",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium ${
        colors[type] || "bg-muted text-foreground"
      }`}
    >
      {type}
    </span>
  );
};

const EventCard = ({ event }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-md transition">
      <img
        src={getAvatar(event.id)}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-foreground">{event.title}</h4>
          <EventBadge type={event.type} />
        </div>
        <p className="text-sm text-muted-foreground">
          {event.date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}{" "}
          •{" "}
          {event.date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

const EventDashBoard = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    inventoryService.events.getAll({ limit: 100 })
      .then((res) => {
        const mapped = (res.data || []).map((e) => ({
          id: e.id,
          title: e.subject,
          customerName: e.customerName,
          date: new Date(e.dateISO || e.date),
          type: e.status === "Booked" ? "event" : e.status === "Resolved" ? "deadline" : "meeting",
          status: e.status,
        }));
        setEvents(mapped);
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const getDayEvents = (date) =>
    events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );

  const getAgendaEvents = () => {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 7);

    return events
      .filter((event) => event.date >= startDate && event.date <= endDate)
      .sort((a, b) => a.date - b.date);
  };

  // Dynamic View Rendering
  const renderView = () => {
    switch (view) {
      case "month":
        return (
          <div className="bg-card rounded-lg shadow-md p-4 md:p-6">
            <Calendar
              onChange={setDate}
              value={date}
              className="w-full border-none text-sm md:text-base"
              tileClassName={({ date: tileDate, view }) =>
                view === "month" &&
                tileDate.getDate() === date.getDate() &&
                tileDate.getMonth() === date.getMonth()
                  ? "bg-blue-200 rounded-full"
                  : ""
              }
            />
          </div>
        );

      case "week":
        const weekDays = [];
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());

        for (let i = 0; i < 7; i++) {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);
          weekDays.push(day);
        }

        return (
          <div className="bg-card rounded-lg shadow-md p-4 md:p-6 overflow-x-auto">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              {weekDays[0].toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {weekDays[6].toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              {date.getFullYear()}
            </h2>
            <div className="grid grid-cols-7 gap-2 min-w-[700px]">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`text-center p-2 md:p-3 rounded-lg ${
                    day.getDate() === date.getDate()
                      ? "bg-primary/10"
                      : "bg-muted/40"
                  }`}
                >
                  <div className="font-semibold text-xs md:text-sm">
                    {day.toLocaleDateString("en-US", { weekday: isMobile ? "narrow" : "short" })}
                  </div>
                  <div className="text-base md:text-lg">{day.getDate()}</div>
                  <div className="mt-2 space-y-1">
                    {getDayEvents(day).map((ev) => (
                      <EventBadge key={ev.id} type={ev.type} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "day":
        const dayEvents = getDayEvents(date);
        const timeSlots = [];
        for (let hour = 9; hour <= 18; hour++) timeSlots.push(hour);

        return (
          <div className="bg-card rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4">
              {date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h2>
            <div className="space-y-3">
              {timeSlots.map((hour) => (
                <div key={hour} className="flex gap-4 border-t pt-2">
                  <div className="w-16 md:w-20 font-medium text-sm md:text-base">{hour}:00</div>
                  <div className="flex-1">
                    {dayEvents
                      .filter((event) => event.date.getHours() === hour)
                      .map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "agenda":
        const agendaEvents = getAgendaEvents();
        return (
          <div className="bg-card rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4">Agenda (Next 7 Days)</h2>
            <div className="space-y-4">
              {agendaEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const ViewButton = ({ btn }) => (
    <button
      key={btn.key}
      onClick={() => {
        setView(btn.key);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center px-3 py-2 md:px-4 md:py-2 rounded-lg ${
        view === btn.key
          ? "bg-primary/50 text-primary-foreground"
          : "bg-gray-200 text-foreground"
      }`}
    >
      <span className="mr-1 md:mr-2">{btn.icon}</span>
      {!isMobile && btn.label}
    </button>
  );

  const viewButtons = [
    { key: "month", label: "Month", icon: <FaCalendarAlt /> },
    { key: "week", label: "Week", icon: <FaCalendarWeek /> },
    { key: "day", label: "Day", icon: <FaCalendarDay /> },
    { key: "agenda", label: "Agenda", icon: <FaList /> },
  ];

  if (loading) {
    return <div className="p-6 max-w-7xl mx-auto text-center text-muted-foreground">Loading calendar...</div>;
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">📆 Event Calendar</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage and view your events dynamically</p>
        </div>
        
        {isMobile && (
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-200"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>

      {/* View Switcher */}
      {isMobile ? (
        <>
          {mobileMenuOpen && (
            <div className="grid grid-cols-2 gap-2">
              {viewButtons.map((btn) => (
                <ViewButton key={btn.key} btn={btn} />
              ))}
            </div>
          )}
          <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
            {viewButtons.map((btn) => (
              <ViewButton key={btn.key} btn={btn} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex space-x-2">
          {viewButtons.map((btn) => (
            <ViewButton key={btn.key} btn={btn} />
          ))}
        </div>
      )}

      {/* Calendar */}
      {renderView()}

      {/* Upcoming Events */}
      <div className="bg-card rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {events.slice(0, 5).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @media (max-width: 640px) {
          :global(.react-calendar) {
            font-size: 12px;
          }
          
          :global(.react-calendar__tile) {
            padding: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default EventDashBoard;