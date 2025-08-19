import React from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const DailyIncomeDetails = () => {
  const { date } = useParams();

  // Sample data - replace with actual API data
  const transactions = [
    {
      date: 12 / 34 / 343,
      incomeHeadName: "WERWER",
      amount: 300.0,
      note: "Hillsha fish",
    },
  ];

  // Calculate total income
  const totalIncome = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/income/daily-income"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Daily Income
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Income Details for 12/08/2025{date}
          </h2>
          {/* ===============================================
          here need to fix date
          =============================================== */}
          <p className="text-gray-700 mt-1">
            View all income transactions for this date
          </p>
        </div>

        <div className="p-6">
          {/* Transaction Cards */}
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Income Head
                    </p>
                    <p className="font-medium">{transaction.incomeHeadName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Amount</p>
                    <p className="font-medium">
                      ${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Note</p>
                    <p className="font-medium">{transaction.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Income Section */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Total Income</h3>
              <p className="text-xl font-bold text-green-600">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyIncomeDetails;
