import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { inventoryService } from "../../../services/inventoryService";

const InventoryHomeLocateById = () => {
  const { id } = useParams();
  const [itemName, setItemName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [itemRes, stockRes] = await Promise.all([
          inventoryService.items.getById(id),
          inventoryService.stock.list({ itemId: id }),
        ]);
        setItemName(itemRes.data.name);
        setTableData(stockRes.data || []);
      } catch (err) {
        setError(err.message || "Failed to load stock locations");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const columns = [
    { header: "SI No", accessor: "siNo" },
    { header: "Item Name", accessor: "itemName" },
    { header: "Location", accessor: "location" },
    { header: "Remaining Stock", accessor: "stockFormatted" },
  ];

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
          <h2 className="text-2xl font-bold text-gray-800">Item Detail Info</h2>
          <p className="text-gray-700 mt-1">{itemName && `Stock locations for ${itemName}`}</p>
        </div>

        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : tableData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No stock recorded for this item yet.</div>
          ) : (
            <ReusableTable columns={columns} data={tableData} theadClassName="bg-gray-50" />
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Link to="/inventory" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</Link>
        </div>
      </div>
    </div>
  );
};

export default InventoryHomeLocateById;
