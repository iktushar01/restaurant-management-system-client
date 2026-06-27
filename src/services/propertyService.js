import apiClient from "./apiClient";

export const propertyService = {
  get: () => apiClient("/api/v1/property"),
  update: (data) => apiClient("/api/v1/property", { method: "PATCH", body: data }),
};
