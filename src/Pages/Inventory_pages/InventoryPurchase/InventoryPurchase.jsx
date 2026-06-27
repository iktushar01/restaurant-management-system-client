import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { inventoryService } from "../../../services/inventoryService";

const InventoryPurchase = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [items, setItems] = useState([{ id: Date.now(), itemId: "", quantity: 0, price: 0 }]);
  const [purchaseMaster, setPurchaseMaster] = useState({
    vendorId: "",
    memoNo: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    discount: 0,
    advanceAmount: 0,
  });
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      inventoryService.vendors.getAll({ limit: 100 }),
      inventoryService.items.getAllSimple(),
    ]).then(([vRes, iRes]) => {
      setVendors(vRes.data || []);
      setCatalogItems(iRes.data || []);
    }).catch(() => {});
  }, []);

  const memoTotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.price) || 0), 0);
  const discountedTotal = memoTotal - memoTotal * ((Number(purchaseMaster.discount) || 0) / 100);
  const due = discountedTotal - (Number(purchaseMaster.advanceAmount) || 0);

  const addNewItem = () => {
    setItems([...items, { id: Date.now(), itemId: "", quantity: 0, price: 0 }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!purchaseMaster.vendorId || !purchaseMaster.memoNo) {
      setSubmitError("Supplier and memo number are required");
      return;
    }
    const lineItems = items.filter((i) => i.itemId && Number(i.quantity) > 0);
    if (lineItems.length === 0) {
      setSubmitError("Add at least one item with quantity");
      return;
    }
    setSubmitting(true);
    try {
      await inventoryService.purchases.create({
        memoNo: purchaseMaster.memoNo,
        vendorId: purchaseMaster.vendorId,
        purchaseDate: new Date(purchaseMaster.purchaseDate).toISOString(),
        discount: Number(purchaseMaster.discount) || 0,
        advanceAmount: Number(purchaseMaster.advanceAmount) || 0,
        items: lineItems.map((i) => ({
          itemId: i.itemId,
          quantity: Number(i.quantity),
          price: Number(i.price) || 0,
        })),
      });
      navigate("/inventory");
    } catch (err) {
      setSubmitError(err.message || "Failed to create purchase");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-2xl flex-grow">
          <h2 className="text-2xl font-bold text-gray-800">Purchase Details</h2>
          <p className="text-gray-700 mt-1">Fill in the purchase details below</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{submitError}</div>}

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Line Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Sub Total</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const subTotal = (Number(item.quantity) || 0) * (Number(item.price) || 0);
                    return (
                      <tr key={item.id}>
                        <td className="border border-gray-300 px-4 py-2">
                          <select className="w-full px-2 py-1 border border-gray-300 rounded" value={item.itemId}
                            onChange={(e) => handleItemChange(item.id, "itemId", e.target.value)}>
                            <option value="">Select item</option>
                            {catalogItems.map((ci) => (
                              <option key={ci.id} value={ci.id}>{ci.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input type="number" min="0" step="0.01" className="w-full px-2 py-1 border border-gray-300 rounded"
                            value={item.quantity} onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)} />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input type="number" min="0" step="0.01" className="w-full px-2 py-1 border border-gray-300 rounded"
                            value={item.price} onChange={(e) => handleItemChange(item.id, "price", e.target.value)} />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input type="text" readOnly className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100" value={subTotal.toFixed(2)} />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <button type="button" className="text-red-500 hover:text-red-700 font-medium" onClick={() => removeItem(item.id)} disabled={items.length <= 1}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button type="button" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={addNewItem}>
              Add Item
            </button>
          </div>

          <hr className="my-8 border-t border-gray-300" />

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchase Master</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
                value={purchaseMaster.vendorId} onChange={(e) => setPurchaseMaster({ ...purchaseMaster, vendorId: e.target.value })}>
                <option value="">Select supplier</option>
                {vendors.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Memo No</label>
              <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
                value={purchaseMaster.memoNo} onChange={(e) => setPurchaseMaster({ ...purchaseMaster, memoNo: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
              <input type="date" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
                value={purchaseMaster.purchaseDate} onChange={(e) => setPurchaseMaster({ ...purchaseMaster, purchaseDate: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Memo Total</label>
              <input type="text" readOnly className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100" value={discountedTotal.toFixed(2)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input type="number" min="0" max="100" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
                value={purchaseMaster.discount} onChange={(e) => setPurchaseMaster({ ...purchaseMaster, discount: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Advance Amount</label>
              <input type="number" min="0" step="0.01" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
                value={purchaseMaster.advanceAmount} onChange={(e) => setPurchaseMaster({ ...purchaseMaster, advanceAmount: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Amount</label>
              <input type="text" readOnly className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100" value={due.toFixed(2)} />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/inventory" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryPurchase;
