export const ROLES = {
  STAFF: "STAFF",
  WAITER: "WAITER",
  MANAGER: "MANAGER",
  CASHIER: "CASHIER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
};

const MANAGEMENT_ROLES = [ROLES.MANAGER, ROLES.ADMIN, ROLES.SUPER_ADMIN];
const FINANCE_ROLES = [ROLES.CASHIER, ...MANAGEMENT_ROLES];
const EVENT_ROLES = [ROLES.WAITER, ...MANAGEMENT_ROLES];
const INVENTORY_ROLES = [ROLES.STAFF, ...MANAGEMENT_ROLES];
const SETTINGS_ROLES = [ROLES.ADMIN, ROLES.SUPER_ADMIN];
const INVENTORY_SETTINGS_ROLES = MANAGEMENT_ROLES;

const normalizePath = (pathname) => pathname.toLowerCase().replace(/\/+$/, "") || "/";

const hasRole = (role, allowedRoles) => allowedRoles.includes(role);

export function canAccessRoute(role, pathname) {
  if (!role) return false;

  const path = normalizePath(pathname);

  if (path === "/login") return true;

  if (path === "/unauthorized") return Boolean(role);

  if (path.startsWith("/restaurantdashboard")) {
    return true;
  }

  if (path.startsWith("/restaurantorder")) {
    return true;
  }

  if (path.startsWith("/event") || path.startsWith("/events")) {
    return hasRole(role, EVENT_ROLES);
  }

  if (path.startsWith("/workperiod/inventory")) {
    return hasRole(role, INVENTORY_SETTINGS_ROLES);
  }

  if (path.startsWith("/workperiod")) {
    return hasRole(role, SETTINGS_ROLES);
  }

  if (path.startsWith("/inventory")) {
    return hasRole(role, INVENTORY_ROLES);
  }

  if (path.startsWith("/hr")) {
    return hasRole(role, MANAGEMENT_ROLES);
  }

  if (path.startsWith("/income")) {
    return hasRole(role, FINANCE_ROLES);
  }

  if (path.startsWith("/expense")) {
    return hasRole(role, FINANCE_ROLES);
  }

  if (path.startsWith("/bank")) {
    return hasRole(role, MANAGEMENT_ROLES);
  }

  if (path.startsWith("/due")) {
    return hasRole(role, FINANCE_ROLES);
  }

  if (path.startsWith("/report")) {
    if (role === ROLES.CASHIER) {
      return path.startsWith("/report/daily");
    }
    return hasRole(role, FINANCE_ROLES);
  }

  return false;
}

export function getDefaultRouteForRole() {
  return "/RestaurantDashboard/Index";
}

export function filterMenuByRole(menuItems, role) {
  if (!role) return [];

  return menuItems
    .map((item) => {
      if (item.subMenu) {
        const filteredSubMenu = item.subMenu.filter((subItem) =>
          canAccessRoute(role, subItem.path),
        );

        if (filteredSubMenu.length === 0) return null;

        return { ...item, subMenu: filteredSubMenu };
      }

      if (!canAccessRoute(role, item.path)) return null;

      return item;
    })
    .filter(Boolean);
}

export function filterWorkPeriodMenuByRole(menuItems, role) {
  if (!role) return [];

  return menuItems
    .map((item) => {
      if (item.subRoutes) {
        const filteredSubRoutes = item.subRoutes.filter((subItem) =>
          canAccessRoute(role, subItem.path),
        );

        if (filteredSubRoutes.length === 0) return null;

        return { ...item, subRoutes: filteredSubRoutes };
      }

      if (!canAccessRoute(role, item.path)) return null;

      return item;
    })
    .filter(Boolean);
}

export function formatRoleLabel(role) {
  return role
    ?.split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}
