import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { toast } from "sonner";
import { currencyService } from "../../../services/currencyService";
import { useCurrency } from "@/context/CurrencyProvider";

const CurrencyCreate = () => {
  const navigate = useNavigate();
  const { refreshCurrency } = useCurrency();
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: { symbolPosition: "BEFORE", decimalPlaces: 2, isDefault: false },
  });

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await currencyService.create({
        name: data.name,
        code: data.code,
        symbol: data.symbol,
        symbolPosition: data.symbolPosition,
        decimalPlaces: Number(data.decimalPlaces),
        isDefault: Boolean(data.isDefault),
      });
      await refreshCurrency();
      toast.success("Currency created");
      navigate("/WorkPeriod/settings/currency");
    } catch (err) {
      setSubmitError(err.message || "Failed to create currency");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4 md:p-6">
      <Link to="/WorkPeriod/settings/currency" className="inline-flex items-center mb-6 text-foreground hover:text-primary">
        <FiArrowLeft className="mr-2" /> Back to Currencies
      </Link>

      <div className="bg-card rounded-xl border border-border overflow-hidden max-w-2xl">
        <div className="p-6 bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold">New Currency</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {submitError && <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}

          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input className="w-full px-4 py-2.5 border border-border rounded-lg" placeholder="US Dollar"
              {...register("name", { required: "Name is required" })} />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Code *</label>
              <input className="w-full px-4 py-2.5 border border-border rounded-lg uppercase" placeholder="USD"
                {...register("code", { required: "Code is required" })} />
              {errors.code && <p className="text-sm text-destructive mt-1">{errors.code.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Symbol *</label>
              <input className="w-full px-4 py-2.5 border border-border rounded-lg" placeholder="$"
                {...register("symbol", { required: "Symbol is required" })} />
              {errors.symbol && <p className="text-sm text-destructive mt-1">{errors.symbol.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormSelect
              label="Symbol position"
              name="symbolPosition"
              control={control}
              errors={errors}
              options={[
                { value: "BEFORE", label: "Before amount ($100)" },
                { value: "AFTER", label: "After amount (100 €)" },
              ]}
            />
            <div>
              <label className="block text-sm font-medium mb-1">Decimal places</label>
              <input type="number" min="0" max="4" className="w-full px-4 py-2.5 border border-border rounded-lg"
                {...register("decimalPlaces", { required: true, min: 0, max: 4 })} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("isDefault")} className="rounded border-border" />
            Set as default currency for the app
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <Link to="/WorkPeriod/settings/currency" className="px-5 py-2.5 border border-border rounded-lg">Cancel</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrencyCreate;
