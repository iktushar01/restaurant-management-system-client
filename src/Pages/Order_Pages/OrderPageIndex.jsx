import React from 'react';
import OrderManagement from './OrderManagement';
import FoodMenuTable from './FoodMenuTable';

const OrderPageIndex = () => {
    return (
        <div>
            <OrderManagement />
            <FoodMenuTable />
        </div>
    );
};

export default OrderPageIndex;