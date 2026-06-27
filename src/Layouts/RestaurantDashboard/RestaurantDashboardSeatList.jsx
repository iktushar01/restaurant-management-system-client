import React from "react";
import { UtensilsCrossedIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DineFloorPlanCanvas from "@/components/dine/DineFloorPlanCanvas";

const RestaurantDashboardSeatList = () => {
  return (
    <Card className="w-full border-border shadow-sm">
      <CardHeader className="pb-3 border-b border-border">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <UtensilsCrossedIcon className="size-5 text-primary" />
          Restaurant Seating Layout
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 px-3 sm:px-4 md:px-6">
        <DineFloorPlanCanvas readOnly minHeight={520} className="w-full" />
      </CardContent>
    </Card>
  );
};

export default RestaurantDashboardSeatList;
