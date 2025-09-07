import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const InventoryStockLocationCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Location Form Data:", data);
    // Add your API call here
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/WorkPeriod/dine/location"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Locations
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Location
          </h2>
          <p className="text-gray-700 mt-1">
            Fill in the details below to add a new location
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Location Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                placeholder="Enter location name"
                {...register("name", { 
                  required: "Location name is required",
                  minLength: {
                    value: 2,
                    message: "Location name must be at least 2 characters"
                  }
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Location Type Input (Text field instead of dropdown) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Type
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                placeholder="Enter location type (e.g., Indoor, Outdoor, Bar)"
                {...register("type", { 
                  required: "Location type is required",
                  minLength: {
                    value: 2,
                    message: "Location type must be at least 2 characters"
                  }
                })}
              />
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/WorkPeriod/dine/location"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Close
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryStockLocationCreate;