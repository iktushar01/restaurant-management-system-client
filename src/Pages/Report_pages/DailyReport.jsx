import React, { useState } from "react";
import { FaSearch, FaFilePdf, FaMoneyBillWave, FaCreditCard, FaReceipt, FaChartLine, FaMoneyCheckAlt } from "react-icons/fa";

const DailyStatement = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-blue-100 p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-800">Daily Statement</h1>
          <p className="text-gray-600 mt-2">Track your daily sales and financial performance</p>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter Statement</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full shadow-md">
                <FaSearch className="mr-2" />
                Search
              </button>
            </div>
            <div className="flex flex-col justify-end">
              <button className="flex items-center justify-center bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-colors w-full shadow-md">
                <FaFilePdf className="mr-2" />
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Sales Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <FaChartLine className="mr-2 text-blue-500" />
            Sales Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-100">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <FaReceipt className="text-blue-600" />
                </div>
                <p className="text-gray-600">Food Sale Price</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl border border-green-100">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <FaMoneyBillWave className="text-green-600" />
                </div>
                <p className="text-gray-600">Paid Through Cash</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-100">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <FaCreditCard className="text-purple-600" />
                </div>
                <p className="text-gray-600">Paid Through Card</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-100">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <FaMoneyCheckAlt className="text-amber-600" />
                </div>
                <p className="text-gray-600">Total Price</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
          </div>
        </div>

        {/* Charges & Discount */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Charges & Discount</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">VAT</span>
                <span className="font-medium text-gray-800">0</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">SC</span>
                <span className="font-medium text-gray-800">0</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium text-gray-800">0</span>
              </div>
            </div>
          </div>

          {/* Income vs Expense */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Financial Summary</h2>
            <div className="space-y-5">
              <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Total Income</h3>
                <div className="flex justify-between items-center">
                  <span className="text-green-600">Total Income</span>
                  <span className="text-2xl font-bold text-green-700">0</span>
                </div>
              </div>
              
              <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Total Expense</h3>
                <div className="flex justify-between items-center">
                  <span className="text-red-600">Total Expense</span>
                  <span className="text-2xl font-bold text-red-700">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Balance */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Total Balance</h2>
          <p className="text-4xl font-bold text-white">0</p>
        </div>
      </div>
    </div>
  );
};

export default DailyStatement;