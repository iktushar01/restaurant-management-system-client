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
    return <div className="p-6 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/hr/salary-payable/Index"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Salary Payable
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary/10 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Employee Salary Details for {employee?.name || "Employee"} — {monthRange.label}
          </h2>
          <p className="text-foreground mt-1">
            View all salary transactions for this month
          </p>
          {error && (
            <div className="mt-3 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>
          )}
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Salary Basic</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">SL No</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">Particular</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {basic.map((item, index) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/40">
                      <td className="px-4 py-2 text-sm text-foreground border border-border">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-foreground border border-border">{item.particular}</td>
                      <td className="px-4 py-2 text-sm text-foreground border border-border">€{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/40 font-medium">
                    <td className="px-4 py-2 text-sm text-foreground border border-border"></td>
                    <td className="px-4 py-2 text-sm text-foreground border border-border">Total</td>
                    <td className="px-4 py-2 text-sm text-foreground border border-border">€{totalBasic.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Allowance</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">SL No</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">Particular</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {allowances.map((item, index) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/40">
                      <td className="px-4 py-2 text-sm text-foreground border border-border">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-foreground border border-border">{item.particular}</td>
                      <td className="px-4 py-2 text-sm text-foreground border border-border">€{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/40 font-medium">
                    <td className="px-4 py-2 text-sm text-foreground border border-border"></td>
                    <td className="px-4 py-2 text-sm text-foreground border border-border">Total</td>
                    <td className="px-4 py-2 text-sm text-foreground border border-border">€{totalAllowances.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-foreground">Net Payable</h3>
              <p className="text-xl font-bold text-primary">€ {netPayable.toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Deduction</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">SL No</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">Particular</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {deductions.map((item, index) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/40">
                      <td className="px-4 py-2 text-sm text-foreground border border-border">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-foreground border border-border">{item.particular}</td>
                      <td className="px-4 py-2 text-sm text-foreground border border-border">€{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/40 font-medium">
                    <td className="px-4 py-2 text-sm text-foreground border border-border"></td>
                    <td className="px-4 py-2 text-sm text-foreground border border-border">Total</td>
                    <td className="px-4 py-2 text-sm text-foreground border border-border">€{totalDeductions.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3">Salary Paid</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">SL No</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">Particular</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground border border-border">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((item, index) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/40">
                      <td className="px-4 py-2 text-sm text-foreground border border-border">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-foreground border border-border">{item.particular}</td>
                      <td className="px-4 py-2 text-sm text-foreground border border-border">€{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/40 font-medium">
                    <td className="px-4 py-2 text-sm text-foreground border border-border"></td>
                    <td className="px-4 py-2 text-sm text-foreground border border-border">Total</td>
                    <td className="px-4 py-2 text-sm text-foreground border border-border">€{totalPaid.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <h3 className="text-lg font-bold text-foreground">Total Paid</h3>
                <p className="text-xl font-bold text-success">€ {totalPaid.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h3 className="text-lg font-bold text-foreground">Due</h3>
                <p className="text-xl font-bold text-destructive">€ {due.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalaryPayableDetails;
