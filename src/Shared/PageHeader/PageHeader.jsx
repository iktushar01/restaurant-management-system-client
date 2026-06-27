import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PageHeader = ({ title, subtitle, children, className }) => {
  return (
    <Card className={cn("border-none shadow-sm bg-muted/40", className)}>
      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default PageHeader;
