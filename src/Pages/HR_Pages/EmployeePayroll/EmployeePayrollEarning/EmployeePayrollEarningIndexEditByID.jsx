import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../../Shared/FormInput/FromInput";

const EmployeePayrollEarningIndexEditByID = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Simulating loading existing data
  React.useEffect(() => {
    setValue("earningHeadName", "adfasdf");
    setValue("particular", "Particular");
    setValue("amount", "Amount");
    setValue("monthName", "January");
    setValue("yearName", "2025");
    setValue("date", "08/08/2025 00:00:00");
  }, [setValue]);

  const onSubmit = (data) => {
    console.log("Earning Head Form Data:", data);
    // Add your API call here
  };

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/hr/employee-payroll/earning/1"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Earning Head
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Earning Head
          </h2>
          <p className="text-gray-700 mt-1">
            Update the details of the earning head
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earning Head Name Input */}
            <div>
              <FormInput
                label="Earning Head Name"
                placeholder="Enter earning head name"
                name="earningHeadName"
                register={register}
                rules={{ required: "Earning head name is required" }}
                errors={errors}
              />
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
                register={register}
                rules={{ required: "Amount is required" }}
                errors={errors}
              />
            </div>
            
            {/* Month Name Input */}
            <div>
              <FormInput
                label="Month Name"
                placeholder="Enter month name"
                name="monthName"
                register={register}
                rules={{ required: "Month name is required" }}
                errors={errors}
              />
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
              to="/hr/employee-payroll/earning/1"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer"
            >
              Update Earning Head
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayrollEarningIndexEditByID;