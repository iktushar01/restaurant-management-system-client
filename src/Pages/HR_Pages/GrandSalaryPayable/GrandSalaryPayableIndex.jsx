import React from "react";
import { FaFileExport, FaPrint } from "react-icons/fa";

const GrandSalaryPayableIndex = () => {
  // Sample data matching your screenshot structure
  const salaryData = [
    {
      employeeName: "ADMIN",
      salaryPayable: 2343.0,
      salaryPaid: 10269.0,
      due: -7926.0,
    },
  ];

  // Calculate totals
  const totals = {
    salaryPayable: salaryData.reduce(
      (sum, item) => sum + item.salaryPayable,
      0
    ),
    salaryPaid: salaryData.reduce((sum, item) => sum + item.salaryPaid, 0),
    due: salaryData.reduce((sum, item) => sum + item.due, 0),
  };

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Grand Salary Payable
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            View summary of salary payable, paid, and due amounts
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
            <FaFileExport className="mr-2" />
            Export
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-red-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
            <FaPrint className="mr-2" />
            Print
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-yellow-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Salary Payable
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Salary Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Due
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salaryData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.employeeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.salaryPayable.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.salaryPaid.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={
                        item.due < 0
                          ? "text-red-600 font-medium"
                          : "text-green-600 font-medium"
                      }
                    >
                      {item.due.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr className="border-t-2 border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  Total Salary Payable
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {totals.salaryPayable.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"></td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  Total Salary Paid
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {totals.salaryPaid.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"></td>
              </tr>
              <tr className="border-b-2 border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  Total Salary Due
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                  <span
                    className={
                      totals.due < 0 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {totals.due.toFixed(2)}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {salaryData.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No salary records found
          </h3>
          <p className="text-gray-500 mb-6">
            There are no salary records to display
          </p>
        </div>
      )}
    </div>
  );
};

export default GrandSalaryPayableIndex;
