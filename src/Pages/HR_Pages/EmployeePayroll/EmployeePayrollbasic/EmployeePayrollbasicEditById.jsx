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

const EmployeePayrollbasicEditById = () => {
  const { employeeId, id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, control } = useForm();

  useEffect(() => {
    hrService.basicSalaries.getById(employeeId, id)
      .then((res) => {
        const record = res.data;
        reset({
          particular: record.note || record.particular || "",
          basic: record.amount,
          month: record.monthName,
          year: record.yearName,
          date: toDateInput(record.dateISO),
        });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load basic salary"))
      .finally(() => setLoading(false));
  }, [employeeId, id, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await hrService.basicSalaries.update(employeeId, id, {
        amount: Number(data.basic),
        date: data.date,
        note: data.particular || "",
      });
      navigate(`/hr/employee-payroll/basic/${employeeId}`);
    } catch (err) {
      setSubmitError(err.message || "Failed to update basic salary");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="   mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to={`/hr/employee-payroll/basic/${employeeId}`}
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 " />
            Back to Basic Salary
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Edit Employee Salary Basic
          </h2>
          <p className="text-foreground mt-1">
            Update the details of the basic salary record
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>
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
                label="Basic"
                placeholder="Enter basic amount"
                name="basic"
                type="number"
                step="0.01"
                register={register}
                rules={{
                  required: "Basic amount is required",
                  min: { value: 0, message: "Basic amount must be positive" },
                }}
                errors={errors}
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
              to={`/hr/employee-payroll/basic/${employeeId}`}
              className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2"
            >
              Close
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePayrollbasicEditById;
