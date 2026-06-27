import React from "react";
import { Navigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { getDefaultRouteForRole } from "@/constants/rolePermissions";

export default function RootRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2Icon className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Navigate
      to={isAuthenticated ? getDefaultRouteForRole() : "/login"}
      replace
    />
  );
}
