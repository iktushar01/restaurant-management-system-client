export const ORDER_STATUS = {
  PENDING: "PENDING",
  PREPARING: "PREPARING",
  READY: "READY",
  SERVED: "SERVED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const ACTIVE_ORDER_STATUSES = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.READY,
  ORDER_STATUS.SERVED,
];

export const ORDER_STATUS_FLOW = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.PREPARING,
  ORDER_STATUS.READY,
  ORDER_STATUS.SERVED,
  ORDER_STATUS.COMPLETED,
];

export const ORDER_STATUS_OPTIONS = [
  { value: ORDER_STATUS.PENDING, label: "Pending" },
  { value: ORDER_STATUS.PREPARING, label: "Preparing" },
  { value: ORDER_STATUS.READY, label: "Ready" },
  { value: ORDER_STATUS.SERVED, label: "Served" },
  { value: ORDER_STATUS.COMPLETED, label: "Completed" },
];

const STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.PREPARING]: "Preparing",
  [ORDER_STATUS.READY]: "Ready",
  [ORDER_STATUS.SERVED]: "Served",
  [ORDER_STATUS.COMPLETED]: "Completed",
  [ORDER_STATUS.CANCELLED]: "Cancelled",
};

const STATUS_SHORT_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.PREPARING]: "Prep",
  [ORDER_STATUS.READY]: "Ready",
  [ORDER_STATUS.SERVED]: "Served",
  [ORDER_STATUS.COMPLETED]: "Done",
  [ORDER_STATUS.CANCELLED]: "Cancel",
};

export function getOrderStatusLabel(statusRaw) {
  return STATUS_LABELS[statusRaw] ?? statusRaw ?? "Unknown";
}

export function getOrderStatusShortLabel(statusRaw) {
  return STATUS_SHORT_LABELS[statusRaw] ?? statusRaw ?? "?";
}

export function getOrderStatusBadgeClass(statusRaw) {
  switch (statusRaw) {
    case ORDER_STATUS.PENDING:
      return "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";
    case ORDER_STATUS.PREPARING:
      return "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30";
    case ORDER_STATUS.READY:
      return "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30";
    case ORDER_STATUS.SERVED:
      return "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30";
    case ORDER_STATUS.COMPLETED:
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
    case ORDER_STATUS.CANCELLED:
      return "bg-destructive/15 text-destructive border-destructive/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export function getOrderStatusTableClasses(statusRaw) {
  switch (statusRaw) {
    case ORDER_STATUS.PENDING:
      return "bg-amber-400 text-black border-amber-500 shadow-amber-400/30 ring-2 ring-amber-300/50";
    case ORDER_STATUS.PREPARING:
      return "bg-orange-500 text-white border-orange-600 shadow-orange-500/30 ring-2 ring-orange-400/50";
    case ORDER_STATUS.READY:
      return "bg-sky-500 text-white border-sky-600 shadow-sky-500/30 ring-2 ring-sky-400/50";
    case ORDER_STATUS.SERVED:
      return "bg-violet-500 text-white border-violet-600 shadow-violet-500/30 ring-2 ring-violet-400/50";
    default:
      return null;
  }
}

export function getNextOrderStatus(statusRaw) {
  const index = ORDER_STATUS_FLOW.indexOf(statusRaw);
  if (index === -1 || index >= ORDER_STATUS_FLOW.length - 1) return null;
  return ORDER_STATUS_FLOW[index + 1];
}

export function buildTableOrderMap(orders = []) {
  const map = {};
  for (const order of orders) {
    if (!order.tableId) continue;
    if (!ACTIVE_ORDER_STATUSES.includes(order.statusRaw)) continue;
    if (!map[order.tableId]) {
      map[order.tableId] = order;
    }
  }
  return map;
}

export const SEATING_LEGEND = [
  { key: "vacant", label: "Vacant", className: "bg-emerald-500 border-emerald-600" },
  { key: "reserved", label: "Reserved", className: "bg-amber-400 border-amber-500" },
  { key: "pending", label: "Pending order", className: "bg-amber-400 border-amber-500" },
  { key: "preparing", label: "Preparing", className: "bg-orange-500 border-orange-600" },
  { key: "ready", label: "Ready to serve", className: "bg-sky-500 border-sky-600" },
  { key: "served", label: "Served", className: "bg-violet-500 border-violet-600" },
];
