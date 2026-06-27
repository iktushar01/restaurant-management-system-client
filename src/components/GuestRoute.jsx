import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { getDefaultRouteForRole } from "@/constants/rolePermissions";

export default function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to={getDefaultRouteForRole()} replace />;
  }

  return children;
}
