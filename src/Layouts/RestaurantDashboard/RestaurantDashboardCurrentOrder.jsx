import React, { useState } from "react";
import { FaEdit, FaReceipt, FaMoneyBillWave, FaTimes } from "react-icons/fa";

const RestaurantDashboardCurrentOrder = () => {
  // Sample data for current orders - matching your table structure
  const [orders, setOrders] = useState([
    {
      id: 19236,
      table: "A3",
      status: "Ordered ✓",
      billAmount: 125.50,
      items: ["Pizza", "Coke", "Salad"]
    },
    {
      id: 19237,
      table: "A4",
      status: "Served",
      billAmount: 89.75,
      items: ["Burger", "Fries"]
    },
    {
      id: 19238,
      table: "House Use",
      status: "Ordered ✓",
      billAmount: 45.25,
      items: ["Coffee", "Sandwich"]
    }
  ]);

  const handleBillClick = (orderId) => {
    console.log(`Generate bill for order #${orderId}`);
    // Implement bill generation logic here
  };

  const handlePayClick = (orderId) => {
    console.log(`Process payment for order #${orderId}`);
    // Implement payment processing logic here
  };

  const handleEditClick = (orderId) => {
    console.log(`Edit order #${orderId}`);
    // Implement edit order logic here
  };

  const handleCancelClick = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders(orders.filter(order => order.id !== orderId));
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
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Bill #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Table #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Bill
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Pay
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Edit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Cancel
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.table}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status.includes("Ordered") 
                          ? "bg-yellow-100 text-yellow-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      <button
                        onClick={() => handleBillClick(order.id)}
                        className="flex items-center justify-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium"
                      >
                        <FaReceipt className="mr-1" /> BILL
                      </button>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      <button
                        onClick={() => handlePayClick(order.id)}
                        className="flex items-center justify-center px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
                      >
                        <FaMoneyBillWave className="mr-1" /> $ RESOLVE
                      </button>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      <button
                        onClick={() => handleEditClick(order.id)}
                        className="flex items-center justify-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
                      >
                        <FaEdit className="mr-1" /> EDIT
                      </button>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      <button
                        onClick={() => handleCancelClick(order.id)}
                        className="flex items-center justify-center px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors font-medium"
                      >
                        <FaTimes className="mr-1" /> CANCEL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
</div>
      
      </div>
    </div>
  );
};

export default RestaurantDashboardCurrentOrder;