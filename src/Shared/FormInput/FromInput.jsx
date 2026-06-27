import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FormInput = ({
  label,
  placeholder,
  type = "text",
  name,
  register,
  rules,
  errors,
}) => {
  const hasError = Boolean(errors?.[name]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <Label htmlFor={name}>{label}</Label>}

      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={hasError}
        className={cn(hasError && "border-destructive")}
        {...(register ? register(name, rules) : {})}
      />

      {hasError && (
        <span className="text-destructive text-xs">{errors[name].message}</span>
      )}
    </div>
  );
};

export default FormInput;
