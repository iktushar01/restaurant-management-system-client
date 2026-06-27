import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const variantMap = {
  primary: "default",
  success: "success",
  danger: "destructive",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
};

const sizeMap = {
  sm: "sm",
  md: "default",
  lg: "lg",
};

const ReusableButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  type = "button",
}) => {
  const IconElement = Icon ? (
    <span className={iconPosition === "left" ? "mr-2" : "ml-2"}>
      <Icon />
    </span>
  ) : null;

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variantMap[variant] ?? "default"}
      size={sizeMap[size] ?? "default"}
      className={cn(
        variant === "success" &&
          "bg-success text-success-foreground hover:bg-success/90",
        className
      )}
    >
      {IconElement && iconPosition === "left" && IconElement}
      {children}
      {IconElement && iconPosition === "right" && IconElement}
    </Button>
  );
};

export default ReusableButton;
