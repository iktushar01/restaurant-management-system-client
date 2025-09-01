import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const EmployeeSalaryPayableIndex = () => {
  // Sample data matching your screenshot structure
  const employeeSalaryData = [
    {
      ID: 1,
      employeeName: "ADMIN",
      month: "January",
      year: 2025,
      netPayable: -1080.00,
    }
  ];

  const columns = [
    {
      header: "SL No",
      accessor: "ID",
    },
    {
      header: "Employee Name",
      accessor: "employeeName",
    },
    {
      header: "Month",
      accessor: "month",
    },
    {
      header: "Year",
      accessor: "year",
    },
    {
      header: "Net Payable",
      accessor: "netPayable",
      render: (row) => (
        <span className={row.netPayable < 0 ? "text-red-600" : "text-green-600"}>
          {row.netPayable.toFixed(2)}
        </span>
      ),
    },
    {
      header: "Details",
      accessor: "actions",
      render: (row) => (
        <Link
          to={`/payroll/employee-salary/details/${row.ID}`}
          className="text-blue-600 hover:text-blue-900 font-medium"
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
            Employee Salary Payable
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            View and manage employee salary payable records
          </p>
        </div>
       
      </div>

      {employeeSalaryData.length > 0 ? (
        <ReusableTable
          columns={columns}
          data={employeeSalaryData}
          className="mt-6"
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No salary records found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by adding a new salary record
          </p>
          <Link to="create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Add New Record
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmployeeSalaryPayableIndex;