import React, { useCallback, useState } from "react";
import { formatMoney } from "@/lib/currency";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ReusableTable from "../../../../Shared/ReusableTable/ReusableTable";
import { hrService } from "../../../../services/hrService";
import { useApiList } from "../../../../hooks/useApiList";

const EmployeePayrollEarningIndex = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesToShow, setEntriesToShow] = useState(100);

  const fetchEarnings = useCallback(
    (params) => hrService.earnings.getAll(employeeId, params),
    [employeeId]
  );

  const { data: earningData, loading, error, refetch } = useApiList(
    fetchEarnings,
    { searchTerm, currentPage, entriesToShow }
  );

  const handleDelete = async (recordId) => {
    const ok = await confirm({ description: "Are you sure you want to delete this record?" });
    if (!ok) return;
    try {
        await hrService.earnings.delete(employeeId, recordId);
        refetch();
      } catch (err) {
        toast.error(err.message || "Failed to delete earning record");
      }
  };

  const columns = [
    { header: "SL No", accessor: "id" },
    { header: "Earning Heading", accessor: "earningHeading" },
    { header: "Employee Name", accessor: "employeeName" },
    { header: "Particular", accessor: "particular" },
    {
      header: "Amount",
      accessor: "amount",
      render: (row) => formatMoney(row.amount)},
    },
    { header: "Month Name", accessor: "monthName" },
    { header: "Year Name", accessor: "yearName" },
    { header: "Date", accessor: "date" },
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-primary hover:text-primary/80",
      onClick: (row) =>
        navigate(`/hr/employee-payroll/earning/${employeeId}/edit/${row.id}`),
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-destructive hover:text-destructive/80",
      onClick: (row) => handleDelete(row.id),
    },
  ];

  return (
    <div className="p-6    mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-card p-4 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Employee Payroll Earning</h1>
          <p className="text-muted-foreground mt-1">Manage employee earning records</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search records..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus-visible:ring-ring focus:border-primary w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <FaSearch className="absolute left-3 top-3 text-muted-foreground" />
          </div>
          <Link
            to="create"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary text-foreground font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <FaPlus />
            Create New
          </Link>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : (
        <ReusableTable
          columns={columns}
          data={earningData}
          actions={actions}
          containerClass="bg-card rounded-lg shadow overflow-hidden"
          tableClass="min-w-full divide-y divide-border"
          theadClass="bg-muted"
          thClass="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
          tbodyClass="bg-card divide-y divide-border"
          tdClass="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground"
        />
      )}

      {!loading && earningData.length === 0 && (
        <div className="bg-card rounded-lg shadow-sm border border-border p-8 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">
            No earning records found
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm ? "Try a different search term" : "Get started by creating a new earning record"}
          </p>
          <Link to="create">
            <button className="px-5 py-2.5 bg-primary text-foreground font-medium rounded-lg hover:bg-primary transition-colors inline-flex items-center">
              <FaPlus className="mr-2" />
              Create Earning Record
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmployeePayrollEarningIndex;
