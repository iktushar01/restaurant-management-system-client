import React, { useState } from "react";
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { financeService } from "../../../services/financeService";
import { useApiList } from "../../../hooks/useApiList";

const OtherIncomeIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: entries, totalEntries, totalPages, loading, error, refetch, startIndex } = useApiList(
    financeService.incomeEntries.getAll,
    { searchTerm, currentPage, entriesToShow }
  );

  const handleDelete = async (id) => {
    const ok = await confirm({ description: "Are you sure you want to delete this income record?" });
    if (!ok) return;
    try {
        await financeService.incomeEntries.delete(id);
        refetch();
      } catch (err) {
        toast.error(err.message || "Failed to delete");
      }
  };

  const columns = [
    { header: "SL No", accessor: "ID" },
    { header: "Others Income Head Name", accessor: "incomeHeadName" },
    { header: "Amount", accessor: "amount", render: (row) => Number(row.amount).toFixed(2) },
    { header: "Note", accessor: "note", render: (row) => row.note || <span className="text-muted-foreground">-</span> },
    { header: "Date", accessor: "date" },
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-primary hover:text-primary/80",
      render: (row) => (
        <Link to={`/income/OthersIncome/Edit/${row.id}`} className="flex items-center space-x-1">
          <FaEdit className="inline mr-1" />
          <span>Edit</span>
        </Link>
      ),
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-destructive hover:text-destructive/80",
      render: (row) => (
        <button onClick={() => handleDelete(row.id)} className="flex items-center space-x-1 text-destructive hover:text-destructive/80">
          <FaTrash className="inline mr-1" />
          <span>Delete</span>
        </button>
      ),
    },
  ];

  return (
    <div className="p-6   mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-muted/40 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Others Income</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">Manage your organization's other income records</p>
        </div>
        <Link to="Create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlus className="mr-2" />
            Create New
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-foreground">Show</span>
          <SelectField
            value={entriesToShow}
            onValueChange={(v) => { setEntriesToShow(Number(v)); setCurrentPage(1); }}
            className="w-20"
            options={[{ value: "10", label: "10" }, { value: "25", label: "25" }, { value: "50", label: "50" }]}
          />
          <span className="ml-2 text-foreground">entries</span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search income records..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus-visible:ring-ring focus-visible:border-ring w-full md:w-64"
          />
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
      {loading ? <div className="text-center py-12 text-muted-foreground">Loading...</div> : (
        <ReusableTable columns={columns} data={entries} actions={actions} className="mt-6" />
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
    </div>
  );
};

export default OtherIncomeIndex;
