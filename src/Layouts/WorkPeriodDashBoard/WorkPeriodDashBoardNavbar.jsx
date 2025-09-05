import React, { useState } from 'react';

const WorkPeriodDashBoardNavbar = () => {
  const [activeItem, setActiveItem] = useState('Work Period');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    'Work Period',
    'Foods',
    'Food Category',
    'Dine',
    'Walter',
    'Inventory',
    'Property',
    'Charges'
  ];

  return (
    <div className={`flex flex-col h-screen bg-gray-900 text-white ${isCollapsed ? 'w-20' : 'w-64'} fixed left-0 top-14 z-50 transition-all duration-300`}>
      {/* Logo section with toggle button */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">DineFlow</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-gray-800"
        >
          {isCollapsed ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto pt-5">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActiveItem(item)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                  activeItem === item 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {/* Icon placeholder - you can add actual icons here */}
                <span className="mr-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </span>
                {!isCollapsed && <span>{item}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
   
    </div>
  );
};

export default WorkPeriodDashBoardNavbar;