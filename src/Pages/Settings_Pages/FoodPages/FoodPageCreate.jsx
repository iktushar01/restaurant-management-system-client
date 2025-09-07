import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiUpload } from "react-icons/fi";

const FoodPageCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = (data) => {
    console.log("Food Form Data:", data);
    // Add your API call here
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/WorkPeriod/foods/index"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Food Items
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Food
          </h2>
          <p className="text-gray-700 mt-1">
            Fill in the details below to add a new food item
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Basic Information Column */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
              
              {/* Food No Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food No *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                  placeholder="e.g., 001"
                  {...register("foodNo", { 
                    required: "Food number is required"
                  })}
                />
                {errors.foodNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.foodNo.message}</p>
                )}
              </div>

              {/* Food Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                  placeholder="Enter food name"
                  {...register("foodName", { 
                    required: "Food name is required"
                  })}
                />
                {errors.foodName && (
                  <p className="mt-1 text-sm text-red-600">{errors.foodName.message}</p>
                )}
              </div>

              {/* Food Category Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food Category *
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                  {...register("category", { required: "Food category is required" })}
                >
                  <option value="">Select a category</option>
                  <option value="Cold Beverages">Cold Beverages</option>
                  <option value="Hot Beverages">Hot Beverages</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Salad">Salad</option>
                  <option value="Soup">Soup</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              {/* Serial No Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serial No *
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                  placeholder="e.g., 368"
                  {...register("serialNo", { 
                    required: "Serial number is required",
                    min: {
                      value: 1,
                      message: "Serial number must be positive"
                    }
                  })}
                />
                {errors.serialNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.serialNo.message}</p>
                )}
              </div>
            </div>

            {/* Pricing & Details Column */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Pricing & Details</h3>
              
              {/* Quantity Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                  placeholder="Enter quantity"
                  {...register("quantity", { 
                    required: "Quantity is required",
                    min: {
                      value: 0,
                      message: "Quantity cannot be negative"
                    }
                  })}
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                )}
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                  placeholder="Enter price"
                  {...register("price", { 
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price cannot be negative"
                    }
                  })}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              {/* Discount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                  placeholder="Enter discount percentage"
                  {...register("discount", { 
                    min: {
                      value: 0,
                      message: "Discount cannot be negative"
                    },
                    max: {
                      value: 100,
                      message: "Discount cannot exceed 100%"
                    }
                  })}
                />
                {errors.discount && (
                  <p className="mt-1 text-sm text-red-600">{errors.discount.message}</p>
                )}
              </div>

              {/* Color Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    className="h-10 w-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none cursor-pointer"
                    {...register("color")}
                  />
                  <span className="text-sm text-gray-500">Select a color</span>
                </div>
              </div>
            </div>

            {/* Additional Information Column */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Information</h3>
              
              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                  placeholder="Enter food description"
                  rows={3}
                  {...register("description")}
                />
              </div>

              {/* Note Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note
                </label>
                <textarea
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all duration-200 outline-none"
                  placeholder="Add any notes about the food item"
                  rows={2}
                  {...register("note")}
                />
              </div>

              {/* Image Upload Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-blue-500 font-medium">Choose File</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedFile ? selectedFile.name : "No file chosen"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Checkbox Options */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="package"
                    className="h-4 w-4 text-amber-500 focus:ring-amber-300 border-gray-300 rounded"
                    {...register("package")}
                  />
                  <label htmlFor="package" className="ml-2 block text-sm text-gray-700">
                    Package
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="availability"
                    defaultChecked
                    className="h-4 w-4 text-amber-500 focus:ring-amber-300 border-gray-300 rounded"
                    {...register("availability")}
                  />
                  <label htmlFor="availability" className="ml-2 block text-sm text-gray-700">
                    Availability
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="vatApplicable"
                    className="h-4 w-4 text-amber-500 focus:ring-amber-300 border-gray-300 rounded"
                    {...register("vatApplicable")}
                  />
                  <label htmlFor="vatApplicable" className="ml-2 block text-sm text-gray-700">
                    VAT Applicable
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3 pt-6">
            <Link
              to="/WorkPeriod/foods/index"
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

export default FoodPageCreate;