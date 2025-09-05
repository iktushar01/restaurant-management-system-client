import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaUtensils, 
  FaHamburger, 
  FaList, 
  FaUserTie, 
  FaBoxes, 
  FaBuilding, 
  FaMoneyBill,
  FaCashRegister,
  FaChair,
  FaTable,
  FaReceipt,
  FaWarehouse,
  FaBoxOpen,
  FaCubes,
  FaClipboardList
} from 'react-icons/fa';

const WorkPeriodDashBoardNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    'Dine': false,
    'Inventory': false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    { 
      name: 'Work Period', 
      path: '/WorkPeriod/Index', 
      icon: <FaCashRegister className="w-5 h-5" />
    },
    { 
      name: 'Foods', 
      path: '/foods', 
      icon: <FaHamburger className="w-5 h-5" />
    },
    { 
      name: 'Food Category', 
      path: '/food-category', 
      icon: <FaList className="w-5 h-5" />
    },
    { 
      name: 'Dine', 
      path: '/dine',
      icon: <FaUtensils className="w-5 h-5" />,
      subRoutes: [
        { name: 'Tables', path: '/dine/tables', icon: <FaTable className="w-4 h-4" /> },
        { name: 'Orders', path: '/dine/orders', icon: <FaReceipt className="w-4 h-4" /> },
        { name: 'Dining Areas', path: '/dine/areas', icon: <FaChair className="w-4 h-4" /> }
      ]
    },
    { 
      name: 'Walter', 
      path: '/walter', 
      icon: <FaUserTie className="w-5 h-5" />
    },
    { 
      name: 'Inventory', 
      path: '/inventory',
      icon: <FaBoxes className="w-5 h-5" />,
      subRoutes: [
        { name: 'Stock', path: '/inventory/stock', icon: <FaWarehouse className="w-4 h-4" /> },
        { name: 'Suppliers', path: '/inventory/suppliers', icon: <FaBuilding className="w-4 h-4" /> },
        { name: 'Purchases', path: '/inventory/purchases', icon: <FaClipboardList className="w-4 h-4" /> },
        { name: 'Items', path: '/inventory/items', icon: <FaBoxOpen className="w-4 h-4" /> },
        { name: 'Categories', path: '/inventory/categories', icon: <FaCubes className="w-4 h-4" /> }
      ]
    },
    { 
      name: 'Property', 
      path: '/property', 
      icon: <FaBuilding className="w-5 h-5" />
    },
    { 
      name: 'Charges', 
      path: '/WorkPeriod/Settings/Update', 
      icon: <FaMoneyBill className="w-5 h-5" />
    }
  ];

  return (
    <div className={`flex flex-col h-screen bg-gray-900 text-white ${isCollapsed ? 'w-20' : 'w-64'}  transition-all duration-300`}>
      {/* Logo section with toggle button */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">DineFlow</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
        >
          {isCollapsed ? (
            <FaChevronRight className="w-4 h-4" />
          ) : (
            <FaChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
      
      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto pt-5 pb-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.subRoutes ? (
                <>
                  <button
                    onClick={() => toggleSection(item.name)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                      expandedSections[item.name] || window.location.pathname.includes(item.path)
                        ? 'bg-blue-700 text-white' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-blue-400">
                        {item.icon}
                      </span>
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <span className={`transform transition-transform ${expandedSections[item.name] ? 'rotate-90' : ''}`}>
                        <FaChevronRight className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                  
                  {/* Sub-routes */}
                  {!isCollapsed && expandedSections[item.name] && (
                    <ul className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-2">
                      {item.subRoutes.map((subItem) => (
                        <li key={subItem.name}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) => 
                              `flex items-center px-3 py-2 rounded-lg transition-colors text-sm ${
                                isActive 
                                  ? 'text-blue-300 bg-blue-900/30' 
                                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                              }`
                            }
                          >
                            <span className="mr-2">{subItem.icon}</span>
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <span className="mr-3 text-blue-400">
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      
    </div>
  );
};

export default WorkPeriodDashBoardNavbar;