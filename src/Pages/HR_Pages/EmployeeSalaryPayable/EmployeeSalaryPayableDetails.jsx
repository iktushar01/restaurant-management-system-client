import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { hrService } from "../../../services/hrService";

const getCurrentMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    from: start.toISOString().slice(0, 10),
    to: end.toISOString().slice(0, 10),
    label: `${start.toLocaleString("en-US", { month: "long" })} ${now.getFullYear()}`,
  };
};

const EmployeeSalaryPayableDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [basic, setBasic] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const monthRange = useMemo(() => getCurrentMonthRange(), []);

  useEffect(() => {
    const params = { limit: 100, from: monthRange.from, to: monthRange.to };
    Promise.all([
      hrService.employees.getById(employeeId),
      hrService.basicSalaries.getAll(employeeId, params),
      hrService.earnings.getAll(employeeId, params),
      hrService.deductions.getAll(employeeId, params),
      hrService.salaryPayments.getAll(employeeId, params),
    ])
      .then(([employeeRes, basicRes, earningsRes, deductionsRes, paymentsRes]) => {
        setEmployee(employeeRes.data);
        setBasic(
          (basicRes.data || []).map((item, index) => ({
            id: item.id || index + 1,
            particular: item.note || item.particular || "Basic Salary",
            amount: Number(item.amount) || 0,
          }))
        );
        setAllowances(
          (earningsRes.data || []).map((item, index) => ({
            id: item.id || index + 1,
            particular: item.earningHeading || item.headName || item.note || "Allowance",
            amount: Number(item.amount) || 0,
          }))
        );
        setDeductions(
          (deductionsRes.data || []).map((item, index) => ({
            id: item.id || index + 1,
            particular: item.deductionHeading || item.headName || item.note || "Deduction",
            amount: Number(item.amount) || 0,
          }))
        );
        setPayments(
          (paymentsRes.data || []).map((item, index) => ({
            id: item.id || index + 1,
            particular: item.note || item.particular || "Payment",
            amount: Number(item.amount) || 0,
          }))
        );
      })
      .catch((err) => setError(err.message || "Failed to load salary details"))
      .finally(() => setLoading(false));
  }, [employeeId, monthRange.from, monthRange.to]);

  const totalBasic = basic.reduce((sum, item) => sum + item.amount, 0);
  const totalAllowances = allowances.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  const totalPaid = payments.reduce((sum, item) => sum + item.amount, 0);
  const netPayable = totalBasic + totalAllowances - totalDeductions;
  const due = netPayable - totalPaid;

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

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
            Employee Salary Details for {employee?.name || "Employee"} — {monthRange.label}
          </h2>
          <p className="text-gray-700 mt-1">
            View all salary transactions for this month
          </p>
          {error && (
            <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
          )}
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Salary Basic</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">SL No</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Particular</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {basic.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">{item.particular}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">€{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300"></td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">Total</td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">€{totalBasic.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Allowance</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">SL No</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Particular</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {allowances.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">{item.particular}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">€{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300"></td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">Total</td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">€{totalAllowances.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Net Payable</h3>
              <p className="text-xl font-bold text-blue-600">€ {netPayable.toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Deduction</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">SL No</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Particular</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {deductions.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">{item.particular}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">€{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300"></td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">Total</td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">€{totalDeductions.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Salary Paid</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">SL No</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Particular</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">{item.particular}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">€{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300"></td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">Total</td>
                    <td className="px-4 py-2 text-sm text-gray-900 border border-gray-300">€{totalPaid.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800">Total Paid</h3>
                <p className="text-xl font-bold text-green-600">€ {totalPaid.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800">Due</h3>
                <p className="text-xl font-bold text-red-600">€ {due.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalaryPayableDetails;
