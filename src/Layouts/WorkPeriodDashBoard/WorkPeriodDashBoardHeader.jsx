import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaUser, FaSignOutAlt, FaClock, FaHome, FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";

const WorkPeriodDashBoardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [username] = useState("John Doe"); // Replace with actual user data
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Format time with seconds
  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <header className="h-16 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg ">
      <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8 w-full mx-auto">
        <div className="flex items-center">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <FaUtensils className="text-white text-2xl hidden sm:block" />
            <span className="ml-2 text-white font-bold text-xl hidden sm:block">RestaurantPro</span>
          </div>
          
          <Link 
            to="/RestaurantDashboard/Index" 
            className="ml-6 flex items-center text-white font-medium hover:text-blue-200 transition-colors"
          >
            <FaHome className="mr-1 text-2xl" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Time display - adjusts for different screen sizes */}
          <div className="flex items-center text-white font-medium bg-blue-600/40 px-3 py-2 rounded-lg backdrop-blur-sm">
            <FaClock className="mr-2" />
            <span className="tabular-nums text-sm sm:text-base">
              {formatTime(currentTime)}
            </span>
          </div>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white font-medium focus:outline-none hover:bg-blue-600 transition-all bg-blue-600/40 px-3 py-2 rounded-lg backdrop-blur-sm"
              aria-label="User menu"
            >
              <div className="bg-blue-700 rounded-full p-1 mr-2">
                <FaUser className="text-white text-sm" />
              </div>
              <span className="hidden sm:inline truncate max-w-[120px]">
                {username}
              </span>
              <FaChevronDown
                className={`ml-1 sm:ml-2 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                size={14}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 overflow-hidden">
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{username}</p>
                </div>
                <a
                  href="#profile"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  <FaUser className="mr-3 text-blue-500" />
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  <FaSignOutAlt className="mr-3 text-blue-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default WorkPeriodDashBoardHeader;