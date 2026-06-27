import apiClient from "./apiClient";

export const floorPlanService = {
  getFloorPlan: () => apiClient("/api/v1/dine/floor-plan"),
  resetLayout: () =>
    apiClient("/api/v1/dine/floor-plan/reset", { method: "POST" }),
};

export default floorPlanService;
