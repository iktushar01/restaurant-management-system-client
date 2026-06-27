import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import { formatRoleLabel, getDefaultRouteForRole } from "@/constants/rolePermissions";

export default function UnauthorizedPage() {
  const { role } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlertIcon className="size-6 text-destructive" />
          </div>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            Your role{role ? ` (${formatRoleLabel(role)})` : ""} does not have permission to view
            this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button render={<Link to={getDefaultRouteForRole(role)} />}>Go to Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
}
