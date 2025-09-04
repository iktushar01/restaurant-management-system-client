import React, { useState } from "react";
import OrderManagement from "./OrderManagement";
import FoodMenuTable from "./FoodMenuTable";
import OrderSelectionTable from "./OrderSelectionTable";

const OrderPageIndex = () => {
  const [orderDetails, setOrderDetails] = useState({
    orderType: "",
    tables: [],
    staff: "",
    persons: "",
    notes: "",
  });

  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddItem = (food) => {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...food, quantity: 1, sideDish: "", sideDishQty: 0, note: "" }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <OrderManagement orderDetails={orderDetails} setOrderDetails={setOrderDetails} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-6 w-full mx-auto">
        <FoodMenuTable onAddItem={handleAddItem} />
        <OrderSelectionTable
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          orderDetails={orderDetails}
        />
      </div>
    </div>
  );
};

export default OrderPageIndex;
