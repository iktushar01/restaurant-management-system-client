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

export function toDatetimeLocal(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
