import React from "react";

const OrderSelectionTable = ({ selectedItems, setSelectedItems, orderDetails }) => {
  const handleChange = (id, field, value) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: field === "quantity" ? parseInt(value) || 1 : value } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!orderDetails.orderType || orderDetails.tables.length === 0 || !orderDetails.staff) {
      alert("⚠️ Order Type, Allotted Table, and Served By are required!");
      return;
    }
    if (selectedItems.length === 0) {
      alert("⚠️ Please add at least one item before placing the order!");
      return;
    }

    console.log("✅ Order Placed:", {
      ...orderDetails,
      items: selectedItems,
      total: totalPrice,
    });

    alert("✅ Order placed successfully!");
    setSelectedItems([]);
  };

  const handlePrintKOT = () => {
    if (selectedItems.length === 0) {
      alert("⚠️ No items to print!");
      return;
    }
    alert("🖨️ KOT printed successfully!");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">SELECTED ITEMS</h2>
        <div className="text-sm text-gray-500">
          {orderDetails.tables.length > 0 && `Table: ${orderDetails.tables.join(', ')}`}
        </div>
      </div>

      {selectedItems.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="mt-4 text-gray-500">No items selected yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food No</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food Name</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Side item</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Side Qty</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 whitespace-nowrap">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {item.foodNumber}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="p-3 whitespace-nowrap text-sm text-gray-600">
                    ฿{item.price.toFixed(2)}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleChange(item.id, "quantity", e.target.value)}
                      className="w-16 p-1.5 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <select
                      value={item.sideDish || ""}
                      onChange={(e) => handleChange(item.id, "sideDish", e.target.value)}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">~Select~</option>
                      <option value="Extra Sauce">Extra Sauce</option>
                      <option value="Spicy">Spicy</option>
                      <option value="No Onion">No Onion</option>
                      <option value="No Garlic">No Garlic</option>
                    </select>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <input
                      type="number"
                      min="0"
                      value={item.sideQuantity || ""}
                      onChange={(e) => handleChange(item.id, "sideQuantity", e.target.value)}
                      className="w-16 p-1.5 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <input
                      type="text"
                      value={item.note || ""}
                      onChange={(e) => handleChange(item.id, "note", e.target.value)}
                      className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Special instructions"
                    />
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg">
            <span className="text-gray-600">Total:</span>
            <span className="ml-2 font-bold text-xl text-blue-600">฿{totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handlePrintKOT}
              className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
              </svg>
              Print KOT
            </button>
            
            <button
              onClick={handlePlaceOrder}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSelectionTable;