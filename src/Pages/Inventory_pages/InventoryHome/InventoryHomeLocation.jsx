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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link to="/inventory" className="flex items-center group transition-all duration-200">
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            Back to Inventory
          </button>
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 bg-gradient-to-r bg-accent text-accent-foreground border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Stock by Location</h2>
          <p className="text-foreground mt-1">View inventory at each stock location</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-1">Select Location</label>
            <select
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none"
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
            <h3 className="text-xl text-foreground text-center bg-amber-100 p-4 font-bold rounded-xl mb-4">{selectedName}</h3>
          )}

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading stock...</div>
          ) : selectedLocationId && stockData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No stock at this location.</div>
          ) : selectedLocationId ? (
            <ReusableTable columns={columns} data={stockData} theadClassName="bg-muted/40" />
          ) : null}
        </div>

        <div className="p-6 border-t border-border flex justify-end">
          <Link to="/inventory" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
        </div>
      </div>
    </div>
  );
};

export default InventoryHomeLocation;
