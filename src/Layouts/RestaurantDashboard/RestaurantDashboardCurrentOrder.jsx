import React, { useState, useEffect, useCallback } from "react";
import { formatMoney } from "@/lib/currency";
import { BanknoteIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dashboardService } from "../../services/dashboardService";
import { orderService } from "../../services/orderService";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";

const RestaurantDashboardCurrentOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { confirm } = useConfirmDialog();

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
    const ok = await confirm({
      title: "Cancel order?",
      description: "Are you sure you want to cancel this order?",
      confirmLabel: "Cancel order",
    });
    if (!ok) return;

    try {
      await orderService.cancel(orderId);
      toast.success("Order cancelled");
      fetchOrders();
    } catch (err) {
      toast.error(err.message || "Failed to cancel order");
    }
  };

  const handlePayClick = async (orderId) => {
    try {
      await orderService.updateStatus(orderId, "COMPLETED");
      toast.success("Order completed");
      fetchOrders();
    } catch (err) {
      toast.error(err.message || "Failed to complete order");
    }
  };

  return (
    <Card className="w-full border-border shadow-sm overflow-hidden">
      {!loading && orders.length > 0 && (
        <div className="flex items-center justify-end px-4 py-2 border-b border-border bg-muted/30">
          <Badge variant="secondary" className="font-normal">
            {orders.length} active
          </Badge>
        </div>
      )}

      {loading ? (
        <CardContent className="p-10 text-center text-muted-foreground">
          Loading orders...
        </CardContent>
      ) : orders.length === 0 ? (
        <CardContent className="p-10 text-center text-muted-foreground">
          No active orders right now.
        </CardContent>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bill Amount</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      #{order.orderId || order.id.slice(0, 8)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.table}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{order.status}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{formatMoney(order.billAmount)}</TableCell>
                    <TableCell className="text-muted-foreground max-w-md truncate">
                      {order.items?.join(", ")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handlePayClick(order.id)}
                          title="Complete payment"
                        >
                          <BanknoteIcon className="text-success" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleCancelClick(order.id)}
                          title="Cancel order"
                        >
                          <XIcon className="text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden divide-y divide-border">
            {orders.map((order) => (
              <div key={order.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">#{order.orderId || order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">Table {order.table}</p>
                  </div>
                  <Badge variant="secondary">{order.status}</Badge>
                </div>
                <p className="text-lg font-bold text-primary">{formatMoney(order.billAmount)}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {order.items?.join(", ")}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 gap-1.5 bg-primary text-primary-foreground"
                    onClick={() => handlePayClick(order.id)}
                  >
                    <BanknoteIcon className="size-4" />
                    Pay
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1.5 text-destructive border-destructive/30"
                    onClick={() => handleCancelClick(order.id)}
                  >
                    <XIcon className="size-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default RestaurantDashboardCurrentOrder;
