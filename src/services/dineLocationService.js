import apiClient from "./apiClient";

export const dineLocationService = {
  getAll: (params) => apiClient("/api/v1/dine-locations", { params }),
  getAllSimple: () => apiClient("/api/v1/dine-locations/all"),
  getById: (id) => apiClient(`/api/v1/dine-locations/${id}`),
  create: (data) => apiClient("/api/v1/dine-locations", { method: "POST", body: data }),
  update: (id, data) => apiClient(`/api/v1/dine-locations/${id}`, { method: "PATCH", body: data }),
  delete: (id) => apiClient(`/api/v1/dine-locations/${id}`, { method: "DELETE" }),
};
