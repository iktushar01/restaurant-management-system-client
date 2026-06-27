import React, { useState, useEffect } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../../services/inventoryService";

const InventoryHomeMoveStock = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [stockLocations, setStockLocations] = useState([]);
  const [stockRows, setStockRows] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [availableStock, setAvailableStock] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const itemId = watch("itemId");
  const fromLocationId = watch("fromLocationId");

  useEffect(() => {
    Promise.all([
      inventoryService.items.getAllSimple(),
      inventoryService.stockLocations.getAll({ limit: 100 }),
    ]).then(([itemRes, locRes]) => {
      setItems(itemRes.data || []);
      setStockLocations(locRes.data || []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!itemId) {
      setStockRows([]);
      setAvailableStock(0);
      return;
    }
    inventoryService.stock.list({ itemId }).then((res) => {
      const rows = (res.data || []).filter((r) => r.stock > 0);
      setStockRows(rows);
      if (rows.length > 0) setSelectedUnit(rows[0].unit);
    }).catch(() => setStockRows([]));
    setValue("fromLocationId", "");
    setAvailableStock(0);
  }, [itemId, setValue]);

  useEffect(() => {
    const row = stockRows.find((r) => r.locationId === fromLocationId);
    setAvailableStock(row ? row.stock : 0);
  }, [fromLocationId, stockRows]);

  const onSubmit = async (data) => {
    if (data.fromLocationId === data.toLocationId) {
      setSubmitError("From and To locations must be different");
      return;
    }
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.stock.move({
        itemId: data.itemId,
        fromLocationId: data.fromLocationId,
        toLocationId: data.toLocationId,
        quantity: Number(data.quantity),
        note: data.note || undefined,
      });
      navigate("/inventory");
    } catch (err) {
      setSubmitError(err.message || "Failed to move stock");
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
        <div className="p-6 bg-gradient-to-r bg-accent text-accent-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Move Stock</h2>
          <p className="text-foreground mt-1">Transfer inventory items between locations</p>
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
                options={items.map((item) => ({ value: String(item.id), label: String(item.name) }))}
              />
              {errors.itemId && <p className="mt-1 text-sm text-destructive">{errors.itemId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">From Location</label>
              <FormSelect
                name="fromLocationId"
                control={control}
                rules={{ required: "From location is required" }}
                errors={errors}
                placeholder="--Select--"
                options={[
                ]}
              />
              {errors.fromLocationId && <p className="mt-1 text-sm text-destructive">{errors.fromLocationId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Available Stock</label>
              <div className="w-full px-4 py-2.5 border border-border rounded-lg bg-muted/40">{availableStock.toFixed(2)} {selectedUnit}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Quantity ({selectedUnit})</label>
              <input type="number" step="0.01" min="0.01" max={availableStock || undefined}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 0.01, message: "Must be greater than 0" },
                  max: { value: availableStock || 0, message: "Exceeds available stock" },
                })} />
              {errors.quantity && <p className="mt-1 text-sm text-destructive">{errors.quantity.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">To Location</label>
              <FormSelect
                name="toLocationId"
                control={control}
                rules={{ required: "To location is required" }}
                errors={errors}
                placeholder="--Select--"
                options={stockLocations.map((loc) => ({ value: String(loc.id), label: String(loc.name) }))}
              />
              {errors.toLocationId && <p className="mt-1 text-sm text-destructive">{errors.toLocationId.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Note</label>
              <textarea className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none" rows={3} {...register("note")} />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/inventory" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-accent text-accent-foreground text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Moving..." : "Move Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeMoveStock;
