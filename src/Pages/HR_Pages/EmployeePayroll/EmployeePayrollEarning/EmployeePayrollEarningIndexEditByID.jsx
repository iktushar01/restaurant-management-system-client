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

const EmployeePayrollEarningIndexEditByID = () => {
  const { employeeId, id } = useParams();
  const navigate = useNavigate();
  const [heads, setHeads] = useState([]);
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
    Promise.all([
      hrService.earningHeads.getAll({ limit: 100 }),
      hrService.earnings.getById(employeeId, id),
    ])
      .then(([headsRes, earningRes]) => {
        setHeads(headsRes.data || []);
        const earning = earningRes.data;
        reset({
          headId: earning.headId,
          particular: earning.note || earning.particular || "",
          amount: earning.amount,
          monthName: earning.monthName,
          yearName: earning.yearName,
          date: toDateInput(earning.dateISO),
        });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load earning"))
      .finally(() => setLoading(false));
  }, [employeeId, id, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await hrService.earnings.update(employeeId, id, {
        headId: data.headId,
        amount: Number(data.amount),
        date: data.date,
        note: data.particular || "",
      });
      navigate(`/hr/employee-payroll/earning/${employeeId}`);
    } catch (err) {
      setSubmitError(err.message || "Failed to update earning");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to={`/hr/employee-payroll/earning/${employeeId}`}
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
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Earning Head Name <span className="text-red-500">*</span>
              </label>
              <select
                {...register("headId", { required: "Earning head is required" })}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 ${errors.headId ? "border-red-500" : "border-gray-300"}`}
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

            <div>
              <FormInput
                label="Particular"
                placeholder="Enter particular"
                name="particular"
                register={register}
                errors={errors}
              />
            </div>

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

            <div>
              <FormInput
                label="Month Name"
                placeholder="Enter month name"
                name="monthName"
                register={register}
                errors={errors}
              />
            </div>

            <div>
              <FormInput
                label="Year Name"
                placeholder="Enter year"
                name="yearName"
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
              to={`/hr/employee-payroll/earning/${employeeId}`}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update Earning Head"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayrollEarningIndexEditByID;
