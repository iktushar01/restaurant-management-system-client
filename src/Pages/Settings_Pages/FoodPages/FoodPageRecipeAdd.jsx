import React, { useState, useMemo, useEffect } from "react";
import { formatMoney } from "@/lib/currency";
import { useCurrency } from "@/context/CurrencyProvider";
import { 
  FaPlus, FaMinus, FaDollarSign, FaPercent, 
  FaUtensils, FaShoppingBasket, FaCalculator,
  FaTrash, FaArrowRight, FaCoins
} from "react-icons/fa";
import { inventoryService } from "../../../services/inventoryService";

const FoodPageRecipeAdd = () => {
  const { currency } = useCurrency();
  const [rawMaterials, setRawMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    inventoryService.items.getAllSimple()
      .then((res) => {
        setRawMaterials((res.data || []).map((item) => ({
          id: item.id,
          name: item.name,
          unit: item.unit || "KG",
          price: Number(item.price || 0),
        })));
      })
      .catch(() => setRawMaterials([]))
      .finally(() => setLoading(false));
  }, []);

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
    <div className="min-h-screen bg-muted/40 p-4 md:p-6">
      {/* Header */}
      <div className="bg-card rounded-xl shadow-md p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            <FaUtensils className="text-primary" /> Chicken Satay Recipe Builder
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">Menu Price: {formatMoney(salePrice)}</p>
        </div>
       
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Raw Materials */}
        <div className="col-span-1 bg-card rounded-xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
            <FaShoppingBasket className="text-primary" /> Raw Materials
          </h2>
          <div className="space-y-3">
            {loading ? (
              <p className="text-muted-foreground text-center py-4">Loading inventory items...</p>
            ) : rawMaterials.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No inventory items found</p>
            ) : rawMaterials.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-muted/40 rounded-lg border border-border hover:bg-primary/5 transition-colors">
                <div>
                  <h3 className="font-medium text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.unit} • {item.price}</p>
                </div>
                <button
                  onClick={() => addItem(item)}
                  className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
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
          <div className="bg-card rounded-xl shadow-md p-5">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <FaCalculator className="text-primary" /> Selected Ingredients
            </h2>
            {selectedItems.length === 0 ? (
              <div className="text-center py-8 bg-muted/40 rounded-lg">
                <FaShoppingBasket className="text-muted-foreground text-4xl mx-auto mb-3" />
                <p className="text-muted-foreground">No ingredients selected. Add items from the raw materials list.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left p-3 font-medium text-muted-foreground">Item</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Quantity</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Unit</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Cost</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map((item) => (
                      <tr key={item.id} className="border-b border-border hover:bg-primary/5 transition-colors">
                        <td className="p-3 font-medium">{item.name}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <button 
                              onClick={() => adjustQuantity(item.id, -1)}
                              className="bg-muted hover:bg-muted/80 p-1 rounded-l transition-colors"
                            >
                              <FaMinus size={10} />
                            </button>
                            <input
                              type="number"
                              min="0"
                              className="w-12 text-center border-t border-b border-border py-1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                            <button 
                              onClick={() => adjustQuantity(item.id, 1)}
                              className="bg-muted hover:bg-muted/80 p-1 rounded-r transition-colors"
                            >
                              <FaPlus size={10} />
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-muted-foreground">{item.unit}</td>
                        <td className="p-3 font-medium">{formatMoney(item.price * item.quantity)}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive transition-colors p-2"
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
          <div className="bg-card rounded-xl shadow-md p-5">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <FaCoins className="text-primary" /> Pricing & Profitability
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-muted/40 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                    <FaDollarSign className="text-muted-foreground" /> Other Ingredients Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-muted-foreground">{currency.symbol}</span>
                    <input
                      type="number"
                      className="pl-8 w-full border border-border p-2 rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring"
                      value={otherCost}
                      onChange={(e) => setOtherCost(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="bg-muted/40 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                    <FaDollarSign className="text-muted-foreground" /> Sale Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-muted-foreground">{currency.symbol}</span>
                    <input
                      type="number"
                      className="pl-8 w-full border border-border p-2 rounded-lg focus:ring-2 focus-visible:ring-ring focus-visible:border-ring"
                      value={salePrice}
                      onChange={(e) => setSalePrice(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg border border-border">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Total Item Cost</span>
                  <span className="font-medium">{formatMoney(totalItemCost)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Other Costs</span>
                  <span className="font-medium">{formatMoney(Number(otherCost || 0))}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border font-semibold text-primary">
                  <span>Total Cost</span>
                  <span>{formatMoney(totalCost)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Profit</span>
                  <span className={`font-medium ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatMoney(profit)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <FaPercent className="text-muted-foreground" /> Profit Margin
                  </span>
                  <span className={`font-medium ${profitMargin >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {profitMargin}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-gradient-to-r bg-success text-success-foreground hover:bg-success/90 text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
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