import apiClient from "./apiClient";

export const currencyService = {
  getAll: (params) => apiClient("/api/v1/currencies", { params }),
  getAllSimple: () => apiClient("/api/v1/currencies/all"),
  getDefault: () => apiClient("/api/v1/currencies/default"),
  getById: (id) => apiClient(`/api/v1/currencies/${id}`),
  create: (data) => apiClient("/api/v1/currencies", { method: "POST", body: data }),
  update: (id, data) => apiClient(`/api/v1/currencies/${id}`, { method: "PATCH", body: data }),
  setDefault: (id) => apiClient(`/api/v1/currencies/${id}/set-default`, { method: "PATCH" }),
  delete: (id) => apiClient(`/api/v1/currencies/${id}`, { method: "DELETE" }),
};

export default currencyService;
