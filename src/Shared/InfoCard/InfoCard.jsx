import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const InfoCard = ({
  title,
  value,
  icon: Icon = FaInfoCircle, // eslint-disable-line no-unused-vars
  variant = "info",
  className = "",
}) => {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    danger: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div className={`flex items-center p-4 rounded-lg border ${variants[variant]} ${className}`}>
      <Icon className="mr-3 text-2xl" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;

