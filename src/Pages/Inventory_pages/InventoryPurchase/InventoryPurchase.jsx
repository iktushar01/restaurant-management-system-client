import React, { useState, useEffect } from "react";
import FormSelect, { SelectField } from "@/Shared/FormSelect/FormSelect";
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
    <div className="   mx-auto p-6">
      <div className="flex items-center mb-6">
        <div className="p-6 bg-gradient-to-r bg-primary text-primary-foreground rounded-2xl flex-grow">
          <h2 className="text-2xl font-bold text-foreground">Purchase Details</h2>
          <p className="text-foreground mt-1">Fill in the purchase details below</p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          {submitError && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{submitError}</div>}

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Line Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-2 text-left">Item</th>
                    <th className="border border-border px-4 py-2 text-left">Quantity</th>
                    <th className="border border-border px-4 py-2 text-left">Price</th>
                    <th className="border border-border px-4 py-2 text-left">Sub Total</th>
                    <th className="border border-border px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const subTotal = (Number(item.quantity) || 0) * (Number(item.price) || 0);
                    return (
                      <tr key={item.id}>
                        <td className="border border-border px-4 py-2">
                          <SelectField
                            value={item.itemId}
                            onValueChange={(v) => handleItemChange(item.id, "itemId", v)}
                            placeholder="Select item"
                            options={[]}
                          />
                        </td>
                        <td className="border border-border px-4 py-2">
                          <input type="number" min="0" step="0.01" className="w-full px-2 py-1 border border-border rounded"
                            value={item.quantity} onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)} />
                        </td>
                        <td className="border border-border px-4 py-2">
                          <input type="number" min="0" step="0.01" className="w-full px-2 py-1 border border-border rounded"
                            value={item.price} onChange={(e) => handleItemChange(item.id, "price", e.target.value)} />
                        </td>
                        <td className="border border-border px-4 py-2">
                          <input type="text" readOnly className="w-full px-2 py-1 border border-border rounded bg-muted" value={subTotal.toFixed(2)} />
                        </td>
                        <td className="border border-border px-4 py-2 text-center">
                          <button type="button" className="text-destructive hover:text-destructive font-medium" onClick={() => removeItem(item.id)} disabled={items.length <= 1}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button type="button" className="mt-4 px-4 py-2 bg-primary/50 text-primary-foreground rounded hover:bg-primary/90" onClick={addNewItem}>
              Add Item
            </button>
          </div>

          <hr className="my-8 border-t border-border" />

          <h3 className="text-lg font-semibold text-foreground mb-4">Purchase Master</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Supplier</label>
              <SelectField
                value={purchaseMaster.vendorId}
                onValueChange={(v) => setPurchaseMaster({ ...purchaseMaster, vendorId: v}
                placeholder="Select supplier"
                options={[]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Memo No</label>
              <input type="text" className="w-full px-4 py-2.5 border border-border rounded-lg outline-none"
                value={purchaseMaster.memoNo} onChange={(e) => setPurchaseMaster({ ...purchaseMaster, memoNo: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Purchase Date</label>
              <input type="date" className="w-full px-4 py-2.5 border border-border rounded-lg outline-none"
                value={purchaseMaster.purchaseDate} onChange={(e) => setPurchaseMaster({ ...purchaseMaster, purchaseDate: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Memo Total</label>
              <input type="text" readOnly className="w-full px-4 py-2.5 border border-border rounded-lg bg-muted" value={discountedTotal.toFixed(2)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Discount (%)</label>
              <input type="number" min="0" max="100" className="w-full px-4 py-2.5 border border-border rounded-lg outline-none"
                value={purchaseMaster.discount} onChange={(e) => setPurchaseMaster({ ...purchaseMaster, discount: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Advance Amount</label>
              <input type="number" min="0" step="0.01" className="w-full px-4 py-2.5 border border-border rounded-lg outline-none"
                value={purchaseMaster.advanceAmount} onChange={(e) => setPurchaseMaster({ ...purchaseMaster, advanceAmount: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Due Amount</label>
              <input type="text" readOnly className="w-full px-4 py-2.5 border border-border rounded-lg bg-muted" value={due.toFixed(2)} />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to="/inventory" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Cancel</Link>
            <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg disabled:opacity-60">
              {submitting ? "Saving..." : "Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryPurchase;
