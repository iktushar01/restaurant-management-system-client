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
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/bank/BankAccountInfo/Index" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Bank Info
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Bank Statement</h2>
          <p className="text-gray-700 mt-1">Select date range to generate bank statement</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}
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
            <Link to="/bank/BankAccountInfo/Index" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
              Close
            </Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer disabled:opacity-60">
              {submitting ? "Generating..." : "Generate Statement"}
            </button>
          </div>
        </form>
      </div>

      {statement && (
        <div className="mt-8 space-y-6">
          <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Account Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-500">Bank Name</div>
                <div className="text-sm font-semibold text-gray-700">{statement.account.bankName}</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-500">Branch Name</div>
                <div className="text-sm font-semibold text-gray-700">{statement.account.branchName}</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-500">Account No</div>
                <div className="text-sm font-semibold text-gray-700">{statement.account.accountNo}</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-500">Account Name</div>
                <div className="text-sm font-semibold text-gray-700">{statement.account.accountName}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500">Opening Balance</p>
              <p className="text-lg font-semibold text-gray-800">{statement.summary.openingBalance.toFixed(2)}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500">Total Deposits</p>
              <p className="text-lg font-semibold text-green-600">{statement.summary.totalDeposits.toFixed(2)}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500">Total Withdrawals</p>
              <p className="text-lg font-semibold text-red-600">{statement.summary.totalWithdrawals.toFixed(2)}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500">Closing Balance</p>
              <p className="text-lg font-semibold text-gray-800">{statement.summary.closingBalance.toFixed(2)}</p>
            </div>
          </div>

          <ReusableTable columns={columns} data={statement.transactions} />
        </div>
      )}
    </div>
  );
};

export default BankStatementsIndex;
