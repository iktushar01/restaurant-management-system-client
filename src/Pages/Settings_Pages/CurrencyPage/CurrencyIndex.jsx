import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaStar } from "react-icons/fa";
import { toast } from "sonner";
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { currencyService } from "../../../services/currencyService";
import { useApiList } from "../../../hooks/useApiList";
import { useCurrency } from "@/context/CurrencyProvider";

const CurrencyIndex = () => {
  const { confirm } = useConfirmDialog();
  const { refreshCurrency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: currencies, totalEntries, totalPages, loading, refetch, startIndex } = useApiList(
    currencyService.getAll,
    { searchTerm, currentPage, entriesToShow }
  );

  const handleDelete = async (id) => {
    const ok = await confirm({ description: "Delete this currency?" });
    if (!ok) return;
    try {
      await currencyService.delete(id);
      await refreshCurrency();
      refetch();
      toast.success("Currency deleted");
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await currencyService.setDefault(id);
      await refreshCurrency();
      refetch();
      toast.success("Default currency updated");
    } catch (err) {
      toast.error(err.message || "Failed to set default");
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Code", accessor: "code" },
    { header: "Symbol", accessor: "symbol" },
    {
      header: "Position",
      accessor: "symbolPosition",
      render: (row) => (row.symbolPosition === "AFTER" ? "After amount" : "Before amount"),
    },
    { header: "Decimals", accessor: "decimalPlaces" },
    {
      header: "Default",
      accessor: "isDefault",
      render: (row) =>
        row.isDefault ? (
          <span className="px-2 py-1 rounded-full text-xs bg-primary/10 text-primary font-medium">Default</span>
        ) : (
          <button
            type="button"
            onClick={() => handleSetDefault(row.id)}
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
          >
            <FaStar className="size-3" /> Set default
          </button>
        ),
    },
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      render: (row) => (
        <Link to={`edit/${row.id}`} className="flex items-center gap-1 text-primary hover:text-primary/80">
          <FaEdit /> Edit
        </Link>
      ),
    },
    {
      label: "Delete",
      icon: FaTrash,
      render: (row) => (
        <button
          type="button"
          onClick={() => handleDelete(row.id)}
          className="flex items-center gap-1 text-destructive hover:text-destructive/80"
        >
          <FaTrash /> Delete
        </button>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-muted/40 p-4 rounded-xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Currencies</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage symbols used across the app for money values</p>
        </div>
        <Link to="create">
          <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            <FaPlus className="mr-2" /> Add Currency
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">Show</span>
          <SelectField
            value={entriesToShow}
            onValueChange={(v) => { setEntriesToShow(Number(v)); setCurrentPage(1); }}
            className="w-20"
            options={[
              { value: "10", label: "10" },
              { value: "25", label: "25" },
              { value: "50", label: "50" },
            ]}
          />
          <span className="text-sm text-foreground">entries</span>
        </div>
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search currencies..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-10 pr-4 py-2 border border-border rounded-md w-full"
          />
        </div>
      </div>

      <ReusableTable
        columns={columns}
        data={currencies}
        actions={actions}
        loading={loading}
        startIndex={startIndex}
      />

      <div className="flex flex-wrap gap-2 mt-4 justify-end">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border border-border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-3 py-1 text-sm text-muted-foreground">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border border-border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{totalEntries} total currencies</p>
    </div>
  );
};

export default CurrencyIndex;
