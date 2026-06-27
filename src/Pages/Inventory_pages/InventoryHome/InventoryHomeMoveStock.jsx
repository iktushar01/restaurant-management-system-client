import React, { useState, useEffect } from "react";
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
    <div className="max-w-4xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/inventory" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Inventory
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-200 to-purple-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Move Stock</h2>
          <p className="text-gray-700 mt-1">Transfer inventory items between locations</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none"
                {...register("itemId", { required: "Item is required" })}>
                <option value="">--Select Item--</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              {errors.itemId && <p className="mt-1 text-sm text-red-600">{errors.itemId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Location</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none" disabled={!itemId}
                {...register("fromLocationId", { required: "From location is required" })}>
                <option value="">--Select--</option>
                {stockRows.map((row) => (
                  <option key={row.locationId} value={row.locationId}>{row.location} ({row.stockFormatted})</option>
                ))}
              </select>
              {errors.fromLocationId && <p className="mt-1 text-sm text-red-600">{errors.fromLocationId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Stock</label>
              <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50">{availableStock.toFixed(2)} {selectedUnit}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity ({selectedUnit})</label>
              <input type="number" step="0.01" min="0.01" max={availableStock || undefined}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 0.01, message: "Must be greater than 0" },
                  max: { value: availableStock || 0, message: "Exceeds available stock" },
                })} />
              {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Location</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none"
                {...register("toLocationId", { required: "To location is required" })}>
                <option value="">--Select--</option>
                {stockLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              {errors.toLocationId && <p className="mt-1 text-sm text-red-600">{errors.toLocationId.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <textarea className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none" rows={3} {...register("note")} />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/inventory" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-purple-200 to-purple-400 text-gray-900 font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Moving..." : "Move Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeMoveStock;
