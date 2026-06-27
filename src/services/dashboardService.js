import apiClient from "./apiClient";

export const dashboardService = {
  getCurrentOrders: () => apiClient("/api/v1/dashboard/current-orders"),
  getStats: () => apiClient("/api/v1/dashboard/stats"),
  getSeatLayout: () => apiClient("/api/v1/dashboard/seat-layout"),
};
