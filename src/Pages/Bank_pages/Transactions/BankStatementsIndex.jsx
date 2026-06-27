import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import FormInput from "../../../Shared/FormInput/FromInput";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { bankService } from "../../../services/bankService";

const BankStatementsIndex = () => {
  const { id: accountId } = useParams();
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statement, setStatement] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitting(true);
    setStatement(null);
    try {
      const res = await bankService.statements.get({
        accountId,
        from: data.startDate,
        to: data.endDate,
      });
      setStatement(res.data);
    } catch (err) {
      setSubmitError(err.message || "Failed to generate statement");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { header: "SL No", accessor: "ID" },
    { header: "Date", accessor: "date" },
    {
      header: "Type",
      accessor: "type",
      render: (row) => (row.type === "DEPOSIT" ? "Deposit" : "Withdraw"),
    },
    { header: "Particulars", accessor: "note" },
    {
      header: "Deposit",
      accessor: "deposit",
      render: (row) => (row.deposit > 0 ? row.deposit.toFixed(2) : "-"),
    },
    {
      header: "Withdrawn",
      accessor: "withdrawn",
      render: (row) => (row.withdrawn > 0 ? row.withdrawn.toFixed(2) : "-"),
    },
    {
      header: "Balance",
      accessor: "balance",
      render: (row) => row.balance.toFixed(2),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/bank/BankAccountInfo/Index" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Bank Info
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Bank Statement</h2>
          <p className="text-foreground mt-1">Select date range to generate bank statement</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <FormInput
                label="Start Date"
                type="date"
                name="startDate"
                register={register}
                rules={{ required: "Start date is required" }}
                errors={errors}
              />
            </div>
            <div>
              <FormInput
                label="End Date"
                type="date"
                name="endDate"
                register={register}
                rules={{ required: "End date is required" }}
                errors={errors}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/bank/BankAccountInfo/Index" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2">
              Close
            </Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer disabled:opacity-60">
              {submitting ? "Generating..." : "Generate Statement"}
            </button>
          </div>
        </form>
      </div>

      {statement && (
        <div className="mt-8 space-y-6">
          <div className="bg-muted/40 border border-gray-100 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-foreground">Account Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-muted-foreground">Bank Name</div>
                <div className="text-sm font-semibold text-foreground">{statement.account.bankName}</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-muted-foreground">Branch Name</div>
                <div className="text-sm font-semibold text-foreground">{statement.account.branchName}</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-muted-foreground">Account No</div>
                <div className="text-sm font-semibold text-foreground">{statement.account.accountNo}</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-muted-foreground">Account Name</div>
                <div className="text-sm font-semibold text-foreground">{statement.account.accountName}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Opening Balance</p>
              <p className="text-lg font-semibold text-foreground">{statement.summary.openingBalance.toFixed(2)}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Deposits</p>
              <p className="text-lg font-semibold text-success">{statement.summary.totalDeposits.toFixed(2)}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Withdrawals</p>
              <p className="text-lg font-semibold text-destructive">{statement.summary.totalWithdrawals.toFixed(2)}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Closing Balance</p>
              <p className="text-lg font-semibold text-foreground">{statement.summary.closingBalance.toFixed(2)}</p>
            </div>
          </div>

          <ReusableTable columns={columns} data={statement.transactions} />
        </div>
      )}
    </div>
  );
};

export default BankStatementsIndex;
