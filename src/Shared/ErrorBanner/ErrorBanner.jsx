import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export function ErrorBanner({ message, className }) {
  if (!message) return null;

  return (
    <Alert variant="destructive" className={cn("mb-4", className)}>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export default ErrorBanner;
