import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaImage } from "react-icons/fa";

const FoodMenuTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const foodItems = [
    { ID: 1, foodNo: "01", foodName: "Chicken Satay", categoryName: "Appetizer (Thai)", price: 395.00, hasImage: true },
    { ID: 2, foodNo: "02", foodName: "Fried/Grilled Chicken Wings", categoryName: "Appetizer (Thai)", price: 320.00, hasImage: true },
    { ID: 3, foodNo: "03", foodName: "Fish Finger (Pla Chup Pang Tod)", categoryName: "Appetizer (Thai)", price: 360.00, hasImage: true },
    { ID: 4, foodNo: "04", foodName: "Butter Fried Prawn", categoryName: "Appetizer (Thai)", price: 380.00, hasImage: true },
    { ID: 5, foodNo: "05", foodName: "Drums of Haven", categoryName: "Appetizer (Thai)", price: 360.00, hasImage: true },
    { ID: 6, foodNo: "06", foodName: "Tempura Vegetable", categoryName: "Appetizer (Thai)", price: 280.00, hasImage: true },
    { ID: 7, foodNo: "07", foodName: "Tempura Mixed", categoryName: "Appetizer (Thai)", price: 380.00, hasImage: true },
    { ID: 8, foodNo: "08", foodName: "Doval Spring Doll", categoryName: "Appetizer (Thai)", price: 320.00, hasImage: true },
  ];

  const filteredItems = foodItems.filter(item => 
    item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.foodNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: "Food No",
      accessor: "foodNo",
    },
    {
      header: "Food Name",
      accessor: "foodName",
    },
    {
      header: "Category Name",
      accessor: "categoryName",
    },
    {
      header: "Price",
      accessor: "price",
      render: (row) => `฿${row.price.toFixed(2)}`,
    },
    {
      header: "Image",
      accessor: "hasImage",
      render: (row) => (
        row.hasImage ? (
          <span className="text-green-600 flex items-center">
            <FaImage className="mr-1" /> Yes
          </span>
        ) : (
          <span className="text-red-600">No</span>
        )
      ),
    },
  ];

  const actions = [
    {
      label: "Add",
      icon: FaPlus,
      className: "text-indigo-600 hover:text-indigo-900",
      render: (row) => (
        <Link
          to={`/food/menu/edit/${row.ID}`}
          className="flex items-center space-x-1"
        >
          <FaEdit />
         
        </Link>
      ),
    },
   
  ];

  return (
    <div className="p-6 max-w-7xl min-h-screen mx-auto">

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-800">ITEMS</h2>
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search items..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Food Items Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.ID} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.render
                        ? column.render(item)
                        : item[column.accessor]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick && action.onClick(item)}
                          className={`flex items-center space-x-1 text-sm font-medium ${action.className}`}
                        >
                          {action.icon && <action.icon />}
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">No food items found</div>
            <div className="text-gray-400 text-sm">
              {searchTerm ? "Try a different search term" : "Get started by adding a new food item"}
            </div>
          </div>
        )}
      </div>

      {foodItems.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No food items found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating a new food item
          </p>
          <Link to="create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 text-white font-medium rounded-lg hover:from-amber-500 hover:to-amber-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Add Food Item
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FoodMenuTable;