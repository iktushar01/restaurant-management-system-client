import apiClient from "./apiClient";

export const foodCategoryService = {
  getAll: (params) =>
    apiClient("/api/v1/food-categories", { params }),

  getAllSimple: () => apiClient("/api/v1/food-categories/all"),

  getById: (id) => apiClient(`/api/v1/food-categories/${id}`),

  create: (data) =>
    apiClient("/api/v1/food-categories", {
      method: "POST",
      body: data,
    }),

  update: (id, data) =>
    apiClient(`/api/v1/food-categories/${id}`, {
      method: "PATCH",
      body: data,
    }),

  delete: (id) =>
    apiClient(`/api/v1/food-categories/${id}`, {
      method: "DELETE",
    }),
};
