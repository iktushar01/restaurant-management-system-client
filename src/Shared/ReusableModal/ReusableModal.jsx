import React from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const ReusableModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      classNames={{
        modal: `rounded-xl p-0 ${sizeClasses[size]}`,
        overlay: "backdrop-blur-sm",
      }}
      closeIcon={
        <button className="hover:bg-gray-100 rounded-full p-1 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      }
    >
      <div className="bg-white rounded-xl overflow-hidden">
        {/* Header */}
        {title && (
          <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            {subtitle && (
              <p className="text-gray-700 mt-1 text-sm">{subtitle}</p>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && <div className="p-6 border-t border-gray-200">{footer}</div>}
      </div>
    </Modal>
  );
};

export default ReusableModal;

