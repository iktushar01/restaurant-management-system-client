import apiClient from "./apiClient";

export const waiterService = {
  getAll: (params) => apiClient("/api/v1/waiters", { params }),
  getAllSimple: () => apiClient("/api/v1/waiters/all"),
  getById: (id) => apiClient(`/api/v1/waiters/${id}`),
  create: (data) => apiClient("/api/v1/waiters", { method: "POST", body: data }),
  update: (id, data) => apiClient(`/api/v1/waiters/${id}`, { method: "PATCH", body: data }),
  delete: (id) => apiClient(`/api/v1/waiters/${id}`, { method: "DELETE" }),
};
