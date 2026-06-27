import React, { useState } from "react";
import { formatMoney } from "@/lib/currency";
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusIcon, PlusIcon, PrinterIcon, ShoppingBagIcon, Trash2Icon } from "lucide-react";
import { orderService } from "../../services/orderService";

const SIDE_DISH_OPTIONS = [
  { value: "Extra Sauce", label: "Extra Sauce" },
  { value: "Spicy", label: "Spicy" },
];

const OrderSelectionTable = ({
  selectedItems,
  setSelectedItems,
  orderDetails,
  onOrderPlaced,
}) => {
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (id, field, value) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: field === "quantity" ? Math.max(1, parseInt(value, 10) || 1) : value }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const adjustQty = (id, delta) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const needsTable = orderDetails.orderType === "DINE_IN";

  const handlePlaceOrder = async () => {
    if (!orderDetails.orderType || !orderDetails.waiterId) {
      toast.error("Order type and served by are required.");
      return;
    }
    if (needsTable && orderDetails.tableIds.length === 0) {
      toast.error("Select at least one table for dine-in orders.");
      return;
    }
    if (selectedItems.length === 0) {
      toast.error("Add at least one item before placing the order.");
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

      toast.success("Order placed successfully!");
      onOrderPlaced?.();
    } catch (err) {
      toast.error(err.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintKOT = () => {
    if (selectedItems.length === 0) {
      toast.error("No items to print.");
      return;
    }
    toast.success("KOT sent to printer.");
  };

  return (
    <Card className="w-full border-border shadow-sm flex flex-col max-h-[calc(100vh-6rem)]">
      <CardHeader className="pb-3 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <ShoppingBagIcon className="size-5 text-primary" />
            Current Order
          </CardTitle>
          <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
            {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 min-h-0 pt-0">
        {selectedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-border rounded-xl bg-muted/20 text-center">
            <ShoppingBagIcon className="size-10 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground text-sm">No items yet. Tap + on the menu to add food.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-auto rounded-lg border border-border flex-1 min-h-[200px] max-h-[50vh]">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 sticky top-0 z-10">
                  <tr>
                    <th className="p-3 text-left font-medium text-muted-foreground">Item</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">Price</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">Qty</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">Side</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">Note</th>
                    <th className="p-3 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {selectedItems.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30">
                      <td className="p-3">
                        <div className="font-medium">{item.name || item.foodName}</div>
                        <div className="text-xs text-muted-foreground">#{item.foodNumber || item.foodNo}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">{formatMoney(item.price))}</td>
                      <td className="p-3">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleChange(item.id, "quantity", e.target.value)}
                          className="w-16 h-8 text-center"
                        />
                      </td>
                      <td className="p-3 min-w-[120px]">
                        <SelectField
                          value={item.sideDish || ""}
                          onValueChange={(v) => handleChange(item.id, "sideDish", v)}
                          placeholder="Optional"
                          options={SIDE_DISH_OPTIONS}
                          className="h-8"
                        />
                      </td>
                      <td className="p-3 min-w-[100px]">
                        <Input
                          value={item.note || ""}
                          onChange={(e) => handleChange(item.id, "note", e.target.value)}
                          placeholder="Note"
                          className="h-8"
                        />
                      </td>
                      <td className="p-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2Icon className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3 overflow-y-auto flex-1 min-h-0 max-h-[45vh] pr-1">
              {selectedItems.map((item) => (
                <div key={item.id} className="rounded-xl border border-border bg-muted/20 p-3 space-y-3">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{item.name || item.foodName}</p>
                      <p className="text-xs text-muted-foreground">#{item.foodNumber || item.foodNo}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-destructive shrink-0"
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">{formatMoney(item.price))}</span>
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" size="icon-sm" onClick={() => adjustQty(item.id, -1)}>
                        <MinusIcon className="size-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button type="button" variant="outline" size="icon-sm" onClick={() => adjustQty(item.id, 1)}>
                        <PlusIcon className="size-3" />
                      </Button>
                    </div>
                  </div>
                  <SelectField
                    value={item.sideDish || ""}
                    onValueChange={(v) => handleChange(item.id, "sideDish", v)}
                    placeholder="Side item (optional)"
                    options={SIDE_DISH_OPTIONS}
                  />
                  <Input
                    value={item.note || ""}
                    onChange={(e) => handleChange(item.id, "note", e.target.value)}
                    placeholder="Item note"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-4 pt-4 border-t border-border shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="text-2xl font-bold text-primary">{formatMoney(totalPrice))}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrintKOT}
              disabled={selectedItems.length === 0}
              className="w-full sm:flex-1 gap-2"
            >
              <PrinterIcon className="size-4" />
              Print KOT
            </Button>
            <Button
              type="button"
              onClick={handlePlaceOrder}
              disabled={submitting || selectedItems.length === 0}
              className="w-full sm:flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {submitting ? "Placing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSelectionTable;
