import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { getDefaultRouteForRole } from "@/constants/rolePermissions";
import { ServerWakeUpLoading } from "@/components/ServerWakeUpLoading";

export default function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <ServerWakeUpLoading message="Starting DineFlow…" />;
  }

  if (isAuthenticated) {
    return <Navigate to={getDefaultRouteForRole()} replace />;
  }

  return children;
}
