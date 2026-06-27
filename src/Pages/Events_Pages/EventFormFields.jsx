import React from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import FormInput from "@/Shared/FormInput/FromInput";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyProvider";

const EventFormFields = ({ register, control, errors, showStatus = false }) => {
  const { currency } = useCurrency();
  const symbol = currency?.symbol ?? "$";

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <FormInput
          label="Title"
          name="title"
          placeholder="e.g., Birthday Party"
          register={register}
          rules={{ required: "Title is required" }}
          errors={errors}
        />
      </div>

      <div className="md:col-span-2">
        <FormInput
          label="Customer Name"
          name="customerName"
          placeholder="e.g., John Smith"
          register={register}
          rules={{ required: "Customer name is required" }}
          errors={errors}
        />
      </div>

      <FormInput
        label="Phone"
        name="phone"
        type="tel"
        placeholder="e.g., 123-456-7890"
        register={register}
        rules={{
          required: "Phone number is required",
          pattern: {
            value: /^[0-9+\-\s()]+$/,
            message: "Please enter a valid phone number",
          },
        }}
        errors={errors}
      />

      <FormInput
        label="Date & Time"
        name="date"
        type="datetime-local"
        register={register}
        rules={{ required: "Date is required" }}
        errors={errors}
      />

      <FormInput
        label="Number of Guests"
        name="noOfPerson"
        type="number"
        placeholder="e.g., 50"
        register={register}
        rules={{
          required: "Number of guests is required",
          min: { value: 1, message: "Must be at least 1 guest" },
        }}
        errors={errors}
      />

      <div className="flex flex-col gap-1.5 w-full">
        <Label htmlFor="advanceAmount">Advance Amount</Label>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground text-sm pointer-events-none">
            {symbol}
          </span>
          <input
            id="advanceAmount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              errors.advanceAmount && "border-destructive"
            )}
            {...register("advanceAmount", {
              required: "Advance amount is required",
              min: { value: 0, message: "Amount cannot be negative" },
            })}
          />
        </div>
        {errors.advanceAmount && (
          <span className="text-destructive text-xs">{errors.advanceAmount.message}</span>
        )}
      </div>

      <FormInput
        label="Menu"
        name="menu"
        placeholder="e.g., Buffet style"
        register={register}
        errors={errors}
      />

      {showStatus && (
        <FormSelect
          label="Status"
          name="status"
          control={control}
          errors={errors}
          placeholder="Select status"
          options={[
            { value: "BOOKED", label: "Booked" },
            { value: "CONFIRMED", label: "Confirmed" },
            { value: "RESOLVED", label: "Resolved" },
            { value: "CANCELLED", label: "Cancelled" },
          ]}
        />
      )}

      <div className="md:col-span-2 flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Event description and special instructions..."
          className={cn(errors.description && "border-destructive")}
          {...register("description")}
        />
      </div>
    </div>
  );
};

export default EventFormFields;
