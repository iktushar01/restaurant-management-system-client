import React, { useEffect, useState } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../../Shared/FormInput/FromInput";
import { hrService } from "../../../../services/hrService";

const toDateInput = (dateISO) => {
  if (!dateISO) return "";
  return new Date(dateISO).toISOString().slice(0, 10);
};

const EmployeePayRollEarningDeductionIndexEditById = () => {
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
    reset, control } = useForm();

  useEffect(() => {
    Promise.all([
      hrService.deductionHeads.getAll({ limit: 100 }),
      hrService.deductions.getById(employeeId, id),
    ])
      .then(([headsRes, deductionRes]) => {
        setHeads(headsRes.data || []);
        const deduction = deductionRes.data;
        reset({
          headId: deduction.headId,
          particular: deduction.note || deduction.particular || "",
          amount: deduction.amount,
          monthName: deduction.monthName,
          yearName: deduction.yearName,
          date: toDateInput(deduction.dateISO),
        });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load deduction"))
      .finally(() => setLoading(false));
  }, [employeeId, id, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await hrService.deductions.update(employeeId, id, {
        headId: data.headId,
        amount: Number(data.amount),
        date: data.date,
        note: data.particular || "",
      });
      navigate(`/hr/employee-payroll/deduction/${employeeId}`);
    } catch (err) {
      setSubmitError(err.message || "Failed to update deduction");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="  mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to={`/hr/employee-payroll/deduction/${employeeId}`}
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 " />
            Back to Deduction List
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Edit Salary Deduction
          </h2>
          <p className="text-foreground mt-1">
            Update the details of the salary deduction
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Deduction Heading <span className="text-destructive">*</span>
              </label>
              <FormSelect
                name="headId"
                control={control}
                rules={{ required: "Deduction head is required" }}
                errors={errors}
                placeholder="Select deduction head"
                options={heads.map((head) => ({ value: String(head.id), label: String(head.name) }))}
              />
              {errors.headId && (
                <p className="mt-1 text-sm text-destructive">{errors.headId.message}</p>
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
                step="0.01"
                register={register}
                rules={{
                  required: "Amount is required",
                  min: { value: 0, message: "Amount must be positive" },
                }}
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
              to={`/hr/employee-payroll/deduction/${employeeId}`}
              className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update Deduction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayRollEarningDeductionIndexEditById;
