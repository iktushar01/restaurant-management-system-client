import React, { useState, useEffect } from 'react';
import { dineTableService } from '../../services/dineTableService';
import { waiterService } from '../../services/waiterService';

const ORDER_TYPES = [
  { label: 'Dine In', value: 'DINE_IN' },
  { label: 'Takeaway', value: 'TAKEAWAY' },
  { label: 'Delivery', value: 'DELIVERY' },
];

const OrderManagement = ({ orderDetails, setOrderDetails }) => {
  const [showTableDropdown, setShowTableDropdown] = useState(false);
  const [tables, setTables] = useState([]);
  const [waiters, setWaiters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [tablesRes, waitersRes] = await Promise.all([
          dineTableService.getAllSimple(),
          waiterService.getAllSimple(),
        ]);
        setTables(tablesRes.data || []);
        setWaiters(waitersRes.data || []);
      } catch (err) {
        console.error('Failed to load order options:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (field, value) => {
    setOrderDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleTableSelect = (tableId) => {
    setOrderDetails(prev => {
      const updatedTables = prev.tableIds.includes(tableId)
        ? prev.tableIds.filter(t => t !== tableId)
        : [...prev.tableIds, tableId];
      return { ...prev, tableIds: updatedTables };
    });
  };

  const selectedTableLabels = tables
    .filter(t => orderDetails.tableIds.includes(t.id))
    .map(t => t.tableNo);

  if (loading) {
    return (
      <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md text-center text-gray-500">
        Loading order options...
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 py-6 rounded-3xl text-center bg-red-100 p-6">Order Management</h2>
      
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Type *</label>
          <select
            value={orderDetails.orderType || ''}
            onChange={(e) => handleChange("orderType", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Order Type</option>
            {ORDER_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Served By *</label>
          <select
            value={orderDetails.waiterId || ''}
            onChange={(e) => handleChange("waiterId", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Staff</option>
            {waiters.map((waiter) => (
              <option key={waiter.id} value={waiter.id}>{waiter.name}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px] relative md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Alloted Tables *</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTableDropdown(!showTableDropdown)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-left flex justify-between items-center bg-white"
            >
              <span>
                {orderDetails.tableIds.length > 0
                  ? `${orderDetails.tableIds.length} table(s): ${selectedTableLabels.join(', ')}`
                  : "Select tables"}
              </span>
              <span>{showTableDropdown ? '▲' : '▼'}</span>
            </button>
            
            {showTableDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {tables.map((table) => (
                  <div 
                    key={table.id}
                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleTableSelect(table.id)}
                  >
                    <input
                      type="checkbox"
                      checked={orderDetails.tableIds.includes(table.id)}
                      onChange={() => handleTableSelect(table.id)}
                      className="mr-3 h-4 w-4 text-blue-600"
                    />
                    <span>{table.tableNo} ({table.location}) - {table.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">No. of Persons</label>
          <input
            type="number"
            min="1"
            value={orderDetails.persons || ''}
            onChange={(e) => handleChange("persons", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter number of persons"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
        <textarea
          value={orderDetails.notes || ''}
          onChange={(e) => handleChange("notes", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Any special instructions..."
        />
      </div>
    </div>
  );
};

export default OrderManagement;
