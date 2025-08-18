import React from "react";

const FormInput = ({
  label,
  placeholder,
  type = "text",
  name,
  register,
  rules,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...(register ? register(name, rules) : {})}
        className={`border rounded-lg px-3 py-2 outline-none 
          focus:ring-2 focus:ring-blue-500
          ${errors?.[name] ? "border-red-500" : "border-gray-300"}`}
      />

      {errors?.[name] && (
        <span className="text-red-500 text-xs">{errors[name].message}</span>
      )}
    </div>
  );
};

export default FormInput;
