import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const DineTableIndexCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Table Form Data:", data);
    // Add your API call here
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/WorkPeriod/dine/tables"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Tables
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Table
          </h2>
          <p className="text-gray-700 mt-1">
            Fill in the details below to add a new table
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Table No Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Table No
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                placeholder="Enter table number (e.g., A1, KABIN 1)"
                {...register("tableNo", { 
                  required: "Table number is required",
                  minLength: {
                    value: 1,
                    message: "Table number must be at least 1 character"
                  }
                })}
              />
              {errors.tableNo && (
                <p className="mt-1 text-sm text-red-600">{errors.tableNo.message}</p>
              )}
            </div>

            {/* Capacity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <input
                type="number"
                min="1"
                max="20"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                placeholder="Enter table capacity"
                {...register("capacity", { 
                  required: "Capacity is required",
                  min: {
                    value: 1,
                    message: "Capacity must be at least 1"
                  },
                  max: {
                    value: 20,
                    message: "Capacity cannot exceed 20"
                  }
                })}
              />
              {errors.capacity && (
                <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>
              )}
            </div>

            {/* Dining Location Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dining Location
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                {...register("location", { required: "Dining location selection is required" })}
              >
                <option value="">Select a dining location</option>
                <option value="Central">Central</option>
                <option value="Terrace">Terrace</option>
                <option value="Private Room">Private Room</option>
                <option value="Bar Area">Bar Area</option>
                <option value="Garden">Garden</option>
              </select>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/WorkPeriod/dine/tables"
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

export default DineTableIndexCreate;