import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ReusableTable from "../../Shared/ReusableTable/ReusableTable";

const DuePages = () => {
  // Sample data for demonstration - matching your table structure
  const [dueData, setDueData] = useState([
    {
      id: 1,
      guestName: "John Smith",
      phoneNo: "0123456789",
      totalDueAmount: 1500.00,
      paymentMethod: "Cash",
      payAmount: 500.00
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      phoneNo: "0987654321",
      totalDueAmount: 2750.50,
      paymentMethod: "Credit Card",
      payAmount: 1000.00
    },
    {
      id: 1,
      guestName: "John Smith",
      phoneNo: "0123456789",
      totalDueAmount: 1500.00,
      paymentMethod: "Cash",
      payAmount: 500.00
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      phoneNo: "0987654321",
      totalDueAmount: 2750.50,
      paymentMethod: "Credit Card",
      payAmount: 1000.00
    },{
      id: 1,
      guestName: "John Smith",
      phoneNo: "0123456789",
      totalDueAmount: 1500.00,
      paymentMethod: "Cash",
      payAmount: 500.00
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      phoneNo: "0987654321",
      totalDueAmount: 2750.50,
      paymentMethod: "Credit Card",
      payAmount: 1000.00
    },{
      id: 1,
      guestName: "John Smith",
      phoneNo: "0123456789",
      totalDueAmount: 1500.00,
      paymentMethod: "Cash",
      payAmount: 500.00
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      phoneNo: "0987654321",
      totalDueAmount: 2750.50,
      paymentMethod: "Credit Card",
      payAmount: 1000.00
    },
    {
      id: 1,
      guestName: "John Smith",
      phoneNo: "0123456789",
      totalDueAmount: 1500.00,
      paymentMethod: "Cash",
      payAmount: 500.00
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      phoneNo: "0987654321",
      totalDueAmount: 2750.50,
      paymentMethod: "Credit Card",
      payAmount: 1000.00
    },
    {
      id: 1,
      guestName: "John Smith",
      phoneNo: "0123456789",
      totalDueAmount: 1500.00,
      paymentMethod: "Cash",
      payAmount: 500.00
    },
    {
      id: 2,
      guestName: "Sarah Johnson",
      phoneNo: "0987654321",
      totalDueAmount: 2750.50,
      paymentMethod: "Credit Card",
      payAmount: 1000.00
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);

  // Filter data based on search term
  const filteredData = dueData.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setDueData(dueData.filter(item => item.id !== id));
    }
  };

  // Define columns for the ReusableTable - matching your screenshot
  const columns = [
    {
      header: "Guest Name",
      accessor: "guestName",
    },
    {
      header: "Phone No",
      accessor: "phoneNo",
    },
    {
      header: "Total Due Amount",
      accessor: "totalDueAmount",
      render: (row) => `$${row.totalDueAmount.toFixed(2)}`,
    },
    {
      header: "Payment Method",
      accessor: "paymentMethod",
    },
    {
      header: "Pay Amount",
      accessor: "payAmount",
      render: (row) => `$${row.payAmount.toFixed(2)}`,
    },
  ];

  // Define actions for the ReusableTable
  const actions = [
    {
      label: "Edit",
      icon: FaEdit,
      className: "text-indigo-600 hover:text-indigo-900",
      render: (row) => (
        <Link
          to={`/due/edit/${row.id}`}
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
      onClick: (row) => handleDelete(row.id),
    },
  ];

  return (
    <div className="p-6 max-w-7xl min-h-screen mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Due Management</h1>
          <p className="text-gray-600 mt-1">Manage guest due payments</p>
        </div>

      </div>

      {/* Table controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={entriesToShow}
            onChange={(e) => setEntriesToShow(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
        
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* ReusableTable component */}
      <ReusableTable 
        columns={columns} 
        data={filteredData.slice(0, entriesToShow)} 
        actions={actions}
        containerClass="bg-white rounded-lg shadow overflow-hidden"
        tableClass="min-w-full divide-y divide-gray-200"
        theadClass="bg-gray-100"
        thClass="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        tbodyClass="bg-white divide-y divide-gray-200"
        tdClass="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      />

      {/* Table footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 bg-white p-4 rounded-lg shadow">
        <div className="text-sm text-gray-600">
          Showing {Math.min(filteredData.length, entriesToShow)} of {filteredData.length} entries
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {filteredData.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No due records found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? "Try a different search term" : "Get started by creating a new payment record"}
          </p>
          <Link to="Create">
            <button className="px-5 py-2.5 bg-yellow-400 text-gray-900 font-medium rounded-lg hover:bg-yellow-500 transition-colors inline-flex items-center">
              <FaPlus className="mr-2" />
              New Payment
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DuePages;