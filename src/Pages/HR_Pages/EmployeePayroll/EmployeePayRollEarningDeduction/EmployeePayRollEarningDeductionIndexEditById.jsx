import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../../Shared/FormInput/FromInput";

const EmployeePayRollEarningDeductionIndexEditById = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Watch employee selection to potentially auto-fill other fields
  const selectedEmployee = watch("employeeName");

  // Simulating loading existing data from your screenshot
  React.useEffect(() => {
    setValue("deductionHeading", "");
    setValue("employeeName", "ADMIN");
    setValue("particular", "sfsdf");
    setValue("amount", "3423.00");
    setValue("monthName", "January");
    setValue("yearName", "2025");
    setValue("date", "2025-08-21T00:00"); // Format for datetime-local input
  }, [setValue]);

  const onSubmit = (data) => {
    console.log("Deduction Form Data:", data);
    // Add your API call here
  };

  // Sample employee data for dropdown
  const employees = [
    { id: 1, name: "ADMIN" },
    { id: 2, name: "John Doe" },
    { id: 3, name: "Jane Smith" },
  ];

  // Month options
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/hr/employee-payroll/deduction/1"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Deduction List
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Salary Deduction
          </h2>
          <p className="text-gray-700 mt-1">
            Update the details of the salary deduction
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deduction Heading Input */}
            <div>
              <FormInput
                label="Deduction Heading"
                placeholder="Enter deduction heading"
                name="deductionHeading"
                register={register}
                errors={errors}
              />
            </div>
            
            {/* Employee Name Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name *
              </label>
              <select
                {...register("employeeName", { required: "Employee name is required" })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none transition-colors duration-200"
              >
                <option value="">Select an employee</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select>
              {errors.employeeName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.employeeName.message}
                </p>
              )}
            </div>
            
            {/* Particular Input */}
            <div>
              <FormInput
                label="Particular"
                placeholder="Enter particular"
                name="particular"
                register={register}
                rules={{ required: "Particular is required" }}
                errors={errors}
              />
            </div>
            
            {/* Amount Input */}
            <div>
              <FormInput
                label="Amount"
                placeholder="Enter amount"
                name="amount"
                type="number"
                step="0.01"
                register={register}
                rules={{ 
                  required: "Amount is required",
                  min: { value: 0, message: "Amount must be positive" }
                }}
                errors={errors}
              />
            </div>
            
            {/* Month Name Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month Name *
              </label>
              <select
                {...register("monthName", { required: "Month name is required" })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none transition-colors duration-200"
              >
                <option value="">Select a month</option>
                {months.map(month => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.monthName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.monthName.message}
                </p>
              )}
            </div>
            
            {/* Year Name Input */}
            <div>
              <FormInput
                label="Year Name"
                placeholder="Enter year"
                name="yearName"
                type="number"
                register={register}
                rules={{ 
                  required: "Year is required",
                  min: { value: 2000, message: "Year must be 2000 or later" },
                  max: { value: 2100, message: "Year must be 2100 or earlier" }
                }}
                errors={errors}
              />
            </div>
            
            {/* Date Input */}
            <div>
              <FormInput
                label="Date"
                name="date"
                type="datetime-local"
                register={register}
                rules={{ required: "Date is required" }}
                errors={errors}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to="/hr/employee-payroll/deduction/1"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer"
            >
              Update Deduction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayRollEarningDeductionIndexEditById;