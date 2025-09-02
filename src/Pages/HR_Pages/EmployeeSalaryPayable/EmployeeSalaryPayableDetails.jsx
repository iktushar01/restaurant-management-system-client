import React from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const EmployeeSalaryPayableDetails = () => {
  const { date } = useParams();

  // Sample data for salary details
  const salaryData = {
    basic: [
      { id: 1, particular: "Basic Salary", amount: 0 },
    ],
    allowances: [
      { id: 1, particular: "House Rent Allowance", amount: 0 },
      { id: 2, particular: "Conveyance Allowance", amount: 0 },
      { id: 3, particular: "Medical Allowance", amount: 0 },
    ],
    deductions: [
      { id: 1, particular: "Tax Deduction", amount: 0 },
      { id: 2, particular: "Provident Fund", amount: 0 },
    ],
    payments: [
      { id: 1, particular: "shelf", amount: 3423.00 },
      { id: 2, particular: "shelf", amount: 3423.00 },
    ]
  };

  // Calculate totals
  const totalBasic = salaryData.basic.reduce((sum, item) => sum + item.amount, 0);
  const totalAllowances = salaryData.allowances.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = salaryData.deductions.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = salaryData.payments.reduce((sum, item) => sum + item.amount, 0);
  const netPayable = totalBasic + totalAllowances;
  const due = netPayable - totalPaid;

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/hr/salary-payable/Index"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Salary Payable
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Employee Salary Details for {date || "January 2025"}
          </h2>
          <p className="text-gray-700 mt-1">
            View all salary transactions for this month
          </p>
        </div>

        <div className="p-6">
          {/* Salary Basic Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Salary Basic</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      SL No
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      Particular
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.basic.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        {item.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        {item.particular}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        €{item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300"></td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                      Total
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                      €{totalBasic.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Allowance Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Allowance</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      SL No
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      Particular
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.allowances.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        {item.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        {item.particular}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        €{item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300"></td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                      Total
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                      €{totalAllowances.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Net Payable Section */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Net Payable</h3>
              <p className="text-xl font-bold text-blue-600">
                € {netPayable.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Deduction Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Deduction</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      SL No
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      Particular
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.deductions.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        {item.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        {item.particular}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        €{item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300"></td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                      Total
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                      €{totalDeductions.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Salary Paid Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Salary Paid</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      SL No
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      Particular
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salaryData.payments.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        {item.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        {item.particular}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                        €{item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300"></td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                      Total
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">
                      €{totalPaid.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Paid and Due Section */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800">Total Paid</h3>
                <p className="text-xl font-bold text-green-600">
                  € {totalPaid.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800">Due</h3>
                <p className="text-xl font-bold text-red-600">
                  € {due.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalaryPayableDetails;