import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const InventoryHomeLocation = () => {
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
          <h2 className="text-2xl font-bold text-gray-800">Location</h2>
          <p className="text-gray-700 mt-1">
            Transfer inventory items between locations
          </p>
        </div>

        {/* Add your location content here */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-2xl text-gray-800 text-center bg-amber-100 p-4 font-bold rounded-3xl">Tekerhat baz</h3>
          </div>
          {/* You can add more location details or functionality here */}
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

export default InventoryHomeLocation;
