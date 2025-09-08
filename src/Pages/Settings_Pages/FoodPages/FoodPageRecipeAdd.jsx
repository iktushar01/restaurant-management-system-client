import React, { useState, useMemo } from "react";
import { 
  FaPlus, FaMinus, FaDollarSign, FaPercent, 
  FaUtensils, FaShoppingBasket, FaCalculator,
  FaTrash, FaArrowRight, FaCoins
} from "react-icons/fa";

const FoodPageRecipeAdd = () => {
  const rawMaterials = [
    { id: 1, name: "Chicken", unit: "KG", price: 150 },
    { id: 2, name: "Beef", unit: "KG", price: 650 },
    { id: 3, name: "Mutton", unit: "KG", price: 800 },
    { id: 4, name: "Rupcanda Fish", unit: "KG", price: 500 },
    { id: 5, name: "Koral", unit: "KG", price: 550 },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [otherCost, setOtherCost] = useState(400);
  const [salePrice, setSalePrice] = useState(700);

  // Add item
  const addItem = (item) => {
    const exists = selectedItems.find((i) => i.id === item.id);
    if (exists) {
      // If exists, increase quantity by 1
      setSelectedItems(
        selectedItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove item
  const removeItem = (id) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== id));
  };

  // Change quantity
  const handleQuantityChange = (id, value) => {
    const numValue = Number(value);
    if (numValue < 0) return;
    
    setSelectedItems(
      selectedItems.map((i) =>
        i.id === id ? { ...i, quantity: numValue || 0 } : i
      )
    );
  };

  // Increment/Decrement quantity
  const adjustQuantity = (id, amount) => {
    setSelectedItems(
      selectedItems.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(0, i.quantity + amount) } : i
      )
    );
  };

  // Calculations
  const totalItemCost = useMemo(
    () => selectedItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
    [selectedItems]
  );

  const totalCost = totalItemCost + Number(otherCost || 0);
  const profit = salePrice - totalCost;
  const profitMargin = salePrice
    ? ((profit / salePrice) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaUtensils className="text-blue-500" /> Chicken Satay Recipe Builder
          </h1>
          <p className="text-gray-600 mt-1 text-lg">Menu Price: ৳ 395.00</p>
        </div>
       
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Raw Materials */}
        <div className="col-span-1 bg-white rounded-xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
            <FaShoppingBasket className="text-cyan-500" /> Raw Materials
          </h2>
          <div className="space-y-3">
            {rawMaterials.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-cyan-50 transition-colors">
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.unit} • ৳ {item.price}</p>
                </div>
                <button
                  onClick={() => addItem(item)}
                  className="bg-cyan-500 text-white p-2 rounded-full hover:bg-cyan-600 transition-colors shadow-sm hover:shadow-md"
                >
                  <FaPlus />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Items & Pricing */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Selected Items */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
              <FaCalculator className="text-blue-500" /> Selected Ingredients
            </h2>
            {selectedItems.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FaShoppingBasket className="text-gray-300 text-4xl mx-auto mb-3" />
                <p className="text-gray-500">No ingredients selected. Add items from the raw materials list.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="text-left p-3 font-medium text-gray-600">Item</th>
                      <th className="text-left p-3 font-medium text-gray-600">Quantity</th>
                      <th className="text-left p-3 font-medium text-gray-600">Unit</th>
                      <th className="text-left p-3 font-medium text-gray-600">Cost</th>
                      <th className="text-right p-3 font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                        <td className="p-3 font-medium">{item.name}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <button 
                              onClick={() => adjustQuantity(item.id, -1)}
                              className="bg-gray-200 hover:bg-gray-300 p-1 rounded-l transition-colors"
                            >
                              <FaMinus size={10} />
                            </button>
                            <input
                              type="number"
                              min="0"
                              className="w-12 text-center border-t border-b border-gray-200 py-1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                            <button 
                              onClick={() => adjustQuantity(item.id, 1)}
                              className="bg-gray-200 hover:bg-gray-300 p-1 rounded-r transition-colors"
                            >
                              <FaPlus size={10} />
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-gray-600">{item.unit}</td>
                        <td className="p-3 font-medium">৳ {(item.price * item.quantity).toFixed(2)}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                            aria-label="Remove"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
              <FaCoins className="text-yellow-500" /> Pricing & Profitability
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                    <FaDollarSign className="text-gray-400" /> Other Ingredients Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400">৳</span>
                    <input
                      type="number"
                      className="pl-8 w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                      value={otherCost}
                      onChange={(e) => setOtherCost(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                    <FaDollarSign className="text-gray-400" /> Sale Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400">৳</span>
                    <input
                      type="number"
                      className="pl-8 w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                      value={salePrice}
                      onChange={(e) => setSalePrice(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600">Total Item Cost</span>
                  <span className="font-medium">৳ {totalItemCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600">Other Costs</span>
                  <span className="font-medium">৳ {Number(otherCost || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200 font-semibold text-blue-700">
                  <span>Total Cost</span>
                  <span>৳ {totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600">Profit</span>
                  <span className={`font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ৳ {profit.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 flex items-center gap-1">
                    <FaPercent className="text-gray-400" /> Profit Margin
                  </span>
                  <span className={`font-medium ${profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {profitMargin}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                Save Recipe <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPageRecipeAdd;