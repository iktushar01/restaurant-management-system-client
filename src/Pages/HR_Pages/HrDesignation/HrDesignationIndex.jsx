import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const HrDesignationIndex = () => {
  const designations = [
    { name: "Admin", basic: "" },
    { name: "General Manager", basic: "" },
    { name: "Restaurant Walter", basic: "" },
    { name: "Software Engineer", basic: "23432432.00" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Designations</h1>
          <p className="text-gray-500 mt-1">Manage your organization's designations</p>
        </div>
        <Link to="Create">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2.5 rounded-lg flex items-center transition-colors duration-200">
            <FaPlus className="mr-2" />
            Create New
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-yellow-400">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {designations.map((designation, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{designation.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {designation.basic || <span className="text-gray-400">Not specified</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 flex items-center">
                        <FaEdit className="mr-1.5" />
                        Edit
                      </button>
                      <button className="text-rose-600 hover:text-rose-900 transition-colors duration-200 flex items-center">
                        <FaTrash className="mr-1.5" />
                        Delete
                      </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {designations.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No designations found</h3>
          <p className="text-gray-500 mb-6">Get started by creating a new designation</p>
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