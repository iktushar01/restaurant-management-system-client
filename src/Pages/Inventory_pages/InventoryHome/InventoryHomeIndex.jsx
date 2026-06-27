import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaCoins,
  FaBoxOpen,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaFilePdf,
  FaEye,
  FaSignOutAlt,
} from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { inventoryService } from "../../../services/inventoryService";
import { useApiList } from "../../../hooks/useApiList";

const InventoryHomeIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const { data: items, totalEntries, totalPages, loading, error, startIndex } = useApiList(
    inventoryService.items.getAll,
    { searchTerm, currentPage, entriesToShow }
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const columns = [
    { header: "SL No", accessor: "id" },
    { header: "Category", accessor: "category" },
    { header: "SubCategory", accessor: "subCategory" },
    {
      header: "Brand",
      accessor: "brand",
      render: (row) => row.brand || <span className="text-muted-foreground">-</span>,
    },
    { header: "Item", accessor: "item" },
    { header: "Unit", accessor: "unit" },
    {
      header: "Locate",
      accessor: "locate",
      render: (row) => (
        <button
          onClick={() => navigate(`/inventory/locate/${row.id}`)}
          className="flex items-center justify-center p-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
          title="Locate Item"
        >
          <FaEye className="mr-1" /> Locate
        </button>
      ),
    },
    {
      header: "Stock Out",
      accessor: "stockOut",
      render: (row) => (
        <button
          onClick={() => navigate(`/inventory/stock-out/${row.id}`)}
          className="flex items-center justify-center p-2 bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-colors"
          title="Stock Out"
        >
          <FaSignOutAlt className="mr-1" /> Stock Out
        </button>
      ),
    },
  ];

  return (
    <div className="p-6   mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-muted/40 sm:bg-muted/40 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Manage your inventory items and operations</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <Link to="/inventory/pay">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm">
            <FaMoneyBillWave className="text-xl mb-1" /> Pay
          </button>
        </Link>
        <Link to="/inventory/cashback">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r bg-success text-success-foreground text-primary-foreground font-medium rounded-lg hover:bg-success/90 transition-all duration-200 shadow-sm">
            <FaCoins className="text-xl mb-1" /> Cashback
          </button>
        </Link>
        <Link to="/inventory/stock-in">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r bg-accent text-accent-foreground text-primary-foreground font-medium rounded-lg hover:bg-accent/90 transition-all duration-200 shadow-sm">
            <FaBoxOpen className="text-xl mb-1" /> Stock In
          </button>
        </Link>
        <Link to="/inventory/move-stock">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm">
            <FaExchangeAlt className="text-xl mb-1" /> Move Stock
          </button>
        </Link>
        <Link to="/inventory/location">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r bg-destructive text-destructive-foreground text-primary-foreground font-medium rounded-lg hover:bg-destructive/90 transition-all duration-200 shadow-sm">
            <FaMapMarkerAlt className="text-xl mb-1" /> Location
          </button>
        </Link>
        <Link to="/inventory/purchase">
          <button className="w-full flex flex-col items-center justify-center px-4 py-3 bg-gradient-to-r bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm">
            <FaFilePdf className="text-xl mb-1" /> Purchase
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-foreground">Show</span>
          <select
            value={entriesToShow}
            onChange={(e) => { setEntriesToShow(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-border rounded-md px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2 text-foreground">entries</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-foreground">Search:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-3 pr-4 py-1 border border-border rounded-md focus:ring-2 focus-visible:ring-ring focus-visible:border-ring w-full md:w-64"
          />
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading inventory...</div>
      ) : (
        <ReusableTable columns={columns} data={items} />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-foreground">
        <div>
          Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries} entries
        </div>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className={`px-3 py-1 border border-border rounded-md ${currentPage === 1 ? "bg-muted text-muted-foreground" : "bg-muted/40 hover:bg-muted/50"}`}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0} className={`px-3 py-1 border border-border rounded-md ${currentPage === totalPages || totalPages === 0 ? "bg-muted text-muted-foreground" : "bg-muted/40 hover:bg-muted/50"}`}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryHomeIndex;
