import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LoadingState({ message = "Loading...", className }) {
  return (
    <div className={cn("text-center py-12 text-muted-foreground", className)}>
      {message}
    </div>
  );
}

export function EmptyState({ title, description, children, className }) {
  return (
    <Card className={cn("border-dashed mt-8 text-center", className)}>
      <CardContent className="p-8 md:p-12 space-y-4">
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

export default LoadingState;
