import apiClient from "./apiClient";

const buildFoodFormData = (data) => {
  if (!data?.imageFile) {
    return data;
  }

  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "imageFile") {
      formData.append("image", value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return formData;
};

export const foodService = {
  getAll: (params) => apiClient("/api/v1/foods", { params }),

  getAllSimple: () => apiClient("/api/v1/foods/all"),

  getById: (id) => apiClient(`/api/v1/foods/${id}`),

  create: (data) =>
    apiClient("/api/v1/foods", {
      method: "POST",
      body: buildFoodFormData(data),
    }),

  update: (id, data) =>
    apiClient(`/api/v1/foods/${id}`, {
      method: "PATCH",
      body: buildFoodFormData(data),
    }),

  delete: (id) =>
    apiClient(`/api/v1/foods/${id}`, {
      method: "DELETE",
    }),
};
