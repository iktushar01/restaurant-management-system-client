import React, { useState, useEffect } from 'react';
import { 
  NavLink,
  useLocation
} from 'react-router-dom';
import { 
  FiHome, FiShoppingBag, FiCalendar, FiPackage, 
  FiUsers, FiDollarSign, FiCreditCard, FiPieChart,
  FiFileText, FiSettings, FiChevronDown, FiMenu, FiX
} from 'react-icons/fi';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <FiHome />,
      path: '/RestaurantDashboard/Index'
    },
    {
      name: 'Order',
      icon: <FiShoppingBag />,
      path: '/order'
    },
    {
      name: 'Event',
      icon: <FiCalendar />,
      path: '/event',
      subMenu: [
        { name: 'Dashboard', path: '/event/dashboard' },
        { name: 'Manage Event', path: '/event/manage' },
        { name: "Today's Events", path: '/event/today' }
      ]
    },
    {
      name: 'Inventory',
      icon: <FiPackage />,
      path: '/inventory',
      subMenu: [
        { name: 'Home', path: '/inventory' },
        { name: 'Purchase', path: '/inventory/purchase' },
        { name: 'Purchase Details', path: '/inventory/purchase-details' },
        { name: 'Settings', path: '/inventory/settings' }
      ]
    },
    {
      name: 'HR',
      icon: <FiUsers />,
      path: '/hr',
      subMenu: [
        { name: 'Add Designation', path: '/hr/designation/Index' },
        { name: 'Add Earning Heading', path: '/hr/earning-heading' },
        { name: 'Add Deduction Heading', path: '/hr/deduction-heading' },
        { name: 'Employee Payroll', path: '/hr/payroll' },
        { name: 'Employee Salary Payable', path: '/hr/salary-payable' },
        { name: 'Grand Employee Salary Payable', path: '/hr/grand-salary' },
      ]
    },
    {
      name: 'Income',
      icon: <FiDollarSign />,
      path: '/income',
      subMenu: [
        { name: 'Add Income Types', path: '/income/OthersIncomeHead/Index' },
        { name: 'Manage Income', path: '/income/manage' },
        { name: 'Day Wise Income', path: '/income/daily' }
      ]
    },
    {
      name: 'Expense',
      icon: <FiCreditCard />,
      path: '/expense',
      subMenu: [
        { name: 'Add Expense Types', path: '/expense/OthersIncomeHead/Index' },
        { name: 'Manage Expenses', path: '/expense/manage' },
        { name: 'Day Wise Expense', path: '/expense/daily' }
      ]
    },
    {
      name: 'Bank',
      icon: <FiPieChart />,
      path: '/bank',
      subMenu: [
        { name: 'Bank', path: '/bank/bankinfo/Index' },
        { name: 'Branch', path: '/bank/BankBranchInfo/Index' },
        { name: 'Transactions', path: '/bank/BankAccountInfo/Index' }
      ]
    },
    {
      name: 'Due',
      icon: <FiFileText />,
      path: '/due',
      subMenu: [
        { name: 'Due Details', path: '/due/details' }
      ]
    },
    {
      name: 'Report',
      icon: <FiFileText />,
      path: '/report',
      subMenu: [
        { name: 'Current Report', path: '/report/current' },
        { name: 'Daily Statement', path: '/report/daily' }
      ]
    },
    {
      name: 'Settings',
      icon: <FiSettings />,
      path: '/settings'
    }
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close all dropdowns when toggling mobile menu
    if (!mobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Check if current path matches any submenu item
  const isSubmenuActive = (subMenu) => {
    if (!subMenu) return false;
    return subMenu.some(item => location.pathname === item.path);
  };

  return (
    <div className="bg-black text-white w-full lg:py-4 py-0 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Header */}
        <div className="flex justify-between items-center py-3 md:hidden">
          <span className="text-lg font-medium">Menu</span>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center flex-wrap gap-1">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md transition whitespace-nowrap ${
                    isActive || isSubmenuActive(item.subMenu) 
                      ? 'bg-gray-800 font-medium' 
                      : 'hover:bg-gray-800'
                  }`
                }
                onClick={(e) => {
                  if (item.subMenu) {
                    e.preventDefault();
                    toggleDropdown(index);
                  }
                }}
              >
                <span className="mr-1">{item.icon}</span>
                <span>{item.name}</span>
                {item.subMenu && (
                  <FiChevronDown className={`ml-1 transition-transform ${
                    activeDropdown === index ? 'transform rotate-180' : ''
                  }`} />
                )}
              </NavLink>
              
              {item.subMenu && (
                <div 
                  className={`absolute left-0 mt-1 min-w-full bg-gray-800 rounded-md shadow-lg z-10 ${
                    activeDropdown === index ? 'block' : 'hidden'
                  } group-hover:block`}
                  onMouseLeave={() => isMobile ? null : setActiveDropdown(null)}
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <NavLink 
                      key={subIndex} 
                      to={subItem.path}
                      className={({ isActive }) => 
                        `block px-4 py-2 text-sm hover:bg-gray-700 rounded-md whitespace-nowrap ${
                          isActive ? 'bg-gray-700 font-medium' : ''
                        }`
                      }
                      onClick={closeAllMenus}
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-gray-900 rounded-md mt-2 py-2 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}>
          {menuItems.map((item, index) => (
            <div key={index} className="mb-1 last:mb-0">
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `w-full flex items-center justify-between px-4 py-2 rounded-md ${
                    isActive || isSubmenuActive(item.subMenu) 
                      ? 'bg-gray-800 font-medium' 
                      : 'hover:bg-gray-800'
                  }`
                }
                onClick={(e) => {
                  if (item.subMenu) {
                    e.preventDefault();
                    toggleDropdown(index);
                  } else {
                    closeAllMenus();
                  }
                }}
              >
                <div className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.subMenu && (
                  <FiChevronDown className={`transition-transform ${
                    activeDropdown === index ? 'transform rotate-180' : ''
                  }`} />
                )}
              </NavLink>
              
              {activeDropdown === index && item.subMenu && (
                <div className="pl-8 pr-2 py-1 space-y-1">
                  {item.subMenu.map((subItem, subIndex) => (
                    <NavLink 
                      key={subIndex} 
                      to={subItem.path}
                      className={({ isActive }) => 
                        `block px-2 py-2 text-sm rounded-md ${
                          isActive ? 'bg-gray-800 font-medium' : 'hover:bg-gray-800'
                        }`
                      }
                      onClick={closeAllMenus}
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;