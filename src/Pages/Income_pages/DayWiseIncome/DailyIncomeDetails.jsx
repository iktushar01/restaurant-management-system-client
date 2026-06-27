import React, { useEffect, useMemo, useState } from "react";
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
    <div className="max-w-6xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/income/daily-income" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Daily Income
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Income Details for {display}</h2>
          <p className="text-gray-700 mt-1">View all income transactions for this date</p>
        </div>

        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : (
            <>
              <div className="space-y-4">
                {entries.map((transaction) => (
                  <div key={transaction.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Income Head</p>
                        <p className="font-medium">{transaction.incomeHeadName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Amount</p>
                        <p className="font-medium">{Number(transaction.amount).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Note</p>
                        <p className="font-medium">{transaction.note || "-"}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {entries.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No transactions for this date</p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">Total Income</h3>
                  <p className="text-xl font-bold text-green-600">{totalIncome.toFixed(2)}</p>
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
