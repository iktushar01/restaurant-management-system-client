import React, { useState } from "react";
import { formatMoney } from "@/lib/currency";
import {
  getNextOrderStatus,
  getOrderStatusBadgeClass,
  getOrderStatusLabel,
  ORDER_STATUS,
  ORDER_STATUS_FLOW,
  ORDER_STATUS_OPTIONS,
} from "@/lib/orderStatus";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, BanknoteIcon, XIcon } from "lucide-react";
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
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { orderService } from "../../services/orderService";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";

function OrderStatusBadge({ statusRaw }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium border", getOrderStatusBadgeClass(statusRaw))}
    >
      {getOrderStatusLabel(statusRaw)}
    </Badge>
  );
}

function StatusStepper({ statusRaw }) {
  const currentIndex = ORDER_STATUS_FLOW.indexOf(statusRaw);

  return (
    <div className="flex flex-wrap items-center gap-1">
      {ORDER_STATUS_FLOW.slice(0, -1).map((step, index) => {
        const isDone = currentIndex > index;
        const isCurrent = currentIndex === index;
        return (
          <React.Fragment key={step}>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                isCurrent && "bg-primary text-primary-foreground",
                isDone && !isCurrent && "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
                !isDone && !isCurrent && "bg-muted text-muted-foreground"
              )}
            >
              {getOrderStatusLabel(step).slice(0, 4)}
            </span>
            {index < ORDER_STATUS_FLOW.length - 2 && (
              <span className="text-muted-foreground text-[10px]">→</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const RestaurantDashboardCurrentOrder = ({ orders = [], loading, onRefresh }) => {
  const { confirm } = useConfirmDialog();
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await orderService.updateStatus(orderId, status);
      toast.success(`Status updated to ${getOrderStatusLabel(status)}`);
      await onRefresh?.();
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAdvance = async (order) => {
    const next = getNextOrderStatus(order.statusRaw);
    if (!next) return;
    await handleStatusChange(order.id, next);
  };

  const handleCancelClick = async (orderId) => {
    const ok = await confirm({
      title: "Cancel order?",
      description: "Are you sure you want to cancel this order?",
      confirmLabel: "Cancel order",
    });
    if (!ok) return;

    setUpdatingId(orderId);
    try {
      await orderService.cancel(orderId);
      toast.success("Order cancelled");
      await onRefresh?.();
    } catch (err) {
      toast.error(err.message || "Failed to cancel order");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusOptions = ORDER_STATUS_OPTIONS.filter(
    (opt) => opt.value !== ORDER_STATUS.CANCELLED
  );

  return (
    <Card className="w-full border-border shadow-sm overflow-hidden">
      {!loading && orders.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">Update status to sync seating layout</p>
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
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>Order</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const isUpdating = updatingId === order.id;
                  const nextStatus = getNextOrderStatus(order.statusRaw);

                  return (
                    <TableRow key={order.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        #{order.orderId || order.id.slice(0, 8)}
                        <p className="text-xs text-muted-foreground mt-0.5">{order.waiter}</p>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.table}</TableCell>
                      <TableCell>
                        <StatusStepper statusRaw={order.statusRaw} />
                      </TableCell>
                      <TableCell className="min-w-[160px]">
                        <SelectField
                          value={order.statusRaw}
                          onValueChange={(value) => handleStatusChange(order.id, value)}
                          options={statusOptions}
                          disabled={isUpdating}
                          className="h-9"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{formatMoney(order.billAmount)}</TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {order.items?.join(", ")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {nextStatus && (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={isUpdating}
                              onClick={() => handleAdvance(order)}
                              className="gap-1"
                            >
                              <ArrowRightIcon className="size-3.5" />
                              {getOrderStatusLabel(nextStatus)}
                            </Button>
                          )}
                          {order.statusRaw !== ORDER_STATUS.COMPLETED && (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              disabled={isUpdating}
                              onClick={() => handleStatusChange(order.id, ORDER_STATUS.COMPLETED)}
                              title="Complete & pay"
                            >
                              <BanknoteIcon className="text-success" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            disabled={isUpdating}
                            onClick={() => handleCancelClick(order.id)}
                            title="Cancel order"
                          >
                            <XIcon className="text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="lg:hidden divide-y divide-border">
            {orders.map((order) => {
              const isUpdating = updatingId === order.id;
              const nextStatus = getNextOrderStatus(order.statusRaw);

              return (
                <div key={order.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold">#{order.orderId || order.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">
                        Table {order.table} · {order.waiter}
                      </p>
                    </div>
                    <OrderStatusBadge statusRaw={order.statusRaw} />
                  </div>

                  <StatusStepper statusRaw={order.statusRaw} />

                  <SelectField
                    value={order.statusRaw}
                    onValueChange={(value) => handleStatusChange(order.id, value)}
                    options={statusOptions}
                    disabled={isUpdating}
                  />

                  <p className="text-lg font-bold text-primary">{formatMoney(order.billAmount)}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {order.items?.join(", ")}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {nextStatus && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isUpdating}
                        onClick={() => handleAdvance(order)}
                        className="flex-1 gap-1.5"
                      >
                        <ArrowRightIcon className="size-4" />
                        {getOrderStatusLabel(nextStatus)}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className="flex-1 gap-1.5 bg-primary text-primary-foreground"
                      disabled={isUpdating}
                      onClick={() => handleStatusChange(order.id, ORDER_STATUS.COMPLETED)}
                    >
                      <BanknoteIcon className="size-4" />
                      Complete
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isUpdating}
                      className="gap-1.5 text-destructive border-destructive/30"
                      onClick={() => handleCancelClick(order.id)}
                    >
                      <XIcon className="size-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
};

export default RestaurantDashboardCurrentOrder;
