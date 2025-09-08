import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const InventoryPurchase = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [items, setItems] = useState([]);

  const [purchaseMaster, setPurchaseMaster] = useState({
    supplierName: "Sakuza Shop",
    memoNo: "wenwenwe sdf",
    purchaseDate: new Date().toLocaleDateString("en-GB"), // Dynamic date
    memoTotal: 0, // Will be calculated
    discount: 3,
    advanceAmount: 435,
    due: 0, // Will be calculated
  });

  // Calculate memo total and due amount whenever items, discount, or advance amount changes
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.subTotal, 0);
    const discountedTotal = total - total * (purchaseMaster.discount / 100);
    const dueAmount = discountedTotal - purchaseMaster.advanceAmount;

    setPurchaseMaster((prev) => ({
      ...prev,
      memoTotal: discountedTotal,
      due: dueAmount,
    }));
  }, [items, purchaseMaster.discount, purchaseMaster.advanceAmount]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Add your API call here
  };

  const addNewItem = () => {
    const newItem = {
      id: Date.now(), // Better ID generation
      item: "",
      location: "",
      quantity: 0,
      unit: "KG", // Default value
      price: 0,
      itemVar: 0,
      subTotal: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };

        // Calculate subTotal if quantity, price, or itemVar changes
        if (field === "quantity" || field === "price" || field === "itemVar") {
          const quantity =
            field === "quantity"
              ? parseFloat(value) || 0
              : parseFloat(item.quantity) || 0;
          const price =
            field === "price"
              ? parseFloat(value) || 0
              : parseFloat(item.price) || 0;
          const itemVar =
            field === "itemVar"
              ? parseFloat(value) || 0
              : parseFloat(item.itemVar) || 0;

          // Calculate subtotal: quantity * price with variation percentage
          updatedItem.subTotal = quantity * price * (1 + itemVar / 100);
        }

        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
  };

  const handleMasterChange = (field, value) => {
    setPurchaseMaster((prev) => {
      const updated = { ...prev, [field]: value };

      // Recalculate due amount if discount or advance amount changes
      if (field === "discount" || field === "advanceAmount") {
        const total = items.reduce((sum, item) => sum + item.subTotal, 0);
        const discountedTotal = total - total * (updated.discount / 100);
        updated.due = discountedTotal - updated.advanceAmount;
        updated.memoTotal = discountedTotal;
      }

      return updated;
    });
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <div className="p-6 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-2xl flex-grow">
          <h2 className="text-2xl font-bold text-gray-800">Purchase Details</h2>
          <p className="text-gray-700 mt-1">
            Fill in the purchase details below
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Purchase Details Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Purchase Details
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Item
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Location
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Unit
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Price
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Item Var (%)
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Sub Total
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          value={item.item}
                          onChange={(e) =>
                            handleItemChange(item.id, "item", e.target.value)
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          value={item.location}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "location",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              "quantity",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm sm:text-base"
                          value={item.unit}
                          onChange={(e) =>
                            handleItemChange(item.id, "unit", e.target.value)
                          }
                        >
                          <option value="KG">KG</option>
                          <option value="PCS">PCS</option>
                          <option value="L">L</option>
                          <option value="M">M</option>
                        </select>
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(item.id, "price", e.target.value)
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          value={item.itemVar}
                          onChange={(e) =>
                            handleItemChange(item.id, "itemVar", e.target.value)
                          }
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100"
                          value={item.subTotal.toFixed(2)}
                          readOnly
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 font-medium"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length <= 1}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={addNewItem}
            >
              Add Item
            </button>
          </div>

          {/* Divider */}
          <hr className="my-8 border-t border-gray-300" />

          {/* Purchase Master */}
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Purchase Master
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all"
                value={purchaseMaster.supplierName}
                onChange={(e) =>
                  handleMasterChange("supplierName", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Memo No
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all"
                value={purchaseMaster.memoNo}
                onChange={(e) => handleMasterChange("memoNo", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all"
                value={purchaseMaster.purchaseDate}
                onChange={(e) =>
                  handleMasterChange("purchaseDate", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Memo Total
              </label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all bg-gray-100"
                value={purchaseMaster.memoTotal.toFixed(2)}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all"
                value={purchaseMaster.discount}
                onChange={(e) =>
                  handleMasterChange(
                    "discount",
                    parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Advance Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all"
                value={purchaseMaster.advanceAmount}
                onChange={(e) =>
                  handleMasterChange(
                    "advanceAmount",
                    parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Amount
              </label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 outline-none transition-all bg-gray-100"
                value={purchaseMaster.due.toFixed(2)}
                readOnly
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer"
            >
              Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryPurchase;
