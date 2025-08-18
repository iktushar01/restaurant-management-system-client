import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";

const BankAccountInfoCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Bank Account Form Data:", data);
    // Add your API call here
  };

  // Sample data for dropdowns (replace with API data)
  const bankOptions = [
    { value: "", label: "Select Bank" },
    { value: "DBBL", label: "Dutch Bangla Bank Limited (DBBL)" },
    { value: "BRAC", label: "BRAC Bank" },
    { value: "EBL", label: "Eastern Bank Limited (EBL)" },
    { value: "HSBC", label: "HSBC Bank" },
  ];

  const branchOptions = [
    { value: "", label: "Select Branch" },
    { value: "Hallshahar", label: "Hallshahar Branch" },
    { value: "Dhanmondi", label: "Dhanmondi Branch" },
    { value: "Gulshan", label: "Gulshan Branch" },
    { value: "Uttara", label: "Uttara Branch" },
  ];

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/bank/BankAccountInfo/Index"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Bank Accounts
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Bank Account
          </h2>
          <p className="text-gray-700 mt-1">
            Fill in the details below to create a new bank account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Account Name */}
            <div className="md:col-span-2">
              <FormInput
                label="Account Name"
                placeholder="e.g., Company Main Account"
                name="accountName"
                register={register}
                rules={{ required: "Account name is required" }}
                errors={errors}
              />
            </div>

            {/* Account Number */}
            <div>
              <FormInput
                label="Account Number"
                placeholder="e.g., 123456789"
                name="accountNo"
                register={register}
                rules={{
                  required: "Account number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid account number",
                  },
                }}
                errors={errors}
              />
            </div>

            {/* Bank Name Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <select
                {...register("bankName", { required: "Bank name is required" })}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                  errors.bankName ? "border-red-500" : "border-gray-300"
                }`}
              >
                {bankOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.bankName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.bankName.message}
                </p>
              )}
            </div>

            {/* Branch Name Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Name <span className="text-red-500">*</span>
              </label>
              <select
                {...register("branchName", {
                  required: "Branch name is required",
                })}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                  errors.branchName ? "border-red-500" : "border-gray-300"
                }`}
              >
                {branchOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.branchName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.branchName.message}
                </p>
              )}
            </div>

            {/* Note */}
            <div className="md:col-span-2">
              <FormInput
                label="Note (Optional)"
                placeholder="Any additional information"
                name="note"
                register={register}
                isTextArea={true}
                errors={errors}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/bank/BankAccountInfo/Index"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer flex items-center"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankAccountInfoCreate;