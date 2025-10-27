import React from "react";

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
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 hover:from-yellow-300 hover:to-yellow-500 focus:ring-amber-300",
    success: "bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 focus:ring-green-300",
    danger: "bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 focus:ring-red-300",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300",
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const IconElement = Icon ? (
    <span className={iconPosition === "left" ? "mr-2" : "ml-2"}>
      <Icon />
    </span>
  ) : null;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {IconElement && iconPosition === "left" && IconElement}
      {children}
      {IconElement && iconPosition === "right" && IconElement}
    </button>
  );
};

export default ReusableButton;

