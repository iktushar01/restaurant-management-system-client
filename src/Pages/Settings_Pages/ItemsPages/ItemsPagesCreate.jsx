import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { inventoryService } from "../../../services/inventoryService";

const ItemsPagesCreate = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const categoryId = watch("categoryId");

  useEffect(() => {
    Promise.all([
      inventoryService.categories.getAll({ limit: 100 }),
      inventoryService.brands.getAll({ limit: 100 }),
      inventoryService.units.getAll({ limit: 100 }),
    ]).then(([catRes, brandRes, unitRes]) => {
      setCategories(catRes.data || []);
      setBrands(brandRes.data || []);
      setUnits(unitRes.data || []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!categoryId) {
      setSubCategories([]);
      return;
    }
    inventoryService.subCategories.getAll({ categoryId, limit: 100 })
      .then((res) => setSubCategories(res.data || []))
      .catch(() => setSubCategories([]));
  }, [categoryId]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await inventoryService.items.create({
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId,
        brandId: data.brandId || undefined,
        unitId: data.unitId,
        name: data.itemName,
        reorderLevel: Number(data.reorderLevel) || 0,
      });
      navigate("/WorkPeriod/inventory/items");
    } catch (err) {
      setSubmitError(err.message || "Failed to create item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/WorkPeriod/inventory/items" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Items
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add Item</h2>
          <p className="text-gray-700 mt-1">Fill in the details below to add a new item</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
                {...register("categoryId", { required: "Category is required" })}>
                <option value="">Select Category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
                {...register("subCategoryId", { required: "Sub Category is required" })} disabled={!categoryId}>
                <option value="">Select Sub Category</option>
                {subCategories.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {errors.subCategoryId && <p className="mt-1 text-sm text-red-600">{errors.subCategoryId.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand (optional)</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none" {...register("brandId")}>
                <option value="">Select Brand</option>
                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none"
                {...register("unitId", { required: "Unit is required" })}>
                <option value="">Select Unit</option>
                {units.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
              {errors.unitId && <p className="mt-1 text-sm text-red-600">{errors.unitId.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none" placeholder="Enter item name"
                {...register("itemName", { required: "Item name is required", minLength: { value: 2, message: "Item name must be at least 2 characters" } })} />
              {errors.itemName && <p className="mt-1 text-sm text-red-600">{errors.itemName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
              <input type="number" step="0.01" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none" placeholder="Enter reorder level"
                {...register("reorderLevel", { min: { value: 0, message: "Reorder level must be positive" } })} />
              {errors.reorderLevel && <p className="mt-1 text-sm text-red-600">{errors.reorderLevel.message}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/WorkPeriod/inventory/items" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemsPagesCreate;
