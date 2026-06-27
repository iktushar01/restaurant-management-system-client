import React, { useEffect, useMemo, useState } from 'react';
import { FiPrinter, FiDownload, FiChevronDown, FiChevronUp, FiDollarSign, FiPercent, FiHome, FiCreditCard, FiDollarSign as FiCash } from 'react-icons/fi';
import { reportService } from '../../services/reportService';

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const ReportPageIndex = () => {
  const [showSummary, setShowSummary] = useState(true);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    reportService.getCurrent()
      .then((res) => setReport(res.data || null))
      .catch((err) => setError(err.message || 'Failed to load report'))
      .finally(() => setLoading(false));
  }, []);

  const allOrdersData = report?.allOrders || [];
  const cancelledOrdersData = report?.cancelledOrders || [];

  const summaryData = useMemo(() => {
    const summary = report?.summary || {};
    return [
      { label: 'Total Food Cost', value: formatCurrency(summary.totalFoodCost), icon: <FiDollarSign className="text-blue-500" /> },
      { label: 'Total Discount', value: formatCurrency(summary.totalDiscount), icon: <FiPercent className="text-green-500" /> },
      { label: 'Total OnHouse Cost', value: formatCurrency(summary.totalOnHouse), icon: <FiHome className="text-purple-500" /> },
      { label: 'Total Due Orders Amount', value: formatCurrency(summary.totalDueOrders), icon: <FiDollarSign className="text-yellow-500" /> },
      { label: 'Total Due Collect Amount', value: formatCurrency(summary.totalDueCollect), icon: <FiDollarSign className="text-orange-500" /> },
      { label: 'Total Payment Through Card', value: formatCurrency(summary.totalCard), icon: <FiCreditCard className="text-indigo-500" /> },
      { label: 'Total Cash Payment', value: formatCurrency(summary.totalCash), icon: <FiCash className="text-teal-500" /> },
    ];
  }, [report]);

  const totalAllOrders = allOrdersData.reduce((sum, item) => sum + Number(item.total), 0);
  const totalCancelled = cancelledOrdersData.reduce((sum, item) => sum + Number(item.total), 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-blue-100 p-6 rounded-lg shadow">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Charges</h1>
            <p className="text-gray-600 mt-1">Order summary and reports</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <FiPrinter className="text-gray-600" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <FiDownload className="text-gray-600" />
              Export
            </button>
          </div>
        </div>

        {/* All Orders Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">All Orders</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Detail</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allOrdersData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.orderDetail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.orderTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" colSpan="3"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Total</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(totalAllOrders)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Cancelled Orders Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Cancelled Orders</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Detail</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cancelledOrdersData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.orderDetail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.orderTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" colSpan="3"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Total</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(totalCancelled)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md hover:bg-gray-100"
            >
              {showSummary ? <FiChevronUp /> : <FiChevronDown />}
              {showSummary ? 'Hide' : 'Show'} Summary
            </button>
          </div>

          {showSummary && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {summaryData.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-gray-600">{item.label}</div>
                        {item.icon}
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPageIndex;
