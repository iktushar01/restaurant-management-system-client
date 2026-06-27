import React from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function SelectField({
  value,
  onValueChange,
  options = [],
  placeholder = "Select...",
  className,
  disabled,
  children,
}) {
  const selectValue =
    value === undefined || value === null || value === ""
      ? undefined
      : String(value);

  return (
    <Select
      value={selectValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={String(opt.value)} value={String(opt.value)}>
            {opt.label ?? String(opt.value)}
          </SelectItem>
        ))}
        {children}
      </SelectContent>
    </Select>
  );
}

const FormSelect = ({
  label,
  name,
  control,
  rules,
  errors,
  options = [],
  placeholder = "Select...",
  className,
  disabled,
  children,
}) => {
  const hasError = Boolean(errors?.[name]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <SelectField
            value={field.value}
            onValueChange={field.onChange}
            options={options}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(hasError && "border-destructive", className)}
          >
            {children}
          </SelectField>
        )}
      />
      {hasError && (
        <span className="text-destructive text-xs">{errors[name].message}</span>
      )}
    </div>
  );
};

export default FormSelect;
