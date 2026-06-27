import React, { useCallback, useEffect, useState } from "react";
import { ClipboardListIcon, UtensilsCrossedIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildTableOrderMap } from "@/lib/orderStatus";
import { dashboardService } from "@/services/dashboardService";
import RestaurantDashboard from "./RestaurantDashboard";
import RestaurantDashboardSeatList from "./RestaurantDashboardSeatList";
import RestaurantDashboardCurrentOrder from "./RestaurantDashboardCurrentOrder";

const tabs = [
  { id: "seating", label: "Restaurant Seating", icon: UtensilsCrossedIcon },
  { id: "orders", label: "Current Orders", icon: ClipboardListIcon },
];

const RestaurantDashboardIndex = () => {
  const [activeTab, setActiveTab] = useState("seating");
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const [ordersRes, statsRes] = await Promise.all([
        dashboardService.getCurrentOrders(),
        dashboardService.getStats(),
      ]);
      setOrders(ordersRes.data || []);
      setStats(statsRes.data || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 15000);
    return () => clearInterval(interval);
  }, [fetchDashboard]);

  const tableOrderMap = buildTableOrderMap(orders);

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-background text-foreground">
      <RestaurantDashboard stats={stats} loading={loadingStats} />

      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 pb-8 space-y-5">
        <div
          role="tablist"
          aria-label="Dashboard views"
          className="grid grid-cols-2 w-full max-w-2xl gap-2 p-1 rounded-xl bg-muted/80 border border-border"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/70"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
                {tab.id === "orders" && orders.length > 0 && (
                  <span
                    className={cn(
                      "ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                      isActive ? "bg-primary-foreground/20" : "bg-primary/20 text-primary"
                    )}
                  >
                    {orders.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" className="w-full">
          {activeTab === "seating" ? (
            <RestaurantDashboardSeatList tableOrderMap={tableOrderMap} />
          ) : (
            <RestaurantDashboardCurrentOrder
              orders={orders}
              loading={loadingOrders}
              onRefresh={fetchDashboard}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardIndex;
