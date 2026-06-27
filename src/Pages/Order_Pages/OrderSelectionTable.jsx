import React, { useState } from "react";
import { orderService } from "../../services/orderService";

const OrderSelectionTable = ({ selectedItems, setSelectedItems, orderDetails, onOrderPlaced }) => {
  const [submitting, setSubmitting] = useState(false);

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

  const handlePlaceOrder = async () => {
    if (!orderDetails.orderType || orderDetails.tableIds.length === 0 || !orderDetails.waiterId) {
      alert("Order Type, Allotted Table, and Served By are required!");
      return;
    }
    if (selectedItems.length === 0) {
      alert("Please add at least one item before placing the order!");
      return;
    }

    setSubmitting(true);
    try {
      await orderService.create({
        orderType: orderDetails.orderType,
        tableId: orderDetails.tableIds[0],
        tableIds: orderDetails.tableIds,
        waiterId: orderDetails.waiterId,
        persons: orderDetails.persons ? Number(orderDetails.persons) : undefined,
        notes: orderDetails.notes || undefined,
        items: selectedItems.map((item) => ({
          foodId: item.id,
          quantity: item.quantity,
          sideDish: item.sideDish || undefined,
          sideDishQty: item.sideDishQty ? Number(item.sideDishQty) : undefined,
          note: item.note || undefined,
          price: item.price,
        })),
      });

      alert("Order placed successfully!");
      setSelectedItems([]);
      onOrderPlaced?.();
    } catch (err) {
      alert(err.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintKOT = () => {
    if (selectedItems.length === 0) {
      alert("No items to print!");
      return;
    }
    alert("KOT printed successfully!");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">SELECTED ITEMS</h2>
        <div className="text-sm text-gray-500">
          {orderDetails.tableIds?.length > 0 && `${orderDetails.tableIds.length} table(s) selected`}
        </div>
      </div>

      {selectedItems.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
          <p className="mt-4 text-gray-500">No items selected yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Food No</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Food Name</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Side item</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3"><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">{item.foodNumber || item.foodNo}</span></td>
                  <td className="p-3 text-sm font-medium">{item.name || item.foodName}</td>
                  <td className="p-3 text-sm">฿{item.price.toFixed(2)}</td>
                  <td className="p-3">
                    <input type="number" min="1" value={item.quantity} onChange={(e) => handleChange(item.id, "quantity", e.target.value)} className="w-16 p-1.5 border rounded-md text-center" />
                  </td>
                  <td className="p-3">
                    <select value={item.sideDish || ""} onChange={(e) => handleChange(item.id, "sideDish", e.target.value)} className="w-full p-1.5 border rounded-md">
                      <option value="">~Select~</option>
                      <option value="Extra Sauce">Extra Sauce</option>
                      <option value="Spicy">Spicy</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input type="text" value={item.note || ""} onChange={(e) => handleChange(item.id, "note", e.target.value)} className="w-full p-1.5 border rounded-md" placeholder="Note" />
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
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
            <button onClick={handlePrintKOT} className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium">Print KOT</button>
            <button onClick={handlePlaceOrder} disabled={submitting} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-60">
              {submitting ? "Placing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSelectionTable;
