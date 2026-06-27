import React, { useEffect, useMemo, useState } from "react";
import { formatMoney } from "@/lib/currency";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { financeService } from "../../../services/financeService";

const parseRouteDate = (day, month, year) => {
  const display = `${day}/${month}/${year}`;
  const isoFrom = `${year}-${month}-${day}T00:00:00.000Z`;
  const isoTo = `${year}-${month}-${day}T23:59:59.999Z`;
  return { display, isoFrom, isoTo };
};

const DailyExpenseDetails = () => {
  const { day, month, year } = useParams();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { display, isoFrom, isoTo } = useMemo(
    () => parseRouteDate(day, month, year),
    [day, month, year]
  );

  useEffect(() => {
    financeService.expenseEntries.getAll({ from: isoFrom, to: isoTo, limit: 100 })
      .then((res) => setEntries(res.data || []))
      .catch((err) => setError(err.message || "Failed to load expense details"))
      .finally(() => setLoading(false));
  }, [isoFrom, isoTo]);

  const totalExpense = entries.reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="  mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/expense/daily-expense" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Daily Expense
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Expense Details for {display}</h2>
          <p className="text-foreground mt-1">View all expense transactions for this date</p>
        </div>

        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/40">
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">SL No</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Expense Head Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((transaction, index) => (
                      <tr key={transaction.id} className="border-b border-border hover:bg-muted/40">
                        <td className="px-4 py-3 text-sm text-foreground">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{transaction.expenseHeadName}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{formatMoney(transaction.amount)}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{transaction.note || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {entries.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No transactions for this date</p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-foreground">Total Expense</h3>
                  <p className="text-xl font-bold text-destructive">{formatMoney(totalExpense)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyExpenseDetails;
