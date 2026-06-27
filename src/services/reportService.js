import apiClient from "./apiClient";

const BASE = "/api/v1/reports";

export const reportService = {
  getCurrent: () => apiClient(`${BASE}/current`),
  getDaily: (params) => apiClient(`${BASE}/daily`, { params }),
};
