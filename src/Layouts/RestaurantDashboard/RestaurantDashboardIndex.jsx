import React from "react";
import RestaurantDashboard from "./RestaurantDashboard";
import RestaurantDashboardSeatList from "./RestaurantDashboardSeatList";
import RestaurantDashboardCurrentOrder from "./RestaurantDashboardCurrentOrder";

const RestaurantDashboardIndex = () => {
  return (
    <div>
      <RestaurantDashboard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <RestaurantDashboardSeatList />
        <RestaurantDashboardCurrentOrder />
      </div>
    </div>
  );
};

export default RestaurantDashboardIndex;
