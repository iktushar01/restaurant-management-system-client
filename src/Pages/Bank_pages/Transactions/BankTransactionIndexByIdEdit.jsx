import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import { bankService } from "../../../services/bankService";

const transactionTypeOptions = [
  { value: "DEPOSIT", label: "Deposit" },
  { value: "WITHDRAW", label: "Withdraw" },
];

const toInputDate = (dateStr) => {
  if (!dateStr) return "";
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return dateStr.slice(0, 10);
};

const BankTransactionIndexByIdEdit = () => {
  const { accountId, transactionId } = useParams();
  const navigate = useNavigate();
  const [accountNo, setAccountNo] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    Promise.all([
      bankService.transactions.getById(transactionId),
      bankService.accounts.getById(accountId),
    ])
      .then(([txnRes, accountRes]) => {
        const txn = txnRes.data;
        setAccountNo(accountRes.data.accountNo);
        reset({
          date: toInputDate(txn.date),
          type: txn.type,
          note: txn.note || "",
          amount: txn.amount,
        });
      })
      .catch((err) => setSubmitError(err.message || "Failed to load transaction"))
      .finally(() => setLoading(false));
  }, [accountId, transactionId, reset]);

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    try {
      await bankService.transactions.update(transactionId, {
        accountId,
        type: data.type,
        amount: Number(data.amount),
        date: data.date,
        note: data.note || "",
      });
      navigate(`/bank/BankTransaction/Index/${accountId}`);
    } catch (err) {
      setSubmitError(err.message || "Failed to update transaction");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="  mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to={`/bank/BankTransaction/Index/${accountId}`} className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Transactions
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Edit Bank Transaction</h2>
          <p className="text-foreground mt-1">Update the details below to edit this transaction</p>
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
              <label className="block text-sm font-medium text-foreground mb-1">Account Number</label>
              <input
                type="text"
                readOnly
                value={accountNo}
                className="w-full px-3 py-2.5 border border-border rounded-lg bg-muted text-foreground"
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
            <div>
              <FormInput
                label="Particulars"
                name="note"
                register={register}
                rules={{ required: "Particulars are required" }}
                errors={errors}
              />
            </div>
            <div>
              <FormInput
                label="Amount"
                name="amount"
                type="number"
                step="0.01"
                register={register}
                rules={{
                  required: "Amount is required",
                  min: {
                    value: 0.01,
                    message: "Amount must be greater than 0",
                  },
                }}
                errors={errors}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to={`/bank/BankTransaction/Index/${accountId}`} className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2">
              Close
            </Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankTransactionIndexByIdEdit;
