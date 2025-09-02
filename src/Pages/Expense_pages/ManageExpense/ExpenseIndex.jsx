import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const ExpenseIndex = () => {
  const expenseData = [
    {
      ID: 1,
      expenseHeadName: "Staff Bazar",
      amount: 300.0,
      note: "sagdf, hasgdas",
      date: "06/11/2022",
    },
    {
      ID: 2,
      expenseHeadName: "Staff Bazar",
      amount: 500.0,
      note: "Hilsha fish",
      date: "19/01/2023",
    },
  ];

  const columns = [
    {
      header: "SL No",
      accessor: "ID",
    },
    {
      header: "Expense Head Name",
      accessor: "expenseHeadName",
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (row) => row.amount.toFixed(2),
    },
    {
      header: "Note",
      accessor: "note",
      render: (row) => row.note || <span className="text-gray-400">-</span>,
    },
    {
      header: "Date",
      accessor: "date",
    },
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-blue-600 hover:text-blue-900",
      render: (row) => (
        <Link
          to={`/expense/Expense/Edit/${row.ID}`}
          className="flex items-center space-x-1"
        >
          <FaEdit className="inline mr-1" />
          <span>Edit</span>
        </Link>
      ),
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-red-600 hover:text-red-900",
      onClick: (row) => console.log("Delete:", row),
      render: (row) => (
        <button
          className="flex items-center space-x-1"
          onClick={() => console.log("Delete:", row)}
        >
          <FaTrash className="inline mr-1" />
          <span>Delete</span>
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Expense Records
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your organization's expense records
          </p>
        </div>
        <Link to="Create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlus className="mr-2" />
            Create New Expense
          </button>
        </Link>
      </div>

      <ReusableTable
        columns={columns}
        data={expenseData}
        actions={actions}
        className="mt-6"
      />

      {expenseData.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No expense records found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating a new expense record
          </p>
          <Link to="Create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Create New Expense
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExpenseIndex;
