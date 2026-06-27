import React, { useState, useEffect, useCallback } from "react";
import { BanknoteIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="p-4 bg-background min-h-[400px]">
      <div className="  mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Orders</CardTitle>
            <CardDescription>
              Manage and track current orders in real-time
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="overflow-hidden py-0">
          {loading ? (
            <CardContent className="p-8 text-center text-muted-foreground">
              Loading orders...
            </CardContent>
          ) : orders.length === 0 ? (
            <CardContent className="p-8 text-center text-muted-foreground">
              No active orders
            </CardContent>
          ) : (
            <div className="overflow-x-auto">
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
                      <TableCell className="text-muted-foreground">
                        {order.table}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{order.status}</Badge>
                      </TableCell>
                      <TableCell>
                        ฿{Number(order.billAmount).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {order.items?.join(", ")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handlePayClick(order.id)}
                            title="Pay"
                          >
                            <BanknoteIcon className="text-success" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleCancelClick(order.id)}
                            title="Cancel"
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
          )}
        </Card>
      </div>
    </div>
  );
};

export default RestaurantDashboardCurrentOrder;
