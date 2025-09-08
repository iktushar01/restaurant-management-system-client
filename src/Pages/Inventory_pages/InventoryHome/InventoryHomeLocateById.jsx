import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ReusableTable from "../../../Shared/ReusableTable/ReusableTable";

const InventoryHomeLocateById = () => {
  // Table columns configuration
  const columns = [
    {
      header: "SI No",
      accessor: "siNo",
      className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
    },
    {
      header: "Item Name",
      accessor: "itemName",
      className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
    },
    {
      header: "Location",
      accessor: "location",
      className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
    },
    {
      header: "Remaining Stock",
      accessor: "stock",
      className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
    }
  ];

  // Table data
  const tableData = [
    {
      siNo: "1",
      itemName: "Chicken",
      location: "Tekerhat bazar",
      stock: "20.00 KG"
    }
  ];

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link
          to="/inventory"
          className="flex items-center group transition-all duration-200"
        >
          <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group-hover:-translate-x-1 cursor-pointer">
            <FiArrowLeft className="mr-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            Back to Inventory
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-200 to-purple-400 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Item Detail Info</h2>
          <p className="text-gray-700 mt-1">
            Detailed information about inventory items
          </p>
        </div>

        {/* Item details table using ReusableTable component */}
        <div className="p-6">
          <ReusableTable
            columns={columns}
            data={tableData}
            theadClassName="bg-gray-50"
            thClassName="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          />
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <Link
            to="/inventory"
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InventoryHomeLocateById;