import React from 'react';
import RestaurantDashboard from './RestaurantDashboard';
import RestaurantDashboardSeatList from './RestaurantDashboardSeatList';

const RestaurantDashboardIndex = () => {
    return (
        <div>
            <RestaurantDashboard />
            <RestaurantDashboardSeatList />
        </div>
    );
};

export default RestaurantDashboardIndex;