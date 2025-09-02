import React from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const DailyExpenseDetails = () => {
  const { date } = useParams();

  // Sample data - replace with actual API data
  const transactions = [
    {
      ID: 1,
      expenseHeadName: "Staff Bazar",
      amount: 300.0,
      note: "sagdf, haggdas",
    },
  ];

  // Calculate total expense
  const totalExpense = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/expense/daily-expense"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Daily Expense
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Expense Details for {date || "06/11/2022"}
          </h2>
          <p className="text-gray-700 mt-1">
            View all expense transactions for this date
          </p>
        </div>

        <div className="p-6">
          {/* Transaction Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                    SL No
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                    Expense Head Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    key={transaction.ID}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {transaction.ID}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {transaction.expenseHeadName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {transaction.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Expense Section */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Total Expense</h3>
              <p className="text-xl font-bold text-red-600">
                $ {totalExpense.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyExpenseDetails;
