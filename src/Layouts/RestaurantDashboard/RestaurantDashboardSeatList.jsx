import React from "react";
import DineFloorPlanCanvas from "@/components/dine/DineFloorPlanCanvas";
import { SEATING_LEGEND } from "@/lib/orderStatus";
import { cn } from "@/lib/utils";

const RestaurantDashboardSeatList = ({ tableOrderMap = {} }) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-border bg-muted/30 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Legend
        </span>
        {SEATING_LEGEND.map((item) => (
          <div key={item.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn("size-3 rounded-sm border", item.className)} />
            {item.label}
          </div>
        ))}
      </div>

      <div className="w-full rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <DineFloorPlanCanvas
          readOnly
          tableOrderMap={tableOrderMap}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default RestaurantDashboardSeatList;
