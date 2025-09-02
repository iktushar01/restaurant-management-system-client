import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const PayRollDeductionHeadIndex = () => {
  const deductionHeads = [
    { ID: 1, name: "adfasdf" },
    // Add more deduction heads as needed
  ];

  const columns = [
    {
      header: "Earning_Head_Name",
      accessor: "name",
    },
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-indigo-600 hover:text-indigo-900",
      render: (row) => (
        <Link
          to={`/hr/deduction-heading/Edit/${row.ID}`}
          className="flex items-center space-x-1"
        >
          <FaEdit />
          <span>Edit</span>
        </Link>
      ),
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-rose-600 hover:text-rose-900",
      onClick: (row) => console.log("Delete:", row),
    },
  ];

  return (
    <div className="p-6 max-w-6xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-gray-50 sm:bg-gray-100 p-4 sm:p-6 rounded-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Deduction Head
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Manage your organization's deduction heads
          </p>
        </div>
        <Link to="Create" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-900 font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 cursor-pointer text-sm sm:text-base">
            <FaPlus className="mr-2" />
            Create New
          </button>
        </Link>
      </div>

      {/* ✅ Reusable Table */}
      <ReusableTable 
        columns={columns} 
        data={deductionHeads} 
        actions={actions} 
      />

      {deductionHeads.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No deduction heads found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating a new deduction head
          </p>
          <Link to="Create">
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 font-medium rounded-lg hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 inline-flex items-center">
              <FaPlus className="mr-2" />
              Create Deduction Head
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PayRollDeductionHeadIndex;