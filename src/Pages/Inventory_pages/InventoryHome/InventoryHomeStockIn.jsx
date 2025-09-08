import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";

const InventoryHomeStockIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Sample data for dropdowns
  const [categories] = useState([
    { id: 1, name: "Raw Materials" },
    { id: 2, name: "Finished Goods" },
    { id: 3, name: "Packaging Materials" },
    { id: 4, name: "Office Supplies" },
  ]);

  const [items] = useState([
    { id: 1, name: "Chicken", categoryId: 1 },
    { id: 2, name: "Beef", categoryId: 1 },
    { id: 3, name: "Fish", categoryId: 1 },
    { id: 4, name: "Rice", categoryId: 1 },
    { id: 5, name: "Spices", categoryId: 1 },
  ]);

  const [stockLocations] = useState([
    { id: 1, name: "Tekerhat Bazar" },
    { id: 2, name: "Main Warehouse" },
    { id: 3, name: "Cold Storage" },
    { id: 4, name: "Dry Storage" },
  ]);

  const [units] = useState([
    { id: 1, name: "KG" },
    { id: 2, name: "Grams" },
    { id: 3, name: "Pieces" },
    { id: 4, name: "Liters" },
    { id: 5, name: "Boxes" },
  ]);

  const onSubmit = (data) => {
    console.log("Stock In Form Data:", data);
    // Add your API call here
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/inventory"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Inventory
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Stock In</h2>
          <p className="text-gray-700 mt-1">
            Fill in the details below to record incoming stock
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all"
                {...register("category", {
                  required: "Category is required",
                })}
              >
                <option value="">--Select Category--</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Item Name Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all"
                {...register("itemName", { required: "Item name is required" })}
              >
                <option value="">--Select Item--</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.itemName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.itemName.message}
                </p>
              )}
            </div>

            {/* Stock Location Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Location
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all"
                {...register("stockLocation", {
                  required: "Stock location is required",
                })}
              >
                <option value="">--Select Location--</option>
                {stockLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {errors.stockLocation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.stockLocation.message}
                </p>
              )}
            </div>

            {/* Stock In Quantity and Unit */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <FormInput
                  label="Stock In Quantity"
                  name="quantity"
                  type="number"
                  register={register}
                  rules={{
                    required: "Quantity is required",
                    min: {
                      value: 0.01,
                      message: "Quantity must be greater than 0",
                    },
                  }}
                  errors={errors}
                  step="0.01"
                />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all"
                  {...register("unit", { required: "Unit is required" })}
                >
                  <option value="">--Select--</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
                {errors.unit && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.unit.message}
                  </p>
                )}
              </div>
            </div>

            {/* Stock In Date */}
            <div>
              <FormInput
                label="Stock In Date"
                name="stockInDate"
                type="date"
                register={register}
                rules={{ required: "Stock in date is required" }}
                errors={errors}
              />
            </div>

            {/* Note */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note
              </label>
              <textarea
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition-all"
                {...register("note")}
                rows={3}
                placeholder="Enter any additional notes about this stock in"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/inventory"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Close
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-200 to-blue-400 text-gray-900 font-medium rounded-lg hover:from-blue-300 hover:to-blue-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 cursor-pointer"
            >
              Record Stock In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeStockIn;
