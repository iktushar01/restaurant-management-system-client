import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "@/services/authService";
import { canAccessRoute } from "@/constants/rolePermissions";
import { tokenStorage } from "@/utils/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    if (!tokenStorage.getAccessToken()) {
      setUser(null);
      return null;
    }

    try {
      const response = await authService.getMe();
      setUser(response.data);
      return response.data;
    } catch {
      tokenStorage.clear();
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const login = useCallback(async (email, password) => {
    const response = await authService.login(email, password);
    const { user: loggedInUser, accessToken, refreshToken } = response.data ?? {};

    if (accessToken) {
      tokenStorage.setTokens(accessToken, refreshToken);
    }

    const nextUser = loggedInUser ?? response.data;
    setUser(nextUser);
    return response;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Clear local auth state even if the request fails
    } finally {
      tokenStorage.clear();
      setUser(null);
    }
  }, []);

  const role = user?.role ?? null;

  const value = useMemo(
    () => ({
      user,
      role,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      refreshUser,
      hasRole: (...roles) => roles.includes(role),
      canAccess: (path) => canAccessRoute(role, path),
    }),
    [user, role, loading, login, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
