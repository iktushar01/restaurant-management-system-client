import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ReusableTable from "../../../../Shared/ReusableTable/ReusableTable";

const EmployeePayrollbasicIndex = () => {
  const navigate = useNavigate();
  
  // Sample data for demonstration - matching your screenshot
  const [basicData, setBasicData] = useState([
    {
      id: 1,
      employeeName: "ADMIN",
      particular: "sfscif",
      basic: "",
      month: "January",
      year: 2025,
      date: "21/08/2025 00:00:00"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = basicData.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this basic salary record?")) {
      setBasicData(basicData.filter(item => item.id !== id));
    }
  };

  // Define columns for the ReusableTable - matching your screenshot
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
      header: "Particular",
      accessor: "particular",
    },
    {
      header: "Basic",
      accessor: "basic",
      render: (row) => row.basic ? `$${row.basic}` : "",
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
      header: "Date",
      accessor: "date",
    },
  ];

  // Define actions for the ReusableTable
  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-indigo-600 hover:text-indigo-900",
      onClick: (row) => navigate(`/hr/employee-payroll/basic/${row.id}/edit`)
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-rose-600 hover:text-rose-900",
      onClick: (row) => handleDelete(row.id),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Employee Salary Basic</h1>
          <p className="text-gray-600 mt-1">Manage employee basic salary records</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search records..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <Link 
            to="Create" 
            className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <FaPlus />
            Create New
          </Link>
        </div>
      </div>

      {/* ReusableTable component */}
      <ReusableTable 
        columns={columns} 
        data={filteredData} 
        actions={actions}
        containerClass="bg-white rounded-lg shadow overflow-hidden"
        tableClass="min-w-full divide-y divide-gray-200"
        theadClass="bg-gray-100"
        thClass="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        tbodyClass="bg-white divide-y divide-gray-200"
        tdClass="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      />

      {filteredData.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No basic salary records found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? "Try a different search term" : "Get started by creating a new basic salary record"}
          </p>
          <Link to="Create">
            <button className="px-5 py-2.5 bg-yellow-400 text-gray-900 font-medium rounded-lg hover:bg-yellow-500 transition-colors inline-flex items-center">
              <FaPlus className="mr-2" />
              Create Basic Record
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmployeePayrollbasicIndex;