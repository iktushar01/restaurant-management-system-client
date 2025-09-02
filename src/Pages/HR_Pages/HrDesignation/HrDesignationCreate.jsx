import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";

const HrDesignationCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Designation Form Data:", data);
    // Add your API call here
  };

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/hr/designation/Index"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Designations
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Designation
          </h2>
          <p className="text-gray-700 mt-1">
            Fill in the details below to create a new designation
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Designation Input */}
            <div className="md:col-span-2">
              <FormInput
                label="Designation"
                placeholder="e.g., Senior Software Engineer"
                name="designation"
                register={register}
                rules={{ required: "Designation name is required" }}
                errors={errors}
              />
            </div>

            {/* Basic Salary Input */}
            <div className="md:col-span-2">
              <FormInput
                label="Basic Salary"
                placeholder="e.g., 50000"
                type="number"
                name="basicSalary"
                register={register}
                rules={{
                  required: "Basic Salary is required",
                  min: { value: 0, message: "Salary must be positive" },
                }}
                errors={errors}
                prefix="$"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/hr/designation/Index"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer"
            >
              Save Designation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HrDesignationCreate;
