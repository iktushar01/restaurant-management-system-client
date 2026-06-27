import React, { useMemo, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { mapEventsToCalendar } from "@/lib/eventUtils";
import "./event-calendar.css";

const EventCalendar = ({ events = [], onEventClick, onDateSelect, initialView = "dayGridMonth" }) => {
  const calendarRef = useRef(null);

  const calendarEvents = useMemo(() => mapEventsToCalendar(events), [events]);

  return (
    <div className="event-calendar w-full min-h-[620px]">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView={initialView}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        events={calendarEvents}
        height="auto"
        contentHeight="auto"
        aspectRatio={1.8}
        dayMaxEvents={3}
        moreLinkClick="popover"
        navLinks
        editable={false}
        selectable
        selectMirror
        nowIndicator
        weekends
        slotMinTime="08:00:00"
        slotMaxTime="23:00:00"
        allDaySlot={false}
        eventDisplay="block"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: "short",
        }}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          onEventClick?.(info.event);
        }}
        dateClick={(info) => {
          onDateSelect?.(info.date);
        }}
        select={(info) => {
          onDateSelect?.(info.start);
        }}
        eventDidMount={(info) => {
          const { customerName, status } = info.event.extendedProps;
          info.el.title = [info.event.title, customerName, status].filter(Boolean).join(" · ");
        }}
      />
    </div>
  );
};

export default EventCalendar;
