import React from "react";
import { cn } from "@/lib/utils";

const PageLayout = ({ children, className }) => {
  return (
    <div className={cn("space-y-6 w-full", className)}>{children}</div>
  );
};

export default PageLayout;
