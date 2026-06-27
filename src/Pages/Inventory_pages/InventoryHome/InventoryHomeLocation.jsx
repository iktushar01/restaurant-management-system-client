import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { inventoryService } from "../../../services/inventoryService";

const InventoryHomeLocation = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inventoryService.stockLocations.getAll({ limit: 100 })
      .then((res) => setLocations(res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedLocationId) {
      setStockData([]);
      return;
    }
    setLoading(true);
    inventoryService.stock.list({ locationId: selectedLocationId })
      .then((res) => setStockData(res.data || []))
      .finally(() => setLoading(false));
  }, [selectedLocationId]);

  const columns = [
    { header: "SI No", accessor: "siNo" },
    { header: "Item Name", accessor: "itemName" },
    { header: "Location", accessor: "location" },
    { header: "Stock", accessor: "stockFormatted" },
  ];

  const selectedName = locations.find((l) => l.id === selectedLocationId)?.name;

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/inventory" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Inventory
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-200 to-purple-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Stock by Location</h2>
          <p className="text-gray-700 mt-1">View inventory at each stock location</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Location</label>
            <select
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none"
              value={selectedLocationId}
              onChange={(e) => setSelectedLocationId(e.target.value)}
            >
              <option value="">--Select Location--</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>

          {selectedName && (
            <h3 className="text-xl text-gray-800 text-center bg-amber-100 p-4 font-bold rounded-xl mb-4">{selectedName}</h3>
          )}

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading stock...</div>
          ) : selectedLocationId && stockData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No stock at this location.</div>
          ) : selectedLocationId ? (
            <ReusableTable columns={columns} data={stockData} theadClassName="bg-gray-50" />
          ) : null}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Link to="/inventory" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</Link>
        </div>
      </div>
    </div>
  );
};

export default InventoryHomeLocation;
