import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { hrService } from "../../../services/hrService";
import { useApiList } from "../../../hooks/useApiList";

const EmployeeSalaryPayableIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesToShow, setEntriesToShow] = useState(100);

  const { data: employeeSalaryData, loading, error } = useApiList(
    hrService.salaryPayable.getAll,
    { searchTerm, currentPage, entriesToShow }
  );

  const columns = [
    {
      header: "SL No",
      accessor: "id",
    },
    {
      header: "Employee Name",
      accessor: "employeeName",
    },
    {
      header: "Month",
      accessor: "month",
    },
    {
      header: "Year",
      accessor: "year",
    },
    {
      header: "Net Payable",
      accessor: "netPayable",
      render: (row) => (
        <span className={row.netPayable < 0 ? "text-destructive" : "text-success"}>
          {Number(row.netPayable).toFixed(2)}
        </span>
      ),
    },
    {
      header: "Details",
      accessor: "actions",
      render: (row) => (
        <Link
          to={`/hr/salary-payable/details/${row.id}`}
          className="text-primary hover:text-primary/80 font-medium"
        >
          Details
        </Link>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-muted/40 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Employee Salary Payable
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            View and manage employee salary payable records
          </p>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : employeeSalaryData.length > 0 ? (
        <ReusableTable
          columns={columns}
          data={employeeSalaryData}
          className="mt-6"
        />
      ) : (
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-foreground mb-2">
            No salary records found
          </h3>
          <p className="text-muted-foreground mb-6">
            Get started by adding a new salary record
          </p>
          <Link to="create">
            <button className="px-5 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Add New Record
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmployeeSalaryPayableIndex;
