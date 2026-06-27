import React from "react";
import { UtensilsCrossedIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DineFloorPlanCanvas from "@/components/dine/DineFloorPlanCanvas";

const RestaurantDashboardSeatList = () => {
  return (
    <div className="bg-muted/30 p-2 md:p-4 flex justify-center">
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-xl lg:text-2xl text-center flex items-center justify-center gap-2">
            <UtensilsCrossedIcon className="size-5 text-primary" />
            Restaurant Seating Layout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DineFloorPlanCanvas readOnly minHeight={380} className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDashboardSeatList;
