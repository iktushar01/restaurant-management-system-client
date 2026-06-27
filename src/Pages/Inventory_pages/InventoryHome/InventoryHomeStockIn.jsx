import React, { useState, useEffect } from "react";
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
  const { register, handleSubmit, formState: { errors } } = useForm();

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
        <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Stock In</h2>
          <p className="text-gray-700 mt-1">Fill in the details below to record incoming stock</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                {...register("itemId", { required: "Item is required" })}>
                <option value="">--Select Item--</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>{item.name} ({item.category})</option>
                ))}
              </select>
              {errors.itemId && <p className="mt-1 text-sm text-red-600">{errors.itemId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Location</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                {...register("locationId", { required: "Stock location is required" })}>
                <option value="">--Select Location--</option>
                {stockLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              {errors.locationId && <p className="mt-1 text-sm text-red-600">{errors.locationId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input type="number" step="0.01" min="0.01" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none"
                {...register("quantity", { required: "Quantity is required", min: { value: 0.01, message: "Must be greater than 0" } })} />
              {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <textarea className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none" rows={3} placeholder="Optional note" {...register("note")} />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/inventory" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-blue-200 to-blue-400 text-gray-900 font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Record Stock In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeStockIn;
