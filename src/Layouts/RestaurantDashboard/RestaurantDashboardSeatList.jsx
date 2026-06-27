import React, { useState, useEffect } from 'react';
import { 
  FaHome, 
  FaChair, 
  FaBox, 
  FaShoppingBag, 
  FaUtensils,
} from 'react-icons/fa';
import { dashboardService } from '../../services/dashboardService';

const getIconForType = (type) => {
  switch (type) {
    case 'kabin': return <FaHome />;
    case 'box': return <FaBox />;
    case 'takeaway': return <FaShoppingBag />;
    default: return <FaChair />;
  }
};

const RestaurantDashboardSeatList = () => {
  const [layoutData, setLayoutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    dashboardService.getSeatLayout()
      .then((res) => {
        const seats = (res.data || []).map((seat) => ({
          ...seat,
          icon: getIconForType(seat.type),
        }));
        setLayoutData(seats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLarge(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat.id === selectedSeat ? null : seat.id);
  };

  const getSeatClass = (seat) => {
    let className = "flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-200 p-1 ";
    
    if (selectedSeat === seat.id) {
      className += "transform scale-105 shadow-lg ring-2 ring-offset-2 ring-white ";
    }
    
    switch(seat.type) {
      case "kabin":
        className += "bg-purple-600 text-white font-bold ";
        break;
      case "box":
        className += "bg-red-500 text-white font-medium ";
        break;
      case "takeaway":
        className += "bg-green-500 text-white font-bold ";
        break;
      default:
        className += "bg-blue-500 text-white ";
    }
    
    return className;
  };

  // Calculate sizes based on device type
  const getSeatSize = (type) => {
    if (isMobile) {
      switch(type) {
        case "kabin": return { width: '80px', height: '50px' };
        case "box": return { width: '50px', height: '50px' };
        case "takeaway": return { width: '90px', height: '40px' };
        default: return { width: '40px', height: '40px' };
      }
    } else if (isLarge) {
      // Larger sizes for large devices
      switch(type) {
        case "kabin": return { width: '130px', height: '60px' };
        case "box": return { width: '80px', height: '80px' };
        case "takeaway": return { width: '130px', height: '50px' };
        default: return { width: '65px', height: '65px' };
      }
    } else {
      // Medium devices (tablets)
      switch(type) {
        case "kabin": return { width: '100px', height: '50px' };
        case "box": return { width: '60px', height: '60px' };
        case "takeaway": return { width: '110px', height: '40px' };
        default: return { width: '50px', height: '50px' };
      }
    }
  };

  // Group tables by row
  const tableRows = {};
  layoutData
    .filter(item => item.type === "table")
    .forEach(item => {
      const row = item.seatName.charAt(0);
      if (!tableRows[row]) {
        tableRows[row] = [];
      }
      tableRows[row].push(item);
    });

  // Get other elements
  const kabin = layoutData.find(item => item.type === "kabin");
  const boxes = layoutData.filter(item => item.type === "box");
  const takeaway = layoutData.find(item => item.type === "takeaway");

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading seat layout...</div>;
  }

  if (layoutData.length === 0) {
    return <div className="p-8 text-center text-gray-500">No tables configured. Add dine tables in settings.</div>;
  }

  return (
    <div className="bg-gray-100 p-2 md:p-4 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-3 md:p-4 lg:p-6">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center text-gray-800 mb-3 md:mb-4 lg:mb-6 flex items-center justify-center">
          <FaUtensils className="mr-2 text-yellow-500" /> Restaurant Seating Layout
        </h2>
        
        <div className="layout-container bg-gray-50 p-3 md:p-4 lg:p-5 rounded-lg">
          {/* Top Section - Kabin and Boxes */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-3 md:gap-0">
            {/* Kabin Section */}
            {kabin && (
            <div className="text-center w-full md:w-auto">
              <div className="text-xs md:text-sm font-semibold text-gray-700 mb-1 flex items-center justify-center">
                <FaHome className="mr-1" /> Kabin
              </div>
              <div 
                className={getSeatClass(kabin) + " mx-auto md:mx-0"} 
                style={getSeatSize("kabin")}
                onClick={() => handleSeatClick(kabin)}
              >
                <div className="text-xs md:text-sm">{kabin.icon}</div>
                <div className="text-xs mt-1">{kabin.seatName}</div>
              </div>
            </div>
            )}
            
            {/* Boxes Section */}
            <div className="text-center w-full md:w-auto">
              <div className="text-xs md:text-sm font-semibold text-gray-700 mb-1 flex items-center justify-center">
                <FaBox className="mr-1" /> Private Boxes
              </div>
              <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                {boxes.map(box => (
                  <div
                    key={box.id}
                    className={getSeatClass(box)}
                    style={getSeatSize("box")}
                    onClick={() => handleSeatClick(box)}
                  >
                    <div className="text-xs">{box.icon}</div>
                    <div className="text-xs mt-1">{box.seatName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tables Section - Responsive grid */}
          <div className="mb-4">
            <div className="text-xs md:text-sm font-semibold text-gray-700 mb-2 text-center flex items-center justify-center">
              <FaChair className="mr-1" /> Tables
            </div>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(tableRows).map(([row, seats]) => (
                <div key={row} className="flex flex-wrap justify-center gap-1 md:gap-2">
                  {seats.map(seat => (
                    <div
                      key={seat.id}
                      className={getSeatClass(seat)}
                      style={getSeatSize("table")}
                      onClick={() => handleSeatClick(seat)}
                    >
                      <div className="text-xs">{seat.icon}</div>
                      <div className="text-xs mt-1">{seat.seatName}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Takeaway Section */}
          <div className="flex justify-center mt-2">
            <div className="text-center">
              <div className="text-xs md:text-sm font-semibold text-gray-700 mb-1 flex items-center justify-center">
                <FaShoppingBag className="mr-1" /> Takeaway
              </div>
              <div
                className={getSeatClass(takeaway)}
                style={getSeatSize("takeaway")}
                onClick={() => handleSeatClick(takeaway)}
              >
                <div className="text-xs md:text-sm">{takeaway.icon}</div>
                <div className="text-xs mt-1">{takeaway.seatName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Seat Info */}
        {selectedSeat && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-start">
            <FaInfoCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-blue-800">Selected Seat Information</h3>
              <p className="text-xs text-gray-700 mt-1">
                {layoutData.find(seat => seat.id === selectedSeat)?.seatName} - 
                Type: {layoutData.find(seat => seat.id === selectedSeat)?.type}
              </p>
              <button 
                className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors flex items-center"
                onClick={() => setSelectedSeat(null)}
              >
                <FaCheckCircle className="mr-1" /> Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboardSeatList;