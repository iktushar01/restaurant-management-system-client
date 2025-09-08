import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";

const InventoryHomeMoveStock = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  // Sample data
  const [items] = useState([
    { 
      id: 1, 
      name: "Chicken", 
      availableStock: 150, 
      unit: "KG",
      locations: [
        { id: 1, name: "Main Warehouse", stock: 100 },
        { id: 2, name: "Tekerhat Bazar", stock: 50 }
      ]
    },
    { 
      id: 2, 
      name: "Beef", 
      availableStock: 75, 
      unit: "KG",
      locations: [
        { id: 1, name: "Main Warehouse", stock: 75 },
        { id: 2, name: "Tekerhat Bazar", stock: 0 }
      ]
    },
    { 
      id: 3, 
      name: "Fish", 
      availableStock: 200, 
      unit: "KG",
      locations: [
        { id: 1, name: "Main Warehouse", stock: 150 },
        { id: 2, name: "Tekerhat Bazar", stock: 50 }
      ]
    },
  ]);

  const [stockLocations] = useState([
    { id: 1, name: "Main Warehouse" },
    { id: 2, name: "Tekerhat Bazar" },
    { id: 3, name: "Cold Storage" },
    { id: 4, name: "Dry Storage" },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFromLocation, setSelectedFromLocation] = useState(null);

  const onSubmit = (data) => {
    console.log("Move Stock Form Data:", data);
    // Add your API call here
  };

  const handleItemChange = (e) => {
    const itemId = e.target.value;
    const item = items.find((i) => i.id === parseInt(itemId));
    setSelectedItem(item);
    setSelectedFromLocation(null);
    setValue("fromLocation", "");
    setValue("availableStock", 0);
    setValue("movedStock", "");
    setValue("toLocation", "");
  };

  const handleFromLocationChange = (e) => {
    const locationId = e.target.value;
    if (selectedItem) {
      const location = selectedItem.locations.find(
        (loc) => loc.id === parseInt(locationId)
      );
      setSelectedFromLocation(location);
      setValue("availableStock", location ? location.stock : 0);
    }
  };

  const handleMovedStockChange = (e) => {
    const movedStock = parseFloat(e.target.value) || 0;
    const availableStock = selectedFromLocation ? selectedFromLocation.stock : 0;
    
    if (movedStock > availableStock) {
      setValue("movedStock", availableStock);
    }
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
        <div className="p-6 bg-gradient-to-r from-purple-200 to-purple-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Move Stock
          </h2>
          <p className="text-gray-700 mt-1">
            Transfer inventory items between locations
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Item Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none transition-all"
                {...register("itemName", { required: "Item name is required" })}
                onChange={handleItemChange}
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

            {/* From Location Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Location (From)
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none transition-all"
                {...register("fromLocation", { 
                  required: "From location is required" 
                })}
                onChange={handleFromLocationChange}
                disabled={!selectedItem}
              >
                <option value="">-Select-</option>
                {selectedItem?.locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {errors.fromLocation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fromLocation.message}
                </p>
              )}
            </div>

            {/* Available Stock */}
            <div>
              <FormInput
                label="Available Stock"
                name="availableStock"
                type="number"
                register={register}
                errors={errors}
                readOnly
              />
              {selectedItem && (
                <span className="text-sm text-gray-500 ml-2">
                  {selectedItem.unit}
                </span>
              )}
            </div>

            {/* Moved Stock and Unit */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <FormInput
                  label="Moved Stock"
                  name="movedStock"
                  type="number"
                  register={register}
                  rules={{ 
                    required: "Moved stock is required",
                    min: {
                      value: 0.01,
                      message: "Moved stock must be greater than 0"
                    },
                    max: {
                      value: selectedFromLocation ? selectedFromLocation.stock : 0,
                      message: "Moved stock cannot exceed available stock"
                    }
                  }}
                  errors={errors}
                  step="0.01"
                  onChange={handleMovedStockChange}
                />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50">
                  <span className="text-gray-700">
                    {selectedItem ? selectedItem.unit : "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Amount (calculated value) */}
            <div>
              <FormInput
                label="Amount"
                name="amount"
                type="number"
                register={register}
                rules={{ 
                  required: "Amount is required",
                  min: {
                    value: 0.01,
                    message: "Amount must be greater than 0"
                  }
                }}
                errors={errors}
                step="0.01"
              />
            </div>

            {/* To Location Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Location (To)
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none transition-all"
                {...register("toLocation", { 
                  required: "To location is required" 
                })}
              >
                <option value="">-Select-</option>
                {stockLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {errors.toLocation && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.toLocation.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <FormInput
                label="Date"
                name="date"
                type="date"
                register={register}
                rules={{ required: "Date is required" }}
                errors={errors}
              />
            </div>

            {/* Note */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note
              </label>
              <textarea
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none transition-all"
                {...register("note")}
                rows={3}
                placeholder="Enter any additional notes about this stock movement"
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
              className="px-6 py-2.5 bg-gradient-to-r from-purple-200 to-purple-400 text-gray-900 font-medium rounded-lg hover:from-purple-300 hover:to-purple-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 cursor-pointer"
            >
              Move Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeMoveStock;