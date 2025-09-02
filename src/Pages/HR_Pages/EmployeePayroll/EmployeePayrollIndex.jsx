import React, { useState } from "react";
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

const EmployeePayrollIndex = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "ADMIN",
      contactNo: "01827123671",
      status: "Active",
      access: true,
      earning: true,
      deduction: true,
      basic: true,
      salaryPayment: true,
    },
    {
      id: 2,
      name: "Amir Hossain",
      contactNo: "01827123671",
      status: "Active",
      earning: true,
      deduction: true,
      basic: true,
      salaryPayment: true,
    },
    {
      id: 3,
      name: "Shawan",
      contactNo: "0182715990",
      status: "Retired",
      earning: true,
      deduction: true,
      basic: true,
      salaryPayment: true,
    },
    {
      id: 4,
      name: "Roblul",
      contactNo: "01834249955",
      status: "Active",
      earning: true,
      deduction: true,
      basic: true,
      salaryPayment: true,
    },
    {
      id: 5,
      name: "Safful",
      contactNo: "01222",
      status: "Active",
      earning: true,
      deduction: true,
      basic: true,
      salaryPayment: true,
    },
    {
      id: 6,
      name: "payel",
      contactNo: "01979459837",
      status: "Active",
      earning: true,
      deduction: true,
      basic: true,
      salaryPayment: true,
    },
    {
      id: 7,
      name: "nishi",
      contactNo: "12123454",
      status: "Active",
      earning: true,
      deduction: true,
      basic: true,
      salaryPayment: true,
    },
    {
      id: 8,
      name: "py",
      contactNo: "5465465456",
      status: "Active",
      earning: true,
      deduction: true,
      basic: true,
      salaryPayment: true,
    },
  ]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this employee payroll record?"
      )
    ) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              status: emp.status === "Active" ? "Inactive" : "Active",
              access: emp.status === "Active" ? false : true,
            }
          : emp
      )
    );
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
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
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
              row.access ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            {row.access && <span className="text-white text-xs">✓</span>}
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
          className={`flex items-center px-2 py-1 rounded text-xs transition-colors ${
            row.earning
              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
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
          className={`flex items-center px-2 py-1 rounded text-xs transition-colors ${
            row.deduction
              ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
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
          className={`flex items-center px-2 py-1 rounded text-xs transition-colors ${
            row.basic
              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
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
          to={`/hr/employee-payroll/payment/${row.id}`}
          className={`flex items-center px-2 py-1 rounded text-xs transition-colors ${
            row.salaryPayment
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
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
    <div className="p-4 sm:p-6 max-w-7xl min-h-screen mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl shadow-sm border border-blue-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Employee Payroll Management
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Manage employee payroll, earnings, deductions, and salary payments
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link to="Create" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
              <FaPlus className="mr-2" />
              Create New
            </button>
          </Link>

          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaFileInvoiceDollar className="mr-2" />
            Process Payroll
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <FaUserCheck className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {employees.filter((emp) => emp.status === "Active").length}
              </h3>
              <p className="text-gray-600 text-sm">Active Employees</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-lg mr-4">
              <FaMoneyBillWave className="text-amber-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {employees.filter((emp) => emp.paid).length}
              </h3>
              <p className="text-gray-600 text-sm">Paid This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <FaFileInvoiceDollar className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {employees.length}
              </h3>
              <p className="text-gray-600 text-sm">Total Employees</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg mr-4">
              <FaUserSlash className="text-red-600 text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {employees.filter((emp) => emp.status !== "Active").length}
              </h3>
              <p className="text-gray-600 text-sm">Inactive Employees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <ReusableTable
          columns={columns}
          data={employees}
          emptyState={
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                <FaUserCheck className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No employees found
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your first employee payroll record
              </p>
              <Link to="Create">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 inline-flex items-center">
                  <FaPlus className="mr-2" />
                  Add Employee
                </button>
              </Link>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default EmployeePayrollIndex;
