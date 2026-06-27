import apiClient from "./apiClient";

const BASE = "/api/v1/due";

export const dueService = {
  entries: {
    getAll: (params) => apiClient(`${BASE}/entries`, { params }),
    getById: (id) => apiClient(`${BASE}/entries/${id}`),
    create: (data) => apiClient(`${BASE}/entries`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/entries/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/entries/${id}`, { method: "DELETE" }),
  },
};
