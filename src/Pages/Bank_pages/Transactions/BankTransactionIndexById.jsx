import React, { useCallback, useEffect, useState } from "react";
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
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await bankService.transactions.delete(id);
        refetch();
      } catch (err) {
        alert(err.message || "Failed to delete");
      }
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
      render: (row) => (row.deposit > 0 ? row.deposit.toFixed(2) : "-"),
    },
    {
      header: "Withdrawn",
      accessor: "withdrawn",
      render: (row) => (row.withdrawn > 0 ? row.withdrawn.toFixed(2) : "-"),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex space-x-2">
          <Link to={`Edit/${row.id}`} className="text-blue-600 hover:text-blue-900">
            <FaEdit className="inline mr-1" /> Edit
          </Link>
          <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900">
            <FaTrash className="inline mr-1" /> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      <div className="mt-6 bg-gray-50 border border-gray-100 rounded-xl shadow-xs overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Account Information</h3>
        </div>
        {accountError && <div className="p-5 text-sm text-red-600">{accountError}</div>}
        {account && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            <div className="flex items-center">
              <div className="w-32 text-sm font-medium text-gray-500">Bank Name</div>
              <div className="text-sm font-semibold text-gray-700">{account.bankName}</div>
            </div>
            <div className="flex items-center">
              <div className="w-32 text-sm font-medium text-gray-500">Branch Name</div>
              <div className="text-sm font-semibold text-gray-700">{account.branchName}</div>
            </div>
            <div className="flex items-center">
              <div className="w-32 text-sm font-medium text-gray-500">Account No</div>
              <div className="text-sm font-semibold text-gray-700">{account.accountNo}</div>
            </div>
            <div className="flex items-center">
              <div className="w-32 text-sm font-medium text-gray-500">Account Name</div>
              <div className="text-sm font-semibold text-gray-700">{account.accountName}</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gray-50 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bank Transactions</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your organization's bank account information
          </p>
        </div>
        <Link to="Create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlus className="mr-2" />
            Create New
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Show</span>
          <select
            value={entriesToShow}
            onChange={(e) => { setEntriesToShow(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="ml-2 text-gray-700">entries</span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 w-full md:w-64"
          />
        </div>
      </div>

      {(error || accountError) && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error || accountError}</div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <ReusableTable columns={columns} data={transactions} className="mt-6" />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 text-sm text-gray-700">
        <div>
          Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesToShow, totalEntries)} of {totalEntries} entries
        </div>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-50 hover:bg-gray-100"}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border border-gray-300 rounded-md ${currentPage === totalPages || totalPages === 0 ? "bg-gray-100 text-gray-400" : "bg-gray-50 hover:bg-gray-100"}`}
          >
            Next
          </button>
        </div>
      </div>

      {!loading && transactions.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
          <p className="text-gray-500 mb-6">Get started by creating a new transaction</p>
          <Link to="Create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
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
