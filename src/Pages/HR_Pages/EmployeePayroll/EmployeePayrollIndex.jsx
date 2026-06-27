import React, { useState } from "react";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaUserCheck,
  FaUserSlash,
  FaMoneyBill ,
  FaMinusCircle ,
  FaWallet ,
  FaCreditCard 
} from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
import { hrService } from "../../../services/hrService";
import { useApiList } from "../../../hooks/useApiList";

const EmployeePayrollIndex = () => {
  const { data: employees, loading, error, refetch } = useApiList(
    hrService.employees.getAll,
    { searchTerm: "", currentPage: 1, entriesToShow: 100 }
  );

  const handleDelete = async (id) => {
    {
    const ok = await confirm({ description: 
        "Are you sure you want to delete this employee payroll record?"
       });
    if (!ok) return;
    try {
        await hrService.employees.delete(id);
        refetch();
      } catch (err) {
        toast.error(err.message || "Failed to delete employee");
      }
    }
  };

  const columns = [
    {
      header: "SL No",
      accessor: "id",
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Contact No",
      accessor: "contactNo",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Active"
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Access",
      accessor: "access",
      render: (row) => (
        <div className="flex justify-center">
          <span
            className={`h-5 w-5 rounded-full flex items-center justify-center ${
              row.access ? "bg-success" : "bg-gray-300"
            }`}
          >
            {row.access && <span className="text-primary-foreground text-xs">✓</span>}
          </span>
        </div>
      ),
    },
    {
      header: "Earning",
      accessor: "earning",
      render: (row) => (
        <Link
          to={`/hr/employee-payroll/earning/${row.id}`}
          className="flex items-center px-2 py-1 rounded text-xs transition-colors bg-amber-100 text-amber-800 hover:bg-amber-200"
          title="View Earning"
        >
          <FaMoneyBill className="mr-1" />
          <span className="hidden sm:inline">Earning</span>
        </Link>
      ),
    },
    {
      header: "Deduction",
      accessor: "deduction",
      render: (row) => (
        <Link
          to={`/hr/employee-payroll/deduction/${row.id}`}
          className="flex items-center px-2 py-1 rounded text-xs transition-colors bg-purple-100 text-purple-800 hover:bg-purple-200"
          title="View Deduction"
        >
          <FaMinusCircle className="mr-1" />
          <span className="hidden sm:inline">Deduction</span>
        </Link>
      ),
    },
    {
      header: "Basic",
      accessor: "basic",
      render: (row) => (
        <Link
          to={`/hr/employee-payroll/basic/${row.id}`}
          className="flex items-center px-2 py-1 rounded text-xs transition-colors bg-primary/10 text-foreground hover:bg-primary/20"
          title="View Basic Salary"
        >
          <FaWallet className="mr-1" />
          <span className="hidden sm:inline">Basic</span>
        </Link>
      ),
    },
    {
      header: "Salary Payment",
      accessor: "salaryPayment",
      render: (row) => (
        <Link
          to={`/hr/employee-payroll/salary-payment/${row.id}`}
          className="flex items-center px-2 py-1 rounded text-xs transition-colors bg-success/10 text-success hover:bg-green-200"
          title="Salary Payment"
        >
          <FaCreditCard className="mr-1" />
          <span className="hidden sm:inline">Salary Payment</span>
        </Link>
      ),
    },
    {
      header: "Edit",
      accessor: "edit",
      render: (row) => (
        <Link
          to={`/hr/employee-payroll/edit/${row.id}`}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors p-2"
          title="Edit"
        >
          <FaEdit className="mr-1" />
          <span className="hidden sm:inline">Edit</span>
        </Link>
      ),
    },

    {
      header: "Delete",
      accessor: "delete",
      render: (row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="flex items-center text-rose-600 hover:text-rose-800 transition-colors p-2"
          title="Delete"
        >
          <FaTrash className="mr-1" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl shadow-sm border border-blue-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Employee Payroll Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage employee payroll, earnings, deductions, and salary payments
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link to="Create" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 bg-gradient-to-r bg-primary text-primary-foreground text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
              <FaPlus className="mr-2" />
              Create New
            </button>
          </Link>

          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 bg-gradient-to-r bg-success text-success-foreground text-primary-foreground font-medium rounded-lg hover:bg-success/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaFileInvoiceDollar className="mr-2" />
            Process Payroll
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-lg mr-4">
              <FaUserCheck className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {employees.filter((emp) => emp.status === "Active").length}
              </h3>
              <p className="text-muted-foreground text-sm">Active Employees</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-lg mr-4">
              <FaMoneyBillWave className="text-amber-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {employees.filter((emp) => emp.paid).length}
              </h3>
              <p className="text-muted-foreground text-sm">Paid This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <FaFileInvoiceDollar className="text-success text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {employees.length}
              </h3>
              <p className="text-muted-foreground text-sm">Total Employees</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-destructive/10 rounded-lg mr-4">
              <FaUserSlash className="text-destructive text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {employees.filter((emp) => emp.status !== "Active").length}
              </h3>
              <p className="text-muted-foreground text-sm">Inactive Employees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-card rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {error && <div className="m-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">{error}</div>}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
        <ReusableTable
          columns={columns}
          data={employees}
          emptyState={
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                <FaUserCheck className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No employees found
              </h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first employee payroll record
              </p>
              <Link to="Create">
                <button className="px-4 py-2 bg-gradient-to-r bg-primary text-primary-foreground text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 inline-flex items-center">
                  <FaPlus className="mr-2" />
                  Add Employee
                </button>
              </Link>
            </div>
          }
        />
        )}
      </div>
    </div>
  );
};

export default EmployeePayrollIndex;
