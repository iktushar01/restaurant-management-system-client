import React from "react";
import DineFloorPlanCanvas from "@/components/dine/DineFloorPlanCanvas";

const RestaurantDashboardSeatList = () => {
  return (
    <div className="w-full rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <DineFloorPlanCanvas readOnly minHeight={560} className="w-full" />
    </div>
  );
};

export default RestaurantDashboardSeatList;
