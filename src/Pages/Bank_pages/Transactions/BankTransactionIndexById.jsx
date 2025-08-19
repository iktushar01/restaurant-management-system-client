import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const BankTransactionIndexById = () => {
  const bankAccountDetails = {
    bankName: "DBBL",
    branchName: "Halishahar",
    accountNo: "15141",
    printDate: "19 Aug, 2025 07:54 AM",
  };

  const transactions = [
    {
      ID: 1,
      date: "12/08/2025",
      transactionType: "Deposit",
      particulars: "WR23R23R23R",
      deposit: 23.0,
      withdrawn: 0.0,
      balance: 23.0,
    },
  ];

  const columns = [
    {
      header: "SL No",
      accessor: "ID",
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Transaction Type",
      accessor: "transactionType",
    },
    {
      header: "Particulars",
      accessor: "particulars",
    },
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
    {
      header: "Actions",
      accessor: "actions",
      render: () => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-900">
            <FaEdit className="inline mr-1" /> Edit
          </button>
          <button className="text-red-600 hover:text-red-900">
            <FaTrash className="inline mr-1" /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      {/* Account Details - Modern Version */}
      <div className="mt-6 bg-gray-50 border border-gray-100 rounded-xl shadow-xs overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Account Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          <div className="flex items-center">
            <div className="w-32 text-sm font-medium text-gray-500">
              Bank Name
            </div>
            <div className="text-sm font-semibold text-gray-700">
              {bankAccountDetails.bankName}
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-32 text-sm font-medium text-gray-500">
              Branch Name
            </div>
            <div className="text-sm font-semibold text-gray-700">
              {bankAccountDetails.branchName}
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-32 text-sm font-medium text-gray-500">
              Account No
            </div>
            <div className="text-sm font-semibold text-gray-700">
              {bankAccountDetails.accountNo}
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-32 text-sm font-medium text-gray-500">
              Last Updated
            </div>
            <div className="text-sm font-semibold text-gray-700">
              {bankAccountDetails.printDate}
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gray-50 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Bank Transactions
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your organization's bank account information
          </p>
        </div>

        <Link to="Create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlus className="mr-2" />
            Create New
          </button>
        </Link>
      </div>

      {/* Transactions Table */}
      <ReusableTable columns={columns} data={transactions} className="mt-6" />

      {/* Empty State */}
      {transactions.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No transactions found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating a new transaction
          </p>
          <Link to="Create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Create Transaction
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BankTransactionIndexById;
