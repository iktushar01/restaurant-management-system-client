import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../../Shared/FormInput/FromInput";
import { hrService } from "../../../../services/hrService";

const toDateInput = (dateISO) => {
  if (!dateISO) return "";
  return new Date(dateISO).toISOString().slice(0, 10);
};

const EmployeePayRollSalaryPaymentEditByID = () => {
  const { employeeId, id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    hrService.salaryPayments.getById(employeeId, id)
      .then((res) => {
        const payment = res.data;
        reset({
          particular: payment.note || payment.particular || "",
          credit: payment.amount,
          month: payment.monthName,
          year: payment.yearName,
          date: toDateInput(payment.dateISO),
        });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load salary payment"))
      .finally(() => setLoading(false));
  }, [employeeId, id, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await hrService.salaryPayments.update(employeeId, id, {
        amount: Number(data.credit),
        paymentDate: data.date,
        note: data.particular || "",
      });
      navigate(`/hr/employee-payroll/salary-payment/${employeeId}`);
    } catch (err) {
      setSubmitError(err.message || "Failed to update salary payment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to={`/hr/employee-payroll/salary-payment/${employeeId}`}
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200 " />
            Back to Salary Payments
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Salary Payment
          </h2>
          <p className="text-gray-700 mt-1">
            Update the details of the salary payment
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>
          )}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <FormInput
                label="Particular"
                placeholder="Enter particular details"
                name="particular"
                register={register}
                errors={errors}
              />
            </div>

            <div>
              <FormInput
                label="Credit"
                placeholder="Enter credit amount"
                name="credit"
                type="number"
                step="0.01"
                register={register}
                rules={{
                  required: "Credit amount is required",
                  min: { value: 0.01, message: "Credit amount must be positive" },
                }}
                errors={errors}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Month_Name
              </label>
              <select
                {...register("month")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
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
                label="Year_Name"
                placeholder="Enter year"
                name="year"
                type="number"
                register={register}
                errors={errors}
              />
            </div>

            <div>
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
              to={`/hr/employee-payroll/salary-payment/${employeeId}`}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Close
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayRollSalaryPaymentEditByID;
