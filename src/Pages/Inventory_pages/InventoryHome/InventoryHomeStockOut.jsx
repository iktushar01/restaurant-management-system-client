import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";

const InventoryHomeStockOut = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [locations] = useState([
    { id: 1, name: "Tekerhat Bazar" },
    { id: 2, name: "Main Store" },
    { id: 3, name: "Branch Store" },
  ]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const availableStock = 0; // This would typically come from props or API

  const onSubmit = (data) => {
    console.log("Stock Out Form Data:", data);
    // Add your API call here
  };

  const handleLocationChange = (e) => {
    const locationId = e.target.value;
    const location = locations.find((l) => l.id === parseInt(locationId));
    setSelectedLocation(location);
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
        <div className="p-6 bg-gradient-to-r from-red-200 to-red-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Stock Out</h2>
          <p className="text-gray-700 mt-1">
            Record items being taken out of inventory
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Item Name */}
            <div className="md:col-span-2">
              <FormInput
                label="Item Name"
                name="itemName"
                type="text"
                register={register}
                rules={{ required: "Item name is required" }}
                errors={errors}
                defaultValue="Chicken"
                readOnly
              />
            </div>

            {/* Select Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Location
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none transition-all"
                {...register("location", {
                  required: "Location is required",
                })}
                onChange={handleLocationChange}
              >
                <option value="">--Select--</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Available Stock */}
            <div className="md:col-span-2">
              <FormInput
                label="Available Stock"
                name="availableStock"
                type="number"
                register={register}
                rules={{ required: true }}
                errors={errors}
                defaultValue={availableStock}
                readOnly
              />
            </div>

            {/* Stock Out Amount with Unit */}
            <div className="md:col-span-2">
              <div className="flex items-end space-x-3">
                <div className="flex-grow">
                  <FormInput
                    label="Stock Out Amount"
                    name="stockOutAmount"
                    type="number"
                    register={register}
                    rules={{
                      required: "Stock out amount is required",
                      min: {
                        value: 0.01,
                        message: "Amount must be greater than 0",
                      },
                      max: {
                        value: availableStock,
                        message: "Amount cannot exceed available stock",
                      },
                    }}
                    errors={errors}
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none transition-all"
                    {...register("unit", {
                      required: "Unit is required",
                    })}
                  >
                    <option value="KG">KG</option>
                    <option value="PCS">PCS</option>
                    <option value="L">L</option>
                    <option value="M">M</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Stock Out Date */}
            <div className="md:col-span-2">
              <FormInput
                label="Stock Out Date"
                name="stockOutDate"
                type="date"
                register={register}
                rules={{ required: "Stock out date is required" }}
                errors={errors}
              />
            </div>

            {/* Note */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note
              </label>
              <textarea
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none transition-all"
                {...register("note")}
                rows={3}
                placeholder="Add any notes about this stock out"
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
              className="px-6 py-2.5 bg-gradient-to-r from-red-200 to-red-400 text-gray-900 font-medium rounded-lg hover:from-red-300 hover:to-red-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 cursor-pointer"
            >
              Stock Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryHomeStockOut;
