import React, { useState } from "react";
import { formatMoney } from "@/lib/currency";
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { Link } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { inventoryService } from "../../../services/inventoryService";
import { useApiList } from "../../../hooks/useApiList";

const PurchaseDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: purchaseMemos, totalEntries, totalPages, loading, error, startIndex } = useApiList(
    inventoryService.purchases.getAll,
    { searchTerm, currentPage, entriesToShow }
  );

  const columns = [
    {
      header: "SL No",
      accessor: "id",
    },
    {
      header: "Memo No",
      accessor: "memoNo",
    },
    {
      header: "Supplier Name",
      accessor: "supplierName",
    },
    {
      header: "Total",
      accessor: "total",
      render: (row) => {formatMoney(parseFloat(row.total).toLocaleString())},
    },
    {
      header: "Purchase Date",
      accessor: "purchaseDate",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Paid"
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6   mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-muted/40 sm:bg-muted/40 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Purchase Memos
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage your purchase memos
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-foreground">Show</span>
          <SelectField
            value={entriesToShow}
            onValueChange={(v) => { setEntriesToShow(Number(v)); setCurrentPage(1); }}
            className="w-20"
            options={[{ value: "10", label: "10" }, { value: "25", label: "25" }, { value: "50", label: "50" }, { value: "100", label: "100" }]}
          />
          <span className="ml-2 text-foreground">entries</span>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search memos..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus-visible:ring-ring focus-visible:border-ring w-full md:w-64"
          />
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <ReusableTable columns={columns} data={purchaseMemos} />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-foreground">
        <div>
          Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries} entries
        </div>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-border rounded-md ${currentPage === 1 ? "bg-muted text-muted-foreground" : "bg-muted/40 hover:bg-muted/50"}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border border-border rounded-md ${currentPage === totalPages || totalPages === 0 ? "bg-muted text-muted-foreground" : "bg-muted/40 hover:bg-muted/50"}`}
          >
            Next
          </button>
        </div>
      </div>

      {!loading && totalEntries === 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">
            No purchase memos found
          </h3>
          <p className="text-muted-foreground mb-6">
            Get started by adding a new purchase memo
          </p>
          <Link to="create">
            <button className="px-5 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Add New Memo
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PurchaseDetails;
