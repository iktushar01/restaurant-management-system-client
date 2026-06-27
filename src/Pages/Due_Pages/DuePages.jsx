import React, { useState } from "react";
import { formatMoney } from "@/lib/currency";
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import ReusableTable from "../../Shared/ReusableTable/ReusableTable";
import { dueService } from "../../services/dueService";
import { useApiList } from "../../hooks/useApiList";

const DuePages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: dueData, totalEntries, totalPages, loading, error, refetch, startIndex } = useApiList(
    dueService.entries.getAll,
    { searchTerm, currentPage, entriesToShow }
  );

  const handleDelete = async (id) => {
    const ok = await confirm({ description: "Are you sure you want to delete this record?" });
    if (!ok) return;
    try {
        await dueService.entries.delete(id);
        refetch();
      } catch (err) {
        toast.error(err.message || "Failed to delete");
      }
  };

  const columns = [
    { header: "Guest Name", accessor: "guestName" },
    { header: "Phone No", accessor: "phoneNo" },
    {
      header: "Total Due Amount",
      accessor: "totalDueAmount",
      render: (row) => formatMoney(row.totalDueAmount))},
    },
    { header: "Payment Method", accessor: "paymentMethod" },
    {
      header: "Pay Amount",
      accessor: "payAmount",
      render: (row) => formatMoney(row.payAmount))},
    },
  ];

  const actions = [
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
    <div className="p-6    mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-card p-4 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Due Management</h1>
          <p className="text-muted-foreground mt-1">Manage guest due payments</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 bg-card p-4 rounded-lg shadow">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <SelectField
            value={entriesToShow}
            onValueChange={(v) => { setEntriesToShow(Number(v)); setCurrentPage(1); }}
            className="w-20"
            options={[{ value: "10", label: "10" }, { value: "25", label: "25" }, { value: "50", label: "50" }, { value: "100", label: "100" }]}
          />
          <span className="text-sm text-muted-foreground">entries</span>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary w-full"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
          <FaSearch className="absolute left-3 top-3 text-muted-foreground" />
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <ReusableTable
          columns={columns}
          data={dueData}
          actions={actions}
          containerClass="bg-card rounded-lg shadow overflow-hidden"
          tableClass="min-w-full divide-y divide-border"
          theadClass="bg-muted"
          thClass="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
          tbodyClass="bg-card divide-y divide-border"
          tdClass="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground"
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 bg-card p-4 rounded-lg shadow">
        <div className="text-sm text-muted-foreground">
          Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-border rounded text-sm ${currentPage === 1 ? "text-muted-foreground bg-muted" : "text-muted-foreground hover:bg-muted/40"}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border border-border rounded text-sm ${currentPage === totalPages || totalPages === 0 ? "text-muted-foreground bg-muted" : "text-muted-foreground hover:bg-muted/40"}`}
          >
            Next
          </button>
        </div>
      </div>

      {!loading && totalEntries === 0 && (
        <div className="bg-card rounded-lg shadow-sm border border-border p-8 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">No due records found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm ? "Try a different search term" : "Get started by creating a new payment record"}
          </p>
          <Link to="Create">
            <button className="px-5 py-2.5 bg-primary text-foreground font-medium rounded-lg hover:bg-primary transition-colors inline-flex items-center">
              <FaPlus className="mr-2" />
              New Payment
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DuePages;
