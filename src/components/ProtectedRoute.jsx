import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { ServerWakeUpLoading } from "@/components/ServerWakeUpLoading";

export default function ProtectedRoute() {
  const { isAuthenticated, loading, canAccess } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <ServerWakeUpLoading message="Checking your session…" />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!canAccess(location.pathname)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
