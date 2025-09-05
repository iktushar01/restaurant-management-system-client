import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaUser, FaSignOutAlt, FaClock, FaHome } from "react-icons/fa";
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
    <header className="h-14 bg-blue-400 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8 w-full mx-auto">
        <div className="flex items-center">
          
          
          <Link 
            to="/RestaurantDashboard/Index" 
            className="ml-6 flex items-center text-black font-medium hover:text-blue-800 transition-colors"
          >
            <FaHome className="mr-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Time display - adjusts for different screen sizes */}
          <div className="flex items-center text-black font-medium bg-blue-500/30 px-3 py-1 rounded-md">
            <FaClock className="mr-2" />
            <span className="tabular-nums text-sm sm:text-base">
              {formatTime(currentTime)}
            </span>
          </div>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center text-black font-medium focus:outline-none hover:text-blue-800 transition-colors bg-blue-500/30 px-3 py-1 rounded-md"
              aria-label="User menu"
            >
              <span className="hidden sm:inline truncate max-w-[120px]">
                {username}
              </span>
              <span className="sm:hidden">
                <FaUser />
              </span>
              <FaChevronDown
                className={`ml-1 sm:ml-2 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                size={14}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <a
                  href="#profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaUser className="mr-2" />
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaSignOutAlt className="mr-2" />
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