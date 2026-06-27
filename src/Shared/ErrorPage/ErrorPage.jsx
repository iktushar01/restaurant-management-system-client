import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <AlertTriangleIcon />
          <AlertTitle>Page not found</AlertTitle>
          <AlertDescription>
            The page you are looking for does not exist or has been moved.
          </AlertDescription>
        </Alert>
        <Button className="w-full" onClick={() => navigate("/RestaurantDashboard/Index")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
