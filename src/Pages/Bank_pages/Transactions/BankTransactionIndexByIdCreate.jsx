import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { bankService } from "../../../services/bankService";

const transactionTypeOptions = [
  { value: "", label: "Select Transaction Type" },
  { value: "DEPOSIT", label: "Deposit" },
  { value: "WITHDRAW", label: "Withdraw" },
];

const BankTransactionIndexByIdCreate = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await bankService.transactions.create({
        accountId,
        type: data.type,
        amount: Number(data.amount),
        date: data.date,
        note: data.note || "",
      });
      navigate(`/bank/BankTransaction/Index/${accountId}`);
    } catch (err) {
      setSubmitError(err.message || "Failed to create transaction");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="  mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to={`/bank/BankTransaction/Index/${accountId}`} className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200 " />
            Back to Bank Transactions
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">New Bank Transaction</h2>
          <p className="text-foreground mt-1">Fill in the details below to create a new bank transaction</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Transaction Type <span className="text-destructive">*</span>
              </label>
              <select
                {...register("type", { required: "Transaction type is required" })}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus-visible:ring-ring ${
                  errors.type ? "border-destructive" : "border-border"
                }`}
              >
                {transactionTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-destructive">{errors.type.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <FormInput
                label="Particulars"
                placeholder="Enter transaction details (e.g., Loan payment, Salary, etc.)"
                name="note"
                register={register}
                rules={{
                  required: "Particulars are required",
                  maxLength: {
                    value: 100,
                    message: "Particulars should not exceed 100 characters",
                  },
                }}
                errors={errors}
              />
            </div>
            <div>
              <FormInput
                label="Amount"
                placeholder="e.g., 5000"
                name="amount"
                type="number"
                register={register}
                rules={{
                  required: "Amount is required",
                  min: {
                    value: 1,
                    message: "Amount must be greater than 0",
                  },
                }}
                errors={errors}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to={`/bank/BankTransaction/Index/${accountId}`} className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2">
              Cancel
            </Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer flex items-center disabled:opacity-60">
              {submitting ? "Saving..." : "Create Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankTransactionIndexByIdCreate;
