import React, { useState, useEffect, useCallback } from "react";
import { FaEdit, FaReceipt, FaMoneyBillWave, FaTimes } from "react-icons/fa";
import { dashboardService } from "../../services/dashboardService";
import { orderService } from "../../services/orderService";

const RestaurantDashboardCurrentOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await dashboardService.getCurrentOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleCancelClick = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await orderService.cancel(orderId);
        fetchOrders();
      } catch (err) {
        alert(err.message || "Failed to cancel order");
      }
    }
  };

  const handlePayClick = async (orderId) => {
    try {
      await orderService.updateStatus(orderId, "COMPLETED");
      fetchOrders();
    } catch (err) {
      alert(err.message || "Failed to complete order");
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">CURRENT ORDERS</h1>
          <p className="text-gray-600">Manage and track current orders in real-time</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No active orders</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.orderId || order.id.slice(0, 8)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.table}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{order.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">฿{Number(order.billAmount).toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{order.items?.join(", ")}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button onClick={() => handlePayClick(order.id)} className="text-green-600 hover:text-green-900" title="Pay"><FaMoneyBillWave /></button>
                          <button onClick={() => handleCancelClick(order.id)} className="text-red-600 hover:text-red-900" title="Cancel"><FaTimes /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardCurrentOrder;
