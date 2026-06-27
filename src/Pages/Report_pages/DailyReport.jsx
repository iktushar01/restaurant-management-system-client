import React, { useEffect, useState } from "react";
import { FaSearch, FaFilePdf, FaMoneyBillWave, FaCreditCard, FaReceipt, FaChartLine, FaMoneyCheckAlt } from "react-icons/fa";
import { reportService } from "../../services/reportService";

const todayISO = () => new Date().toISOString().slice(0, 10);

const formatAmount = (value) => Number(value || 0).toFixed(2);

const DailyStatement = () => {
  const [date, setDate] = useState(todayISO());
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReport = (selectedDate) => {
    setLoading(true);
    setError("");
    reportService.getDaily({ date: selectedDate })
      .then((res) => setReport(res.data || null))
      .catch((err) => setError(err.message || "Failed to load daily report"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReport(todayISO());
  }, []);

  const handleSearch = () => {
    if (date) fetchReport(date);
  };

  const salesSummary = report?.salesSummary || {};
  const charges = report?.charges || {};
  const financialSummary = report?.financialSummary || {};

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-primary/10 p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-foreground">Daily Statement</h1>
          <p className="text-muted-foreground mt-2">Track your daily sales and financial performance</p>
        </div>

        {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}

        {/* Date Filter */}
        <div className="bg-card rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Filter Statement</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-border rounded-lg px-4 py-2 focus:ring-2 focus-visible:ring-ring focus:border-primary"
              />
            </div>
            <div className="flex flex-col justify-end">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading || !date}
                className="flex items-center justify-center bg-blue-600 text-primary-foreground px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full shadow-md disabled:opacity-60"
              >
                <FaSearch className="mr-2" />
                Search
              </button>
            </div>
            <div className="flex flex-col justify-end">
              <button className="flex items-center justify-center bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors w-full shadow-md">
                <FaFilePdf className="mr-2" />
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <>
            {/* Sales Summary */}
            <div className="bg-card rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <FaChartLine className="mr-2 text-primary" />
                Sales Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="bg-gradient-to-r  p-5 rounded-xl border border-border">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      <FaReceipt className="text-primary" />
                    </div>
                    <p className="text-muted-foreground">Food Sale Price</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{formatAmount(salesSummary.foodSalePrice)}</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl border border-green-100">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <FaMoneyBillWave className="text-success" />
                    </div>
                    <p className="text-muted-foreground">Paid Through Cash</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{formatAmount(salesSummary.paidThroughCash)}</p>
                </div>

                <div className="bg-gradient-to-r  p-5 rounded-xl border border-purple-100">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <FaCreditCard className="text-purple-600" />
                    </div>
                    <p className="text-muted-foreground">Paid Through Card</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{formatAmount(salesSummary.paidThroughCard)}</p>
                </div>

                <div className="bg-gradient-to-r  p-5 rounded-xl border border-amber-100">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-amber-100 rounded-lg mr-3">
                      <FaMoneyCheckAlt className="text-amber-600" />
                    </div>
                    <p className="text-muted-foreground">Total Price</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{formatAmount(salesSummary.totalPrice)}</p>
                </div>
              </div>
            </div>

            {/* Charges & Discount */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-card rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Charges & Discount</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">VAT</span>
                    <span className="font-medium text-foreground">{formatAmount(charges.vat)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">SC</span>
                    <span className="font-medium text-foreground">{formatAmount(charges.serviceCharge)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-medium text-foreground">{formatAmount(charges.discount)}</span>
                  </div>
                </div>
              </div>

              {/* Income vs Expense */}
              <div className="bg-card rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Financial Summary</h2>
                <div className="space-y-5">
                  <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Total Income</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-success">Total Income</span>
                      <span className="text-2xl font-bold text-green-700">{formatAmount(financialSummary.totalIncome)}</span>
                    </div>
                  </div>

                  <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                    <h3 className="text-lg font-semibold text-destructive mb-2">Total Expense</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-destructive">Total Expense</span>
                      <span className="text-2xl font-bold text-destructive">{formatAmount(financialSummary.totalExpense)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Balance */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-primary-foreground mb-2">Total Balance</h2>
              <p className="text-4xl font-bold text-primary-foreground">{formatAmount(financialSummary.totalBalance)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyStatement;
