import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const DailyIncome = () => {
  const dailyIncomeData = [
    {
      ID: 1,
      date: "12/08/2025",
      totalIncome: 34534.0,
    }
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
      header: "Total Income",
      accessor: "totalIncome",
      render: (row) => row.totalIncome.toFixed(2),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <Link
          to={`/income/daily-income/details/${row.date}`}
          className="text-blue-600 hover:text-blue-900"
        >
          Details
        </Link>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Day Wise Total Others Income
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            View daily summary of other income
          </p>
        </div>
      </div>

      <ReusableTable
        columns={columns}
        data={dailyIncomeData}
        className="mt-6"
      />

      {dailyIncomeData.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No income records found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating a new income record
          </p>
          <Link to="Create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Create New Income
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DailyIncome;
