import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaClock, FaPlay, FaStop } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { workPeriodService } from "../../../services/workPeriodService";

const WorkPeriodPage = () => {
  const [workPeriods, setWorkPeriods] = useState([]);
  const [activePeriod, setActivePeriod] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [listRes, activeRes] = await Promise.all([
        workPeriodService.getAll({ page: 1, limit: 20 }),
        workPeriodService.getActive(),
      ]);
      setWorkPeriods(listRes.data || []);
      setActivePeriod(activeRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleStart = async () => {
    const cash = prompt("Opening cash amount:", "0");
    if (cash === null) return;
    try {
      await workPeriodService.open(Number(cash) || 0);
      fetchData();
    } catch (err) {
      alert(err.message || "Failed to start work period");
    }
  };

  const handleEnd = async () => {
    if (!activePeriod) {
      alert("No active work period to close");
      return;
    }
    const cash = prompt("Closing cash amount:", "0");
    if (cash === null) return;
    try {
      await workPeriodService.close(activePeriod.id, Number(cash) || 0);
      fetchData();
    } catch (err) {
      alert(err.message || "Failed to close work period");
    }
  };

  const columns = [
    { header: "Sl No", accessor: "ID", render: (row, idx) => idx + 1 },
    { header: "Start date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate", render: (row) => row.endDate || "-" },
    { header: "Opening Cash", accessor: "openingCash" },
    { header: "Total Sale", accessor: "totalSale" },
    { header: "Discount", accessor: "discount" },
    { header: "Cash Payment", accessor: "cashPayment" },
    { header: "Card Payment", accessor: "cardPayment" },
    { header: "Total Paid", accessor: "totalPaid" },
    { header: "On The House", accessor: "onTheHouse" },
    { header: "Closing Cash", accessor: "closingCash", render: (row) => row.closingCash || "-" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="p-6 max-w-7xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
            <FaClock className="mr-3 text-amber-500" />
            Recent Work Periods
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            {activePeriod ? "Active work period is running" : "No active work period"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button onClick={handleStart} disabled={!!activePeriod} className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 disabled:opacity-50 cursor-pointer text-sm sm:text-base">
            <FaPlay className="mr-2" /> Start Work Period
          </button>
          <button onClick={handleEnd} disabled={!activePeriod} className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 cursor-pointer text-sm sm:text-base">
            <FaStop className="mr-2" /> End Work Period
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading work periods...</div>
      ) : (
        <ReusableTable columns={columns} data={workPeriods} />
      )}

      {!loading && workPeriods.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center mt-8">
          <FaClock className="text-amber-500 text-3xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No work periods found</h3>
          <button onClick={handleStart} className="px-5 py-2.5 bg-amber-500 text-white font-medium rounded-lg inline-flex items-center mt-4">
            <FaPlus className="mr-2" /> Start Work Period
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkPeriodPage;
