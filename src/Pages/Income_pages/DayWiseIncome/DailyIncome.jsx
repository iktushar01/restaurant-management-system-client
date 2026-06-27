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

const DailyIncome = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    financeService.incomeEntries.getAll({ limit: 500 })
      .then((res) => setEntries(res.data || []))
      .catch((err) => setError(err.message || "Failed to load income data"))
      .finally(() => setLoading(false));
  }, []);

  const dailyIncomeData = useMemo(() => {
    const grouped = entries.reduce((acc, entry) => {
      const { key, display, path } = formatDateKey(entry.dateISO);
      if (!acc[key]) acc[key] = { date: display, path, totalIncome: 0 };
      acc[key].totalIncome += Number(entry.amount);
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
    { header: "Total Income", accessor: "totalIncome", render: (row) => Number(row.totalIncome).toFixed(2) },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <Link to={`/income/daily-income/details/${row.path}`} className="text-blue-600 hover:text-blue-900">
          Details
        </Link>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Day Wise Total Others Income</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">View daily summary of other income</p>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
      {loading ? <div className="text-center py-12 text-gray-500">Loading...</div> : (
        <ReusableTable columns={columns} data={dailyIncomeData} className="mt-6" />
      )}

      {!loading && dailyIncomeData.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No income records found</h3>
          <p className="text-gray-500">Create income records to see daily summaries</p>
        </div>
      )}
    </div>
  );
};

export default DailyIncome;
