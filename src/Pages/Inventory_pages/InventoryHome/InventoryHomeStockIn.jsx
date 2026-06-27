import React, { useState, useEffect } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../../services/inventoryService";

const InventoryHomeStockIn = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [stockLocations, setStockLocations] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  useEffect(() => {
    Promise.all([
      inventoryService.items.getAllSimple(),
      inventoryService.stockLocations.getAll({ limit: 100 }),
    ]).then(([itemRes, locRes]) => {
      setItems(itemRes.data || []);
      setStockLocations(locRes.data || []);
    }).catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.stock.stockIn({
        itemId: data.itemId,
        locationId: data.locationId,
        quantity: Number(data.quantity),
        note: data.note || undefined,
      });
      navigate("/inventory");
    } catch (err) {
      setSubmitError(err.message || "Failed to record stock in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/inventory" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Inventory
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Stock In</h2>
          <p className="text-foreground mt-1">Fill in the details below to record incoming stock</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Item</label>
              <FormSelect
                name="itemId"
                control={control}
                rules={{ required: "Item is required" }}
                errors={errors}
                placeholder="--Select Item--"
                options={[
                ]}
              />
              {errors.itemId && <p className="mt-1 text-sm text-destructive">{errors.itemId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Stock Location</label>
              <FormSelect
                name="locationId"
                control={control}
                rules={{ required: "Stock location is required" }}
                errors={errors}
                placeholder="--Select Location--"
                options={stockLocations.map((loc) => ({ value: String(loc.id), label: String(loc.name) }))}
              />
              {errors.locationId && <p className="mt-1 text-sm text-destructive">{errors.locationId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Quantity</label>
              <input type="number" step="0.01" min="0.01" className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none"
                {...register("quantity", { required: "Quantity is required", min: { value: 0.01, message: "Must be greater than 0" } })} />
              {errors.quantity && <p className="mt-1 text-sm text-destructive">{errors.quantity.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Note</label>
              <textarea className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none" rows={3} placeholder="Optional note" {...register("note")} />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/inventory" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-blue-200 to-blue-400 text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Record Stock In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeStockIn;
