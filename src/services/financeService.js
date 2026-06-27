import apiClient from "./apiClient";

const BASE = "/api/v1/finance";

export const financeService = {
  incomeHeads: {
    getAll: (params) => apiClient(`${BASE}/income-heads`, { params }),
    getById: (id) => apiClient(`${BASE}/income-heads/${id}`),
    create: (data) => apiClient(`${BASE}/income-heads`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/income-heads/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/income-heads/${id}`, { method: "DELETE" }),
  },
  incomeEntries: {
    getAll: (params) => apiClient(`${BASE}/income-entries`, { params }),
    getById: (id) => apiClient(`${BASE}/income-entries/${id}`),
    create: (data) => apiClient(`${BASE}/income-entries`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/income-entries/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/income-entries/${id}`, { method: "DELETE" }),
  },
  expenseHeads: {
    getAll: (params) => apiClient(`${BASE}/expense-heads`, { params }),
    getById: (id) => apiClient(`${BASE}/expense-heads/${id}`),
    create: (data) => apiClient(`${BASE}/expense-heads`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/expense-heads/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/expense-heads/${id}`, { method: "DELETE" }),
  },
  expenseEntries: {
    getAll: (params) => apiClient(`${BASE}/expense-entries`, { params }),
    getById: (id) => apiClient(`${BASE}/expense-entries/${id}`),
    create: (data) => apiClient(`${BASE}/expense-entries`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/expense-entries/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/expense-entries/${id}`, { method: "DELETE" }),
  },
};
