import apiClient from "./apiClient";

export const foodService = {
  getAll: (params) => apiClient("/api/v1/foods", { params }),

  getAllSimple: () => apiClient("/api/v1/foods/all"),

  getById: (id) => apiClient(`/api/v1/foods/${id}`),

  create: (data) =>
    apiClient("/api/v1/foods", {
      method: "POST",
      body: data,
    }),

  update: (id, data) =>
    apiClient(`/api/v1/foods/${id}`, {
      method: "PATCH",
      body: data,
    }),

  delete: (id) =>
    apiClient(`/api/v1/foods/${id}`, {
      method: "DELETE",
    }),
};
