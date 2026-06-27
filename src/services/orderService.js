import apiClient from "./apiClient";

export const orderService = {
  getAll: (params) => apiClient("/api/v1/orders", { params }),
  getCurrent: () => apiClient("/api/v1/orders/current"),
  getById: (id) => apiClient(`/api/v1/orders/${id}`),
  create: (data) => apiClient("/api/v1/orders", { method: "POST", body: data }),
  updateStatus: (id, status) =>
    apiClient(`/api/v1/orders/${id}/status`, { method: "PATCH", body: { status } }),
  cancel: (id) => apiClient(`/api/v1/orders/${id}/cancel`, { method: "PATCH" }),
};
