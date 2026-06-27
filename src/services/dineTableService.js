import apiClient from "./apiClient";

export const dineTableService = {
  getAll: (params) => apiClient("/api/v1/dine-tables", { params }),
  getAllSimple: () => apiClient("/api/v1/dine-tables/all"),
  getById: (id) => apiClient(`/api/v1/dine-tables/${id}`),
  create: (data) => apiClient("/api/v1/dine-tables", { method: "POST", body: data }),
  update: (id, data) => apiClient(`/api/v1/dine-tables/${id}`, { method: "PATCH", body: data }),
  updateStatus: (id, status) =>
    apiClient(`/api/v1/dine-tables/${id}/status`, { method: "PATCH", body: { status } }),
  delete: (id) => apiClient(`/api/v1/dine-tables/${id}`, { method: "DELETE" }),
};
