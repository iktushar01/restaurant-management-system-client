import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../../Shared/FormInput/FromInput";
import { hrService } from "../../../../services/hrService";

const EmployeePayrollEarningCreateByID = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [heads, setHeads] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    hrService.earningHeads.getAll({ limit: 100 })
      .then((res) => setHeads(res.data || []))
      .catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await hrService.earnings.create(employeeId, {
        headId: data.headId,
        amount: Number(data.amount),
        date: data.date,
        note: data.particular || "",
      });
      navigate(`/hr/employee-payroll/earning/${employeeId}`);
    } catch (err) {
      setSubmitError(err.message || "Failed to create earning");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to={`/hr/employee-payroll/earning/${employeeId}`}
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Earnings
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            New Payroll Salary Earning
          </h2>
          <p className="text-gray-700 mt-1">
            Fill in the details below to create a new payroll earning
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Earning <span className="text-red-500">*</span>
              </label>
              <select
                {...register("headId", { required: "Earning type is required" })}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${errors.headId ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select earning head</option>
                {heads.map((head) => (
                  <option key={head.id} value={head.id}>{head.name}</option>
                ))}
              </select>
              {errors.headId && (
                <p className="mt-1 text-sm text-red-600">{errors.headId.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <FormInput
                label="Particular"
                placeholder="e.g., Monthly basic salary"
                name="particular"
                register={register}
                errors={errors}
              />
            </div>

            <div className="md:col-span-2">
              <FormInput
                label="Amount"
                placeholder="e.g., 5000.00"
                name="amount"
                type="number"
                register={register}
                rules={{
                  required: "Amount is required",
                  min: { value: 0, message: "Amount must be positive" },
                }}
                errors={errors}
                prefix="$"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                {...register("month")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <div>
              <FormInput
                label="Year"
                placeholder="e.g., 2025"
                name="year"
                type="number"
                register={register}
                errors={errors}
              />
            </div>

            <div className="md:col-span-2">
              <FormInput
                label="Date"
                name="date"
                type="date"
                register={register}
                rules={{ required: "Date is required" }}
                errors={errors}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link
              to={`/hr/employee-payroll/earning/${employeeId}`}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-200 to-blue-400 text-gray-900 font-medium rounded-lg hover:from-blue-300 hover:to-blue-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Earning"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayrollEarningCreateByID;
