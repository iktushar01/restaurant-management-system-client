import React, { useState, useEffect } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../../services/inventoryService";

const InventoryHomeStockOut = () => {
  const { id: itemId } = useParams();
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [unit, setUnit] = useState("");
  const [stockRows, setStockRows] = useState([]);
  const [availableStock, setAvailableStock] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, control } = useForm();
  const locationId = watch("locationId");

  useEffect(() => {
    const load = async () => {
      try {
        const [itemRes, stockRes] = await Promise.all([
          inventoryService.items.getById(itemId),
          inventoryService.stock.list({ itemId }),
        ]);
        setItemName(itemRes.data.name);
        const rows = stockRes.data || [];
        setStockRows(rows);
        if (rows.length > 0) setUnit(rows[0].unit);
      } catch (err) {
        setSubmitError(err.message || "Failed to load item");
      }
    };
    load();
  }, [itemId]);

  useEffect(() => {
    const row = stockRows.find((r) => String(r.locationId) === String(locationId));
    setAvailableStock(row ? row.stock : 0);
  }, [locationId, stockRows]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.stock.stockOut({
        itemId,
        locationId: data.locationId,
        quantity: Number(data.quantity),
        note: data.note || undefined,
      });
      navigate("/inventory");
    } catch (err) {
      setSubmitError(err.message || "Failed to record stock out");
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
        <div className="p-6 bg-gradient-to-r bg-destructive/15 text-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Stock Out</h2>
          <p className="text-foreground mt-1">Record items being taken out of inventory</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Item Name</label>
              <input type="text" readOnly value={itemName} className="w-full px-4 py-2.5 border border-border rounded-lg bg-muted/40" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Select Location</label>
              <FormSelect
                name="locationId"
                control={control}
                rules={{ required: "Location is required" }}
                errors={errors}
                placeholder="--Select--"
                options={stockRows
                  .filter((row) => row.stock > 0)
                  .map((row) => ({
                    value: String(row.locationId),
                    label: `${row.location} (${row.stockFormatted})`,
                  }))}
                disabled={stockRows.length === 0}
              />
              {errors.locationId && <p className="mt-1 text-sm text-destructive">{errors.locationId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Available Stock</label>
              <input type="text" readOnly value={`${availableStock.toFixed(2)} ${unit}`} className="w-full px-4 py-2.5 border border-border rounded-lg bg-muted/40" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Stock Out Amount ({unit})</label>
              <input type="number" step="0.01" min="0.01" max={availableStock || undefined}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none"
                {...register("quantity", {
                  required: "Amount is required",
                  min: { value: 0.01, message: "Must be greater than 0" },
                  max: { value: availableStock || 0, message: "Exceeds available stock" },
                })} />
              {errors.quantity && <p className="mt-1 text-sm text-destructive">{errors.quantity.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Note</label>
              <textarea className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring outline-none" rows={3} {...register("note")} />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/inventory" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
            <button type="submit" disabled={submitting || !locationId} className="px-6 py-2.5 bg-gradient-to-r bg-destructive/15 text-foreground text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Stock Out"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeStockOut;
