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
          <h2 className="text-2xl font-bold text-foreground">Item Detail Info</h2>
          <p className="text-foreground mt-1">{itemName && `Stock locations for ${itemName}`}</p>
        </div>

        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : tableData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No stock recorded for this item yet.</div>
          ) : (
            <ReusableTable columns={columns} data={tableData} theadClassName="bg-muted/40" />
          )}
        </div>

        <div className="p-6 border-t border-border flex justify-end">
          <Link to="/inventory" className="px-5 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted/40">Close</Link>
        </div>
      </div>
    </div>
  );
};

export default InventoryHomeLocateById;
