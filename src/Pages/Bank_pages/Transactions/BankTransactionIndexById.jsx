import React, { useCallback, useEffect, useState } from "react";
import { formatMoney } from "@/lib/currency";
import { SelectField } from "@/Shared/FormSelect/FormSelect";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";
import { Link, useParams } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { bankService } from "../../../services/bankService";
import { useApiList } from "../../../hooks/useApiList";

const mapTransactionRow = (txn) => ({
  ...txn,
  transactionType: txn.type === "DEPOSIT" ? "Deposit" : "Withdraw",
  particulars: txn.note,
  deposit: txn.type === "DEPOSIT" ? txn.amount : 0,
  withdrawn: txn.type === "WITHDRAW" ? txn.amount : 0,
});

const BankTransactionIndexById = () => {
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [accountError, setAccountError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTransactions = useCallback(
    (params) => bankService.transactions.getAll({ ...params, accountId }),
    [accountId]
  );

  const { data: rawTransactions, totalEntries, totalPages, loading, error, refetch, startIndex } = useApiList(
    fetchTransactions,
    { searchTerm, currentPage, entriesToShow }
  );

  useEffect(() => {
    bankService.accounts.getById(accountId)
      .then((res) => setAccount(res.data))
      .catch((err) => setAccountError(err.message || "Failed to load account"));
  }, [accountId]);

  const handleDelete = async (id) => {
    const ok = await confirm({ description: "Are you sure you want to delete this transaction?" });
    if (!ok) return;
    try {
        await bankService.transactions.delete(id);
        refetch();
      } catch (err) {
        toast.error(err.message || "Failed to delete");
      }
  };

  const transactions = rawTransactions.map(mapTransactionRow);

  const columns = [
    { header: "SL No", accessor: "ID" },
    { header: "Date", accessor: "date" },
    { header: "Transaction Type", accessor: "transactionType" },
    { header: "Particulars", accessor: "particulars" },
    {
      header: "Deposit",
      accessor: "deposit",
      render: (row) => (row.deposit > 0 ? formatMoney(row.deposit) : "-"),
    },
    {
      header: "Withdrawn",
      accessor: "withdrawn",
      render: (row) => (row.withdrawn > 0 ? formatMoney(row.withdrawn) : "-"),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex space-x-2">
          <Link to={`Edit/${row.id}`} className="text-primary hover:text-primary/80">
            <FaEdit className="inline mr-1" /> Edit
          </Link>
          <button onClick={() => handleDelete(row.id)} className="text-destructive hover:text-destructive/80">
            <FaTrash className="inline mr-1" /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6   mx-auto">
      <div className="mt-6 bg-muted/40 border border-border rounded-xl shadow-xs overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Account Information</h3>
        </div>
        {accountError && <div className="p-5 text-sm text-destructive">{accountError}</div>}
        {account && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            <div className="flex items-center">
              <div className="w-32 text-sm font-medium text-muted-foreground">Bank Name</div>
              <div className="text-sm font-semibold text-foreground">{account.bankName}</div>
            </div>
            <div className="flex items-center">
              <div className="w-32 text-sm font-medium text-muted-foreground">Branch Name</div>
              <div className="text-sm font-semibold text-foreground">{account.branchName}</div>
            </div>
            <div className="flex items-center">
              <div className="w-32 text-sm font-medium text-muted-foreground">Account No</div>
              <div className="text-sm font-semibold text-foreground">{account.accountNo}</div>
            </div>
            <div className="flex items-center">
              <div className="w-32 text-sm font-medium text-muted-foreground">Account Name</div>
              <div className="text-sm font-semibold text-foreground">{account.accountName}</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-muted/40 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Bank Transactions</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage your organization's bank account information
          </p>
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
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus-visible:ring-ring focus-visible:border-ring w-full md:w-64"
          />
        </div>
      </div>

      {(error || accountError) && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error || accountError}</div>
      )}

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <ReusableTable columns={columns} data={transactions} className="mt-6" />
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

      {!loading && transactions.length === 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">No transactions found</h3>
          <p className="text-muted-foreground mb-6">Get started by creating a new transaction</p>
          <Link to="Create">
            <button className="px-5 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Create Transaction
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BankTransactionIndexById;
