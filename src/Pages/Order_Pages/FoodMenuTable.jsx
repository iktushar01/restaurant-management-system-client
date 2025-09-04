import React, { useState } from "react";

const FoodMenuTable = ({ onAddItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const foodItems = [
    {
      id: 1,
      name: "Chicken Satay",
      category: "Appetizer (Thai)",
      foodNumber: "01",
      price: 395.0,
      hasImage: true,
    },
    {
      id: 2,
      name: "Fried/Grilled Chicken Wings",
      category: "Appetizer (Thai)",
      foodNumber: "02",
      price: 320.0,
      hasImage: true,
    },
    {
      id: 3,
      name: "Fish Finger (Pla Chup Pang Tod)",
      category: "Appetizer (Thai)",
      foodNumber: "03",
      price: 360.0,
      hasImage: true,
    },
    {
      id: 4,
      name: "Butter Fried Prawn",
      category: "Appetizer (Thai)",
      foodNumber: "04",
      price: 380.0,
      hasImage: true,
    },
    {
      id: 5,
      name: "Drums of Haven",
      category: "Appetizer (Thai)",
      foodNumber: "05",
      price: 360.0,
      hasImage: true,
    },
    {
      id: 6,
      name: "Tempura Vegetable",
      category: "Appetizer (Thai)",
      foodNumber: "06",
      price: 280.0,
      hasImage: true,
    },
    {
      id: 7,
      name: "Tempura Mixed",
      category: "Appetizer (Thai)",
      foodNumber: "07",
      price: 380.0,
      hasImage: true,
    },
    {
      id: 8,
      name: "Royal Spring Roll",
      category: "Appetizer (Thai)",
      foodNumber: "08",
      price: 320.0,
      hasImage: true,
    },
  ];

  // Get unique categories
  const categories = [
    "All",
    ...new Set(foodItems.map((item) => item.category)),
  ];

  // Request sort
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort items
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...foodItems];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [foodItems, sortConfig]);

  // Filter items
  const filteredItems = sortedItems.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.foodNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || item.category === selectedCategory)
  );

  // Sort indicator component
  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <span className="sort-indicator">↕</span>;
    }
    return (
      <span className="sort-indicator">
        {sortConfig.direction === "ascending" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Food Menu
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search food..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-4 text-gray-500 text-lg">No food items found.</p>
        </div>
      ) : (
        <>
          {/* Card view for small screens */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {filteredItems.map((food) => (
              <div
                key={food.id}
                className="border border-gray-200 rounded-xl overflow-hidden p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-2">
                      #{food.foodNumber}
                    </span>
                    <h3 className="font-semibold text-gray-800">{food.name}</h3>
                  </div>
                  {food.hasImage && (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{food.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    ฿{food.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onAddItem(food)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Table view for medium and large screens */}
          <div className="hidden sm:block overflow-x-auto rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("foodNumber")}
                  >
                    <div className="flex items-center">
                      No
                      <SortIndicator columnKey="foodNumber" />
                    </div>
                  </th>
                  <th
                    className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Food Name
                      <SortIndicator columnKey="name" />
                    </div>
                  </th>
                  <th
                    className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("category")}
                  >
                    <div className="flex items-center">
                      Category
                      <SortIndicator columnKey="category" />
                    </div>
                  </th>
                  <th
                    className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("price")}
                  >
                    <div className="flex items-center">
                      Price
                      <SortIndicator columnKey="price" />
                    </div>
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((food) => (
                  <tr
                    key={food.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 whitespace-nowrap">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {food.foodNumber}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {food.name}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-gray-600">
                      {food.category}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm font-bold text-blue-600">
                      ฿{food.price.toFixed(2)}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {food.hasImage ? (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <button
                        onClick={() => onAddItem(food)}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodMenuTable;
