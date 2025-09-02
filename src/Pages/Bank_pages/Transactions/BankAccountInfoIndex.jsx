import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaExchangeAlt,
  FaFileAlt,
} from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const BankAccountInfoIndex = () => {
  const bankAccounts = [
    {
      ID: 1,
      accountName: "kHANDANI",
      accountNo: "15141",
      bankName: "DBBL",
      branchName: "Hallshahar",
      note: "",
    },
  ];

  const columns = [
    {
      header: "SL No",
      accessor: "ID",
    },
    {
      header: "Account Name",
      accessor: "accountName",
    },
    {
      header: "Account No",
      accessor: "accountNo",
    },
    {
      header: "Bank Name",
      accessor: "bankName",
    },
    {
      header: "Branch Name",
      accessor: "branchName",
    },
    {
      header: "Note",
      accessor: "note",
      render: (row) =>
        row.note ? (
          row.note
        ) : (
          <span className="text-gray-400">Not specified</span>
        ),
    },
    {
      header: "Transaction",
      accessor: "transaction",
      render: (row) => (
        <Link
          to={`/bank/BankTransaction/Index/${row.ID}`}
          className="flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors bg-gray-100 p-2 rounded-2xl"
          title="Bank Transaction"
        >
          <FaExchangeAlt />
          <span className="ml-2 hidden sm:inline">Transaction</span>
        </Link>
      ),
    },
    {
      header: "Statements",
      accessor: "statements",
      render: (row) => (
        <Link
          to={`/bank/BankStatements/Index/${row.ID}`}
          className="flex items-center justify-center text-green-600 hover:text-green-800 transition-colors bg-gray-200 p-2 rounded-2xl"
          title="Statements"
        >
          <FaFileAlt />
          <span className="ml-2 hidden sm:inline">Statements</span>
        </Link>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex items-center justify-center space-x-3">
          {/* Edit Button */}
          <Link
            to={`/bank/BankAccountInfo/Index/Edit/${row.ID}`}
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
            title="Edit"
          >
            <div className="flex items-center gap-2">
              <FaEdit />
              <span className="hidden sm:inline">Edit</span>
            </div>
          </Link>

          {/* Delete Button */}
          <button
            onClick={() => console.log("Delete:", row)}
            className="text-rose-600 hover:text-rose-800 transition-colors"
            title="Delete"
          >
            <div className="flex items-center gap-2">
              <FaTrash />
              <span className="hidden sm:inline">Delete</span>
            </div>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-6xl min-h-screen mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Bank Account Info
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

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <ReusableTable
          columns={columns}
          data={bankAccounts}
          emptyState={
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No bank accounts found
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by creating a new bank account
              </p>
              <Link to="Create">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 inline-flex items-center">
                  <FaPlus className="mr-2" />
                  Create Bank Account
                </button>
              </Link>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default BankAccountInfoIndex;
