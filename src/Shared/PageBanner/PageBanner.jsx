import React from "react";

const PageBanner = ({
  title,
  subtitle,
  bgColor = "from-gray-50 to-gray-100",
  children,
}) => {
  return (
    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gradient-to-r ${bgColor} p-4 sm:p-6 rounded-xl`}>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

export default PageBanner;

