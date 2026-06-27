import apiClient from "./apiClient";

const BASE = "/api/v1/inventory";

export const inventoryService = {
  categories: {
    getAll: (params) => apiClient(`${BASE}/categories`, { params }),
    getById: (id) => apiClient(`${BASE}/categories/${id}`),
    create: (data) => apiClient(`${BASE}/categories`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/categories/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/categories/${id}`, { method: "DELETE" }),
  },
  subCategories: {
    getAll: (params) => apiClient(`${BASE}/sub-categories`, { params }),
    getById: (id) => apiClient(`${BASE}/sub-categories/${id}`),
    create: (data) => apiClient(`${BASE}/sub-categories`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/sub-categories/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/sub-categories/${id}`, { method: "DELETE" }),
  },
  brands: {
    getAll: (params) => apiClient(`${BASE}/brands`, { params }),
    getById: (id) => apiClient(`${BASE}/brands/${id}`),
    create: (data) => apiClient(`${BASE}/brands`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/brands/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/brands/${id}`, { method: "DELETE" }),
  },
  units: {
    getAll: (params) => apiClient(`${BASE}/units`, { params }),
    getById: (id) => apiClient(`${BASE}/units/${id}`),
    create: (data) => apiClient(`${BASE}/units`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/units/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/units/${id}`, { method: "DELETE" }),
  },
  vendors: {
    getAll: (params) => apiClient(`${BASE}/vendors`, { params }),
    getById: (id) => apiClient(`${BASE}/vendors/${id}`),
    create: (data) => apiClient(`${BASE}/vendors`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/vendors/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/vendors/${id}`, { method: "DELETE" }),
  },
  stockLocations: {
    getAll: (params) => apiClient(`${BASE}/stock-locations`, { params }),
    getById: (id) => apiClient(`${BASE}/stock-locations/${id}`),
    create: (data) => apiClient(`${BASE}/stock-locations`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/stock-locations/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/stock-locations/${id}`, { method: "DELETE" }),
  },
  items: {
    getAll: (params) => apiClient(`${BASE}/items`, { params }),
    getById: (id) => apiClient(`${BASE}/items/${id}`),
    getAllSimple: () => apiClient(`${BASE}/items/all`),
    create: (data) => apiClient(`${BASE}/items`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/items/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/items/${id}`, { method: "DELETE" }),
  },
  stock: {
    list: (params) => apiClient(`${BASE}/stock`, { params }),
    stockIn: (data) => apiClient(`${BASE}/stock/in`, { method: "POST", body: data }),
    stockOut: (data) => apiClient(`${BASE}/stock/out`, { method: "POST", body: data }),
    move: (data) => apiClient(`${BASE}/stock/move`, { method: "POST", body: data }),
  },
  purchases: {
    getAll: (params) => apiClient(`${BASE}/purchases`, { params }),
    create: (data) => apiClient(`${BASE}/purchases`, { method: "POST", body: data }),
  },
  vendorPayments: {
    getAll: (params) => apiClient(`${BASE}/vendor-payments`, { params }),
    create: (data) => apiClient(`${BASE}/vendor-payments`, { method: "POST", body: data }),
  },
  vendorsDuePurchases: {
    getAll: () => apiClient(`${BASE}/vendors/due-purchases`),
  },
  events: {
    getAll: (params) => apiClient(`${BASE}/events`, { params }),
    getToday: () => apiClient(`${BASE}/events/today`),
    getById: (id) => apiClient(`${BASE}/events/${id}`),
    create: (data) => apiClient(`${BASE}/events`, { method: "POST", body: data }),
    update: (id, data) => apiClient(`${BASE}/events/${id}`, { method: "PATCH", body: data }),
    delete: (id) => apiClient(`${BASE}/events/${id}`, { method: "DELETE" }),
  },
};
