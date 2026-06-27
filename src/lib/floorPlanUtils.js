import { getOrderStatusTableClasses } from "./orderStatus";

export const GRID_SIZE = 10;
export const DEFAULT_TABLE_SIZE = 72;

export const FLOOR_PLAN_CANVAS_CLASS =
  "overflow-hidden rounded-xl border border-border bg-muted/40 shadow-inner dark:bg-muted/20";

export function snapToGrid(value, gridSize = GRID_SIZE) {
  return Math.round(value / gridSize) * gridSize;
}

export function clampPosition(x, y, width, height, canvasWidth, canvasHeight) {
  return {
    x: Math.max(0, Math.min(snapToGrid(x), canvasWidth - width)),
    y: Math.max(0, Math.min(snapToGrid(y), canvasHeight - height)),
  };
}

export function findZoneAtPoint(x, y, width, height, zones) {
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  return zones.find(
    (zone) =>
      centerX >= zone.positionX &&
      centerX <= zone.positionX + zone.width &&
      centerY >= zone.positionY &&
      centerY <= zone.positionY + zone.height
  );
}

export function getTableStatusClasses(status) {
  switch (status) {
    case "Vacant":
      return "bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20 dark:bg-emerald-600 dark:border-emerald-500";
    case "Occupied":
      return "bg-red-500 text-white border-red-600 shadow-red-500/20 dark:bg-red-600 dark:border-red-500";
    case "Reserved":
      return "bg-amber-400 text-amber-950 border-amber-500 shadow-amber-400/20 dark:bg-amber-500 dark:text-amber-950";
    default:
      return "bg-muted text-foreground border-border";
  }
}

export function getTableVisualClasses(table, orderInfo) {
  const orderClasses = orderInfo?.statusRaw
    ? getOrderStatusTableClasses(orderInfo.statusRaw)
    : null;

  if (orderClasses) return orderClasses;

  if (table.status === "Reserved") {
    return getTableStatusClasses("Reserved");
  }
  if (table.status === "Occupied") {
    return getTableStatusClasses("Occupied");
  }
  return getTableStatusClasses("Vacant");
}

export function getLocationZoneClasses(type) {
  const normalized = (type || "").toLowerCase();

  if (normalized.includes("bar")) {
    return "bg-blue-500/10 border-blue-500/50 text-blue-800 dark:text-blue-200";
  }
  if (normalized.includes("private")) {
    return "bg-purple-500/10 border-purple-500/50 text-purple-800 dark:text-purple-200";
  }
  if (normalized.includes("outdoor")) {
    return "bg-emerald-500/10 border-emerald-500/50 text-emerald-800 dark:text-emerald-200";
  }
  return "bg-primary/10 border-primary/50 text-foreground";
}

export function getLocationTypeLabel(type) {
  if (!type) return "Indoor";
  return type;
}
