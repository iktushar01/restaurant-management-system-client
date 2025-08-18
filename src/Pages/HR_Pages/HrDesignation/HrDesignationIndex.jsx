import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";
// import ReusableTable from "../../../components/shared/ReusableTable";

const HrDesignationIndex = () => {
  const designations = [
    { name: "Admin", basic: "" },
    { name: "General Manager", basic: "" },
    { name: "Restaurant Walter", basic: "" },
    { name: "Software Engineer", basic: "23432432.00" },
  ];

  const columns = [
    {
      header: "Designation",
      accessor: "name",
    },
    {
      header: "Basic Salary",
      accessor: "basic",
      render: (row) =>
        row.basic ? row.basic : <span className="text-gray-400">Not specified</span>,
    },
  ];

  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-indigo-600 hover:text-indigo-900",
      onClick: (row) => console.log("Edit:", row),
    },
    {
      label: "Delete",
      icon: FaTrash,
      className: "text-rose-600 hover:text-rose-900",
      onClick: (row) => console.log("Delete:", row),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Designations</h1>
          <p className="text-gray-500 mt-1">
            Manage your organization's designations
          </p>
        </div>
        <Link to="Create">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2.5 rounded-lg flex items-center transition-colors duration-200">
            <FaPlus className="mr-2" />
            Create New
          </button>
        </Link>
      </div>

      {/* ✅ Reusable Table */}
      <ReusableTable columns={columns} data={designations} actions={actions} />

      {designations.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No designations found
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating a new designation
          </p>
          <Link to="Create">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg inline-flex items-center transition-colors duration-200">
              <FaPlus className="mr-2" />
              Create Designation
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HrDesignationIndex;
