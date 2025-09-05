import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaClock, FaPlay, FaStop } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const WorkPeriodPage = () => {
  const workPeriods = [
    { 
      ID: 1, 
      startDate: "15/08/2025 10:46:21", 
      endDate: "", 
      openingCash: "234234.00", 
      totalSale: "2895.00", 
      discount: "0.00", 
      cashPayment: "1120.00", 
      cardPayment: "0", 
      totalPaid: "1120.00", 
      onTheHouse: "0", 
      closingCash: "",
      status: "Active" 
    },
  ];

  const columns = [
    {
      header: "Sl No",
      accessor: "ID",
    },
    {
      header: "Start date",
      accessor: "startDate",
    },
    {
      header: "End Date",
      accessor: "endDate",
      render: (row) => row.endDate || "-",
    },
    {
      header: "Opening Cash",
      accessor: "openingCash",
    },
    {
      header: "Total Sale",
      accessor: "totalSale",
    },
    {
      header: "Discount",
      accessor: "discount",
    },
    {
      header: "Cash Payment",
      accessor: "cashPayment",
    },
    {
      header: "Card Payment",
      accessor: "cardPayment",
    },
    {
      header: "Total Paid",
      accessor: "totalPaid",
    },
    {
      header: "On The House",
      accessor: "onTheHouse",
    },
    {
      header: "Closing Cash",
      accessor: "closingCash",
      render: (row) => row.closingCash || "-",
    }
  ];

  return (
    <div className="p-6 max-w-7xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
            <FaClock className="mr-3 text-amber-500" />
            Recent Work Periods
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your restaurant's work periods and shifts
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlay className="mr-2" />
            Start Work Period
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaStop className="mr-2" />
            End Work Period
          </button>
        </div>
      </div>

      {/* ✅ Reusable Table */}
      <ReusableTable columns={columns} data={workPeriods} />

      {workPeriods.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <FaClock className="text-amber-500 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No work periods found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating a new work period
          </p>
          <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-medium rounded-lg hover:from-amber-500 hover:to-amber-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
            <FaPlus className="mr-2" />
            Start Work Period
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkPeriodPage;