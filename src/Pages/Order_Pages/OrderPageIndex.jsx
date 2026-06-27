import React, { useState } from "react";
import OrderManagement from "./OrderManagement";
import FoodMenuTable from "./FoodMenuTable";
import OrderSelectionTable from "./OrderSelectionTable";

const OrderPageIndex = () => {
  const [orderDetails, setOrderDetails] = useState({
    orderType: "",
    tableIds: [],
    waiterId: "",
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

  const handleOrderPlaced = () => {
    setSelectedItems([]);
    setOrderDetails({
      orderType: "",
      tableIds: [],
      waiterId: "",
      persons: "",
      notes: "",
    });
  };

  return (
    <div className="w-[100vw] max-w-none relative left-1/2 -translate-x-1/2 min-h-[calc(100vh-10rem)] bg-muted/30">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <OrderManagement orderDetails={orderDetails} setOrderDetails={setOrderDetails} />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6 items-start">
          <div className="xl:col-span-7 min-h-[480px] flex flex-col">
            <FoodMenuTable onAddItem={handleAddItem} />
          </div>
          <div className="xl:col-span-5 xl:sticky xl:top-4">
            <OrderSelectionTable
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              orderDetails={orderDetails}
              onOrderPlaced={handleOrderPlaced}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPageIndex;
