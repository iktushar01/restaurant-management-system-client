import React from "react";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const variantClasses = {
  info: "border-primary/30 bg-primary/5 text-foreground",
  success: "border-success/30 bg-success/10 text-foreground",
  warning: "border-primary/40 bg-primary/10 text-foreground",
  danger: "border-destructive/30 bg-destructive/10 text-destructive",
};

const InfoCard = ({
  title,
  value,
  icon: Icon = InfoIcon,
  variant = "info",
  className = "",
}) => {
  return (
    <Alert className={cn(variantClasses[variant], className)}>
      <Icon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="text-lg font-bold text-foreground">
        {value}
      </AlertDescription>
    </Alert>
  );
};

export default InfoCard;
