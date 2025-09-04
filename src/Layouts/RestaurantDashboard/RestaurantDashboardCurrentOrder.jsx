import React, { useState } from 'react';

const RestaurantDashboardCurrentOrder = () => {
  // Sample order data
  const [orders, setOrders] = useState([
    { id: 19236, table: 'A3', status: 'Ordered ✔', bill: 0, actions: {} },
    { id: 19237, table: 'A4', status: 'Served', bill: 0, actions: {} },
    { id: 19238, table: 'House Use', status: 'Ordered ✔', bill: 0, actions: {} }
  ]);

  // Handle action functions
  const handleBill = (orderId) => {
    console.log('Generate bill for order:', orderId);
    // Add your bill generation logic here
  };

  const handleResolve = (orderId) => {
    console.log('Resolve payment for order:', orderId);
    // Add your payment resolution logic here
  };

  const handleEdit = (orderId) => {
    console.log('Edit order:', orderId);
    // Add your edit logic here
  };

  const handleCancel = (orderId) => {
    console.log('Cancel order:', orderId);
    // Add your cancellation logic here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-5 bg-gradient-to-r from-blue-600 to-blue-800">
          <h1 className="text-2xl font-bold text-white">CURRENT ORDERS</h1>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Bill #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Table #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Bill</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Edit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cancel</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.table}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status.includes('Ordered') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleBill(order.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      B BILL
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleResolve(order.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md text-xs font-medium hover:bg-green-700 transition-colors"
                    >
                      $ RESOLVE
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEdit(order.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md text-xs font-medium hover:bg-yellow-600 transition-colors"
                    >
                      ☑ EDT
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md text-xs font-medium hover:bg-red-700 transition-colors"
                    >
                      ☑ CANCEL
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        
      </div>
    </div>
  );
};

export default RestaurantDashboardCurrentOrder;