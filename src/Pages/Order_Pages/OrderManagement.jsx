import React, { useState, useEffect } from "react";
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDownIcon, ChevronUpIcon, ClipboardListIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { dineTableService } from "../../services/dineTableService";
import { waiterService } from "../../services/waiterService";

const ORDER_TYPES = [
  { label: "Dine In", value: "DINE_IN" },
  { label: "Takeaway", value: "TAKEAWAY" },
  { label: "Delivery", value: "DELIVERY" },
];

const OrderManagement = ({ orderDetails, setOrderDetails }) => {
  const [showTableDropdown, setShowTableDropdown] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [tables, setTables] = useState([]);
  const [waiters, setWaiters] = useState([]);
  const [loading, setLoading] = useState(true);

  const needsTable = orderDetails.orderType === "DINE_IN";

  useEffect(() => {
    const load = async () => {
      try {
        const [tablesRes, waitersRes] = await Promise.all([
          dineTableService.getAllSimple(),
          waiterService.getAllSimple(),
        ]);
        setTables(tablesRes.data || []);
        setWaiters(waitersRes.data || []);
      } catch (err) {
        console.error("Failed to load order options:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!needsTable && orderDetails.tableIds.length > 0) {
      setOrderDetails((prev) => ({ ...prev, tableIds: [] }));
    }
  }, [needsTable, orderDetails.tableIds.length, setOrderDetails]);

  const handleChange = (field, value) => {
    setOrderDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleTableSelect = (tableId) => {
    setOrderDetails((prev) => {
      const updatedTables = prev.tableIds.includes(tableId)
        ? prev.tableIds.filter((t) => t !== tableId)
        : [...prev.tableIds, tableId];
      return { ...prev, tableIds: updatedTables };
    });
  };

  const selectedTableLabels = tables
    .filter((t) => orderDetails.tableIds.includes(t.id))
    .map((t) => t.tableNo);

  if (loading) {
    return (
      <Card className="w-full border-border shadow-sm">
        <CardContent className="py-10 text-center text-muted-foreground">
          Loading order options...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <ClipboardListIcon className="size-5 text-primary" />
            Order Details
          </CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="sm:hidden w-full"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Hide details" : "Show details"}
            {expanded ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className={cn(!expanded && "hidden sm:block")}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="space-y-1.5">
            <Label htmlFor="order-type">Order Type *</Label>
            <SelectField
              value={orderDetails.orderType || ""}
              onValueChange={(v) => handleChange("orderType", v)}
              placeholder="Select order type"
              options={ORDER_TYPES.map((o) => ({ value: o.value, label: o.label }))}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="waiter">Served By *</Label>
            <SelectField
              value={orderDetails.waiterId || ""}
              onValueChange={(v) => handleChange("waiterId", v)}
              placeholder="Select staff"
              options={waiters.map((w) => ({ value: w.id, label: w.name }))}
            />
          </div>

          {needsTable && (
            <div className="space-y-1.5 sm:col-span-2 lg:col-span-1 relative">
              <Label>Allotted Tables *</Label>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowTableDropdown(!showTableDropdown)}
                  className="w-full justify-between h-10 font-normal"
                >
                  <span className="truncate text-left">
                    {orderDetails.tableIds.length > 0
                      ? `${orderDetails.tableIds.length} table(s): ${selectedTableLabels.join(", ")}`
                      : "Select tables"}
                  </span>
                  {showTableDropdown ? (
                    <ChevronUpIcon className="size-4 shrink-0" />
                  ) : (
                    <ChevronDownIcon className="size-4 shrink-0" />
                  )}
                </Button>

                {showTableDropdown && (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-40 sm:hidden"
                      aria-label="Close table list"
                      onClick={() => setShowTableDropdown(false)}
                    />
                    <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-56 overflow-y-auto">
                      {tables.length === 0 ? (
                        <p className="p-3 text-sm text-muted-foreground">No tables available</p>
                      ) : (
                        tables.map((table) => (
                          <label
                            key={table.id}
                            className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer border-b border-border last:border-0"
                          >
                            <input
                              type="checkbox"
                              checked={orderDetails.tableIds.includes(table.id)}
                              onChange={() => handleTableSelect(table.id)}
                              className="size-4 rounded border-border text-primary focus:ring-ring"
                            />
                            <span className="text-sm">
                              {table.tableNo}{" "}
                              <span className="text-muted-foreground">({table.location})</span>
                              {" · "}
                              <span
                                className={
                                  table.status === "Vacant"
                                    ? "text-emerald-500"
                                    : table.status === "Occupied"
                                      ? "text-destructive"
                                      : "text-amber-500"
                                }
                              >
                                {table.status}
                              </span>
                            </span>
                          </label>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="persons">No. of Persons</Label>
            <Input
              id="persons"
              type="number"
              min="1"
              value={orderDetails.persons || ""}
              onChange={(e) => handleChange("persons", e.target.value)}
              placeholder="Guests count"
            />
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <Label htmlFor="notes">Order Notes</Label>
          <Textarea
            id="notes"
            value={orderDetails.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
            rows={2}
            placeholder="Special instructions, allergies, etc."
            className="resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderManagement;
