import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";

const BankTransactionIndexByIdEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      date: "2025-08-12",
      accountNo: "15141",
      transactionType: "Loan",
      particulars: "WR23R23R23R",
      amount: "23.00"
    }
  });

  const onSubmit = (data) => {
    console.log("Bank Transaction Form Data:", data);
    // Add your API call here
  };

  // Sample data for dropdowns
  const transactionTypeOptions = [
    { value: "Deposit", label: "Deposit" },
    { value: "Withdrawal", label: "Withdrawal" },
    { value: "Loan", label: "Loan" },
    { value: "Refund Loan", label: "Refund Loan" },
  ];

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/bank/BankTransaction/Index/1/"
          
          //==========================Need to add real ID============

          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Transactions
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Bank Transaction
          </h2>
          <p className="text-gray-700 mt-1">
            Update the details below to edit this transaction
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Date */}
            <div>
              <FormInput
                label="Date"
                type="date"
                name="date"
                register={register}
                rules={{ required: "Date is required" }}
                errors={errors}
              />
            </div>

            {/* Account Number */}
            <div>
              <FormInput
                label="Account Number"
                name="accountNo"
                register={register}
                readOnly
                className="bg-gray-100"
                errors={errors}
              />
            </div>

            {/* Transaction Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register("transactionType", { 
                  required: "Transaction type is required" 
                })}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                  errors.transactionType ? "border-red-500" : "border-gray-300"
                }`}
              >
                {transactionTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.transactionType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.transactionType.message}
                </p>
              )}
            </div>

            {/* Particulars */}
            <div>
              <FormInput
                label="Particulars"
                name="particulars"
                register={register}
                rules={{ required: "Particulars are required" }}
                errors={errors}
              />
            </div>

            {/* Amount */}
            <div>
              <FormInput
                label="Amount"
                name="amount"
                type="number"
                step="0.01"
                register={register}
                rules={{ 
                  required: "Amount is required",
                  min: {
                    value: 0.01,
                    message: "Amount must be greater than 0"
                  }
                }}
                errors={errors}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/bank/BankTransaction/Index/1/"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Close
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankTransactionIndexByIdEdit;