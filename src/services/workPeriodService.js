import apiClient from "./apiClient";

export const workPeriodService = {
  getAll: (params) => apiClient("/api/v1/work-periods", { params }),
  getActive: () => apiClient("/api/v1/work-periods/active"),
  getById: (id) => apiClient(`/api/v1/work-periods/${id}`),
  open: (openingCash = 0) =>
    apiClient("/api/v1/work-periods/open", { method: "POST", body: { openingCash } }),
  close: (id, closingCash) =>
    apiClient(`/api/v1/work-periods/${id}/close`, { method: "PATCH", body: { closingCash } }),
};
