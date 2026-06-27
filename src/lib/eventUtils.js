export const EVENT_STATUS_BADGE = {
  Booked: "bg-primary/15 text-primary border-primary/30",
  Confirmed: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  Resolved: "bg-success/15 text-success border-success/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

export function getEventStatusBadgeClass(status) {
  return EVENT_STATUS_BADGE[status] ?? "bg-muted text-muted-foreground border-border";
}

export const EVENT_STATUS_OPTIONS = [
  { value: "BOOKED", label: "Booked" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function formatEventDate(dateString) {
  if (!dateString) return "—";
  const part = dateString.split(",")[0] || dateString.split(" ")[0];
  return part || dateString;
}

export function getEventCalendarColors(status) {
  switch (status) {
    case "Booked":
      return { backgroundColor: "#facc15", borderColor: "#ca8a04", textColor: "#422006" };
    case "Confirmed":
      return { backgroundColor: "#0ea5e9", borderColor: "#0284c7", textColor: "#ffffff" };
    case "Resolved":
      return { backgroundColor: "#22c55e", borderColor: "#16a34a", textColor: "#ffffff" };
    case "Cancelled":
      return { backgroundColor: "#ef4444", borderColor: "#dc2626", textColor: "#ffffff" };
    default:
      return { backgroundColor: "#facc15", borderColor: "#ca8a04", textColor: "#422006" };
  }
}

export function mapEventsToCalendar(events = []) {
  return events
    .map((e) => {
      const start = new Date(e.dateISO || e.date);
      if (Number.isNaN(start.getTime())) return null;
      const colors = getEventCalendarColors(e.status);
      return {
        id: e.id,
        title: e.subject || e.title,
        start: start.toISOString(),
        ...colors,
        extendedProps: {
          customerName: e.customerName,
          status: e.status,
          phone: e.phone,
        },
      };
    })
    .filter(Boolean);
}

export function toDatetimeLocal(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
