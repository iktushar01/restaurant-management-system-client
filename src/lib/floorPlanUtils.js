import { getOrderStatusTableClasses } from "./orderStatus";

export const GRID_SIZE = 10;
export const DEFAULT_TABLE_SIZE = 72;

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
      return "bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20";
    case "Occupied":
      return "bg-red-500 text-white border-red-600 shadow-red-500/20";
    case "Reserved":
      return "bg-amber-400 text-black border-amber-500 shadow-amber-400/20";
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
    return "bg-blue-500/10 border-blue-500/40 text-blue-100";
  }
  if (normalized.includes("private")) {
    return "bg-purple-500/10 border-purple-500/40 text-purple-100";
  }
  if (normalized.includes("outdoor")) {
    return "bg-emerald-500/10 border-emerald-500/40 text-emerald-100";
  }
  return "bg-primary/10 border-primary/40 text-foreground";
}

export function getLocationTypeLabel(type) {
  if (!type) return "Indoor";
  return type;
}
