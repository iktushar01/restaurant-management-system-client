import apiClient from "./apiClient";

export const authService = {
  login: (email, password) =>
    apiClient("/api/v1/auth/login", {
      method: "POST",
      body: { email, password },
    }),

  logout: () =>
    apiClient("/api/v1/auth/logout", {
      method: "POST",
    }),

  getMe: () => apiClient("/api/v1/auth/me"),
};
