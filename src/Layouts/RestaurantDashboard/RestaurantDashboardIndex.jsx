import React, { useState } from "react";
import { ClipboardListIcon, UtensilsCrossedIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import RestaurantDashboard from "./RestaurantDashboard";
import RestaurantDashboardSeatList from "./RestaurantDashboardSeatList";
import RestaurantDashboardCurrentOrder from "./RestaurantDashboardCurrentOrder";

const tabs = [
  {
    id: "seating",
    label: "Restaurant Seating",
    icon: UtensilsCrossedIcon,
  },
  {
    id: "orders",
    label: "Current Orders",
    icon: ClipboardListIcon,
  },
];

const RestaurantDashboardIndex = () => {
  const [activeTab, setActiveTab] = useState("seating");

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-background text-foreground">
      <RestaurantDashboard />

      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 pb-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Dashboard views"
            className="inline-flex w-full sm:w-auto p-1 rounded-xl bg-muted border border-border gap-1"
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
                    "flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div role="tabpanel" className="w-full">
          {activeTab === "seating" ? (
            <RestaurantDashboardSeatList />
          ) : (
            <RestaurantDashboardCurrentOrder />
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardIndex;
