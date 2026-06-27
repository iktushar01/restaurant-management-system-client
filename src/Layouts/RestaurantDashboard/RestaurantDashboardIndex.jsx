import React, { useState } from "react";
import { ClipboardListIcon, UtensilsCrossedIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import RestaurantDashboard from "./RestaurantDashboard";
import RestaurantDashboardSeatList from "./RestaurantDashboardSeatList";
import RestaurantDashboardCurrentOrder from "./RestaurantDashboardCurrentOrder";

const tabs = [
  { id: "seating", label: "Restaurant Seating", icon: UtensilsCrossedIcon },
  { id: "orders", label: "Current Orders", icon: ClipboardListIcon },
];

const RestaurantDashboardIndex = () => {
  const [activeTab, setActiveTab] = useState("seating");

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-background text-foreground">
      <RestaurantDashboard />

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
              </button>
            );
          })}
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
