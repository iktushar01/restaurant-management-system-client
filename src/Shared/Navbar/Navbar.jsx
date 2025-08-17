import React, { useState } from 'react';
import { 
  FiHome, FiShoppingBag, FiCalendar, FiPackage, 
  FiUsers, FiDollarSign, FiCreditCard, FiPieChart,
  FiFileText, FiSettings, FiChevronDown, FiMenu 
} from 'react-icons/fi';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <FiHome />,
      subMenu: [
        'Add Designation',
        'Add Earning Heading',
        'Add Deduction Heading',
        'Employee Payroll',
        'Employee Salary Payable'
      ]
    },
    {
      name: 'Order',
      icon: <FiShoppingBag />,
      subMenu: [
        'VADEN 1',
        'B1',
        'C1',
        'D1',
        'E1',
        'F1',
        'G1',
        'Read'
      ]
    },
    {
      name: 'Event',
      icon: <FiCalendar />,
      subMenu: [
        'Create Event',
        'Event Calendar',
        'Event Reports'
      ]
    },
    {
      name: 'Inventory',
      icon: <FiPackage />,
      subMenu: [
        'Stock Items',
        'Suppliers',
        'Inventory Reports'
      ]
    },
    {
      name: 'HR',
      icon: <FiUsers />,
      subMenu: [
        'Employees',
        'Attendance',
        'Payroll'
      ]
    },
    {
      name: 'Income',
      icon: <FiDollarSign />,
      subMenu: [
        'Income Records',
        'Income Reports'
      ]
    },
    {
      name: 'Expense',
      icon: <FiCreditCard />,
      subMenu: [
        'Expense Records',
        'Expense Reports'
      ]
    },
    {
      name: 'Bank',
      icon: <FiPieChart />,
      subMenu: [
        'Accounts',
        'Transactions'
      ]
    },
    {
      name: 'Due',
      icon: <FiFileText />,
      subMenu: [
        'Due Payments',
        'Due Reports'
      ]
    },
    {
      name: 'Report',
      icon: <FiFileText />,
      subMenu: [
        'Financial Reports',
        'Sales Reports'
      ]
    },
    {
      name: 'Settings',
      icon: <FiSettings />,
      subMenu: [
        'System Settings',
        'User Management'
      ]
    }
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Header */}
        <div className="flex justify-between items-center py-3 md:hidden">
          <span className="text-lg font-medium">Menu</span>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-gray-800 focus:outline-none"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              <button 
                className="flex items-center px-3 py-2 hover:bg-gray-800 rounded-md transition"
                onClick={() => toggleDropdown(index)}
              >
                <span className="mr-1">{item.icon}</span>
                <span>{item.name}</span>
                <FiChevronDown className="ml-1" />
              </button>
              
              {activeDropdown === index && (
                <div className="absolute left-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                  {item.subMenu.map((subItem, subIndex) => (
                    <a 
                      key={subIndex} 
                      href="#" 
                      className="block px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 rounded-md mt-2 py-2">
            {menuItems.map((item, index) => (
              <div key={index} className="mb-1 last:mb-0">
                <button 
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-800 rounded-md"
                  onClick={() => toggleDropdown(index)}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  <FiChevronDown className={`transition-transform ${activeDropdown === index ? 'transform rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === index && (
                  <div className="pl-8 pr-2 py-1">
                    {item.subMenu.map((subItem, subIndex) => (
                      <a 
                        key={subIndex} 
                        href="#" 
                        className="block px-2 py-2 text-sm hover:bg-gray-800 rounded-md"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;