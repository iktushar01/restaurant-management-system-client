import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { financeService } from "../../../services/financeService";

const formatDateKey = (dateISO) => {
  const d = new Date(dateISO);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return { key: `${day}/${month}/${year}`, display: `${day}/${month}/${year}`, path: `${day}/${month}/${year}` };
};

const DailyExpense = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    financeService.expenseEntries.getAll({ limit: 500 })
      .then((res) => setEntries(res.data || []))
      .catch((err) => setError(err.message || "Failed to load expense data"))
      .finally(() => setLoading(false));
  }, []);

  const dailyExpenseData = useMemo(() => {
    const grouped = entries.reduce((acc, entry) => {
      const { key, display, path } = formatDateKey(entry.dateISO);
      if (!acc[key]) acc[key] = { date: display, path, totalExpense: 0 };
      acc[key].totalExpense += Number(entry.amount);
      return acc;
    }, {});
    return Object.values(grouped)
      .sort((a, b) => {
        const [da, ma, ya] = a.date.split("/").map(Number);
        const [db, mb, yb] = b.date.split("/").map(Number);
        return new Date(yb, mb - 1, db) - new Date(ya, ma - 1, da);
      })
      .map((row, i) => ({ ID: i + 1, ...row }));
  }, [entries]);

  const columns = [
    { header: "SL No", accessor: "ID" },
    { header: "Date", accessor: "date" },
    { header: "Total Expense", accessor: "totalExpense", render: (row) => Number(row.totalExpense).toFixed(2) },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <Link to={`/expense/daily-expense/details/${row.path}`} className="text-primary hover:text-primary/80">
          Details
        </Link>
      ),
    },
  ];

  return (
    <div className="p-6   mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-muted/40 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Day Wise Total Expense</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">View daily summary of expenses</p>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
      {loading ? <div className="text-center py-12 text-muted-foreground">Loading...</div> : (
        <ReusableTable columns={columns} data={dailyExpenseData} className="mt-6" />
      )}

      {!loading && dailyExpenseData.length === 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">No expense records found</h3>
          <p className="text-muted-foreground">Create expense records to see daily summaries</p>
        </div>
      )}
    </div>
  );
};

export default DailyExpense;
