import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "@/services/authService";
import { canAccessRoute } from "@/constants/rolePermissions";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await authService.getMe();
      setUser(response.data);
      return response.data;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const login = useCallback(async (email, password) => {
    const response = await authService.login(email, password);
    const nextUser = response.data?.user ?? response.data;
    setUser(nextUser);
    return response;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Clear local auth state even if the request fails
    } finally {
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
