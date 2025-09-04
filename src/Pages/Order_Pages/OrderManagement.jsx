import React, { useState } from 'react';

const OrderManagement = ({ orderDetails, setOrderDetails }) => {
  const [showTableDropdown, setShowTableDropdown] = useState(false);

  const tables = ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5", "Table 6"];
  const staffMembers = ["John", "Alice", "Michael", "Sophia", "Robert", "Emma"];
  const orderTypes = ["Dine In", "Takeaway", "Delivery"];

  const handleChange = (field, value) => {
    setOrderDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleTableSelect = (table) => {
    setOrderDetails(prev => {
      const updatedTables = prev.tables.includes(table)
        ? prev.tables.filter(t => t !== table)
        : [...prev.tables, table];
      return { ...prev, tables: updatedTables };
    });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 py-6 rounded-3xl text-center bg-red-100 p-6">Order Management</h2>
      
      <div className="flex flex-wrap gap-6 mb-6">
        {/* Order Type */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Type *</label>
          <select
            value={orderDetails.orderType || ''}
            onChange={(e) => handleChange("orderType", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Order Type</option>
            {orderTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Served By */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Served By *</label>
          <select
            value={orderDetails.staff || ''}
            onChange={(e) => handleChange("staff", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Staff</option>
            {staffMembers.map((staff) => (
              <option key={staff} value={staff}>
                {staff}
              </option>
            ))}
          </select>
        </div>

        {/* Alloted Tables Dropdown */}
        <div className="flex-1 min-w-[200px] relative md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Alloted Tables *</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTableDropdown(!showTableDropdown)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-left flex justify-between items-center bg-white"
            >
              <span>{orderDetails.tables && orderDetails.tables.length > 0 ? `${orderDetails.tables.length} table(s) selected` : "Select tables"}</span>
              <span className="transform transition-transform duration-200">
                {showTableDropdown ? '▲' : '▼'}
              </span>
            </button>
            
            {showTableDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {tables.map((table) => (
                  <div 
                    key={table} 
                    className={`p-3 cursor-pointer hover:bg-blue-50 flex items-center ${orderDetails.tables && orderDetails.tables.includes(table) ? 'bg-blue-50' : ''}`}
                    onClick={() => handleTableSelect(table)}
                  >
                    <input 
                      type="checkbox" 
                      checked={orderDetails.tables && orderDetails.tables.includes(table)} 
                      onChange={() => {}} 
                      className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    {table}
                  </div>
                ))}
              </div>
            )}
          </div>
          {orderDetails.tables && orderDetails.tables.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {orderDetails.tables.map(table => (
                <span key={table} className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1.5 rounded-md">
                  {table}
                  <button 
                    type="button"
                    onClick={() => handleTableSelect(table)}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Number of Persons */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Persons</label>
          <input
            type="number"
            min="1"
            value={orderDetails.persons || ''}
            onChange={(e) => handleChange("persons", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>

        {/* Notes */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={orderDetails.notes || ''}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter special notes or instructions"
            rows="3"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;