import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../../Shared/FormInput/FromInput";

const InventoryVendorsEditById = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Pre-fill form with existing supplier data (in a real app, this would come from an API)
  React.useEffect(() => {
    // Simulating data fetching
    setValue("name", "Sakura Shop");
    setValue("address", "Dhaka");
    setValue("contact", "01111111111");
    setValue("openingBalance", "0.00");
  }, [setValue]);

  const onSubmit = (data) => {
    console.log("Supplier Form Data:", data);
    // Add your API call here
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/WorkPeriod/inventory/vendors"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Suppliers
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Update Supplier</h2>
          <p className="text-gray-700 mt-1">
            Update the details below for this supplier
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Supplier Name Input */}
            <div className="md:col-span-2">
              <FormInput
                label="Supplier Name"
                placeholder="e.g., Sakura Shop"
                name="name"
                register={register}
                rules={{ required: "Supplier name is required" }}
                errors={errors}
              />
            </div>

            {/* Address Input */}
            <div className="md:col-span-2">
              <FormInput
                label="Address"
                placeholder="e.g., Dhaka"
                name="address"
                register={register}
                rules={{ required: "Address is required" }}
                errors={errors}
              />
            </div>

            {/* Contact No Input */}
            <div className="md:col-span-2">
              <FormInput
                label="Contact No"
                placeholder="e.g., 01111111111"
                name="contact"
                register={register}
                rules={{
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Please enter a valid contact number",
                  },
                }}
                errors={errors}
              />
            </div>

            {/* Opening Balance Input */}
            <div className="md:col-span-2">
              <FormInput
                label="Opening Balance"
                placeholder="e.g., 0.00"
                name="openingBalance"
                type="number"
                step="0.01"
                register={register}
                rules={{
                  required: "Opening balance is required",
                  min: {
                    value: 0,
                    message: "Opening balance cannot be negative",
                  },
                }}
                errors={errors}
                prefix="$"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/WorkPeriod/inventory/vendors"
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

export default InventoryVendorsEditById;
