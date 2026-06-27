import React, { useState, useEffect } from "react";
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
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
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
    const row = stockRows.find((r) => r.locationId === locationId);
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
        <div className="p-6 bg-gradient-to-r from-red-200 to-red-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Stock Out</h2>
          <p className="text-gray-700 mt-1">Record items being taken out of inventory</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input type="text" readOnly value={itemName} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Location</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                {...register("locationId", { required: "Location is required" })}>
                <option value="">--Select--</option>
                {stockRows.filter((r) => r.stock > 0).map((row) => (
                  <option key={row.locationId} value={row.locationId}>
                    {row.location} ({row.stockFormatted})
                  </option>
                ))}
              </select>
              {errors.locationId && <p className="mt-1 text-sm text-red-600">{errors.locationId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Stock</label>
              <input type="text" readOnly value={`${availableStock.toFixed(2)} ${unit}`} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Out Amount ({unit})</label>
              <input type="number" step="0.01" min="0.01" max={availableStock || undefined}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none"
                {...register("quantity", {
                  required: "Amount is required",
                  min: { value: 0.01, message: "Must be greater than 0" },
                  max: { value: availableStock || 0, message: "Exceeds available stock" },
                })} />
              {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <textarea className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none" rows={3} {...register("note")} />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/inventory" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</Link>
            <button type="submit" disabled={submitting || !locationId} className="px-6 py-2.5 bg-gradient-to-r from-red-200 to-red-400 text-gray-900 font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Stock Out"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeStockOut;
