import React, { useEffect, useState } from "react";
import FormSelect from "@/Shared/FormSelect/FormSelect";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { financeService } from "../../../services/financeService";

const ExpenseCreate = () => {
  const navigate = useNavigate();
  const [heads, setHeads] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    financeService.expenseHeads.getAll({ limit: 100 })
      .then((res) => setHeads(res.data || []))
      .catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await financeService.expenseEntries.create({
        headId: data.headId,
        amount: Number(data.amount),
        note: data.note || "",
        date: data.date,
      });
      navigate("/expense/manage");
    } catch (err) {
      setSubmitError(err.message || "Failed to create expense");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="  mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/expense/manage" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Expenses
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Create New Expense</h2>
          <p className="text-foreground mt-1">Add new expense details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Head Name <span className="text-destructive">*</span>
              </label>
              <FormSelect
                name="headId"
                control={control}
                rules={{ required: "Head name is required" }}
                errors={errors}
                placeholder="Select Head Name"
                options={[
                ]}
              />
              {errors.headId && <p className="mt-1 text-sm text-destructive">{errors.headId.message}</p>}
            </div>

            <FormInput
              label="Amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              register={register}
              rules={{ required: "Amount is required", min: { value: 0.01, message: "Amount must be greater than 0" } }}
              errors={errors}
            />

            <FormInput label="Date" name="date" type="date" register={register} rules={{ required: "Date is required" }} errors={errors} />

            <FormInput label="Note" name="note" placeholder="Enter expense details" register={register} errors={errors} isTextArea={true} />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/expense/manage" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseCreate;
