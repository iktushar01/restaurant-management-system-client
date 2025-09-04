import { useState } from 'react';

const OrderManagement = () => {
  // Sample data for dropdowns
  const orderTypes = ['Dine-in', 'Takeaway', 'Delivery', 'Catering'];
  const tables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'VIP 1', 'VIP 2'];
  const staffMembers = ['John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'Robert Wilson'];

  // State for form values
  const [orderType, setOrderType] = useState('');
  const [allotedTables, setAllotedTables] = useState([]);
  const [servedBy, setServedBy] = useState('');
  const [persons, setPersons] = useState('');
  const [note, setNote] = useState('');
  const [showTableDropdown, setShowTableDropdown] = useState(false);

  // Handle table selection
  const handleTableSelect = (table) => {
    if (allotedTables.includes(table)) {
      setAllotedTables(allotedTables.filter(t => t !== table));
    } else {
      setAllotedTables([...allotedTables, table]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      orderType,
      allotedTables,
      servedBy,
      persons,
      note
    });
    // Here you would typically send the data to your backend
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className='flex flex-wrap gap-6'>
          {/* Order Type Dropdown */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Order Type</option>
              {orderTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Alloted Tables Dropdown */}
          <div className="flex-1 min-w-[200px] relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Alloted Tables</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTableDropdown(!showTableDropdown)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-left flex justify-between items-center"
              >
                <span>{allotedTables.length > 0 ? `${allotedTables.length} table(s) selected` : "Select tables"}</span>
                <span>▼</span>
              </button>
              
              {showTableDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {tables.map((table) => (
                    <div 
                      key={table} 
                      className={`p-2 cursor-pointer hover:bg-blue-50 ${allotedTables.includes(table) ? 'bg-blue-100' : ''}`}
                      onClick={() => handleTableSelect(table)}
                    >
                      <input 
                        type="checkbox" 
                        checked={allotedTables.includes(table)} 
                        onChange={() => {}} 
                        className="mr-2"
                      />
                      {table}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {allotedTables.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {allotedTables.map(table => (
                  <span key={table} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md">
                    {table}
                    <button 
                      type="button"
                      onClick={() => handleTableSelect(table)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Served By Dropdown */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Served By</label>
            <select
              value={servedBy}
              onChange={(e) => setServedBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Staff Member</option>
              {staffMembers.map((staff) => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
            </select>
          </div>

          {/* Person(s) Input */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Person(s)</label>
            <input
              type="text"
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter name(s) of person(s)"
            />
          </div>

          {/* Note Input */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Add any special notes"
            />
          </div>
        </div>
        
      </form>
    </div>
  );
};

export default OrderManagement;