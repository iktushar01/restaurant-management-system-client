import apiClient from "./apiClient";

const BASE = "/api/v1/bank";

export const bankService = {
  banks: {
    getAll: (params) => apiClient(`${BASE}/banks`, { params }),
    getById: (id) => apiClient(`${BASE}/banks/${id}`),
    create: (data) => apiClient(`${BASE}/banks`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/banks/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/banks/${id}`, { method: "DELETE" }),
  },
  branches: {
    getAll: (params) => apiClient(`${BASE}/branches`, { params }),
    getById: (id) => apiClient(`${BASE}/branches/${id}`),
    create: (data) => apiClient(`${BASE}/branches`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/branches/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/branches/${id}`, { method: "DELETE" }),
  },
  accounts: {
    getAll: (params) => apiClient(`${BASE}/accounts`, { params }),
    getById: (id) => apiClient(`${BASE}/accounts/${id}`),
    create: (data) => apiClient(`${BASE}/accounts`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/accounts/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/accounts/${id}`, { method: "DELETE" }),
  },
  transactions: {
    getAll: (params) => apiClient(`${BASE}/transactions`, { params }),
    getById: (id) => apiClient(`${BASE}/transactions/${id}`),
    create: (data) => apiClient(`${BASE}/transactions`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/transactions/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/transactions/${id}`, { method: "DELETE" }),
  },
  statements: {
    get: (params) => apiClient(`${BASE}/statements`, { params }),
  },
};
