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

const DailyIncomeDetails = () => {
  const { day, month, year } = useParams();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { display, isoFrom, isoTo } = useMemo(
    () => parseRouteDate(day, month, year),
    [day, month, year]
  );

  useEffect(() => {
    financeService.incomeEntries.getAll({ from: isoFrom, to: isoTo, limit: 100 })
      .then((res) => setEntries(res.data || []))
      .catch((err) => setError(err.message || "Failed to load income details"))
      .finally(() => setLoading(false));
  }, [isoFrom, isoTo]);

  const totalIncome = entries.reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="  mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/income/daily-income" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Daily Income
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Income Details for {display}</h2>
          <p className="text-foreground mt-1">View all income transactions for this date</p>
        </div>

        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : (
            <>
              <div className="space-y-4">
                {entries.map((transaction) => (
                  <div key={transaction.id} className="bg-muted/40 rounded-lg p-4 border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Income Head</p>
                        <p className="font-medium">{transaction.incomeHeadName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Amount</p>
                        <p className="font-medium">{formatMoney(transaction.amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Note</p>
                        <p className="font-medium">{transaction.note || "-"}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {entries.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No transactions for this date</p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-foreground">Total Income</h3>
                  <p className="text-xl font-bold text-success">{formatMoney(totalIncome)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyIncomeDetails;
