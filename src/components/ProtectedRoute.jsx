import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

export default function ProtectedRoute() {
  const { isAuthenticated, loading, canAccess } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2Icon className="size-8 animate-spin text-primary" />
      </div>
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
