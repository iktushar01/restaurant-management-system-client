import React, { useEffect, useState } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
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
    <div className="   mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to={`/hr/employee-payroll/earning/${employeeId}`}
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 " />
            Back to Earnings
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-200 to-blue-400 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            New Payroll Salary Earning
          </h2>
          <p className="text-foreground mt-1">
            Fill in the details below to create a new payroll earning
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>
          )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">
                Earning <span className="text-destructive">*</span>
              </label>
              <FormSelect
                name="headId"
                control={control}
                rules={{ required: "Earning type is required" }}
                errors={errors}
                placeholder="Select earning head"
                options={heads.map((head) => ({ value: String(head.id), label: String(head.name) }))}
              />
              {errors.headId && (
                <p className="mt-1 text-sm text-destructive">{errors.headId.message}</p>
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
              <label className="block text-sm font-medium text-foreground mb-1">
                Month
              </label>
              <FormSelect
                name="month"
                control={control}
                errors={errors}
                placeholder="Select Month"
                options={[
                  { value: "January", label: "January" },
                  { value: "February", label: "February" },
                  { value: "March", label: "March" },
                  { value: "April", label: "April" },
                  { value: "May", label: "May" },
                  { value: "June", label: "June" },
                  { value: "July", label: "July" },
                  { value: "August", label: "August" },
                  { value: "September", label: "September" },
                  { value: "October", label: "October" },
                  { value: "November", label: "November" },
                  { value: "December", label: "December" },
                ]}
              />
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
              className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-200 to-blue-400 text-foreground font-medium rounded-lg hover:from-blue-300 hover:to-blue-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60"
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
