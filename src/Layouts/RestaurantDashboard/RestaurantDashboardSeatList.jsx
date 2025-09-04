import React, { useState, useEffect } from 'react';
import { 
  FaHome, 
  FaChair, 
  FaBox, 
  FaShoppingBag, 
  FaUtensils,
  FaInfoCircle,
  FaCheckCircle
} from 'react-icons/fa';

const RestaurantDashboardSeatList = () => {
  const layoutData = [
    { id: 1, seatName: "KABIN 1", type: "kabin", icon: <FaHome /> },
    { id: 2, seatName: "A2", type: "table", icon: <FaChair /> },
    { id: 3, seatName: "A3", type: "table", icon: <FaChair /> },
    { id: 4, seatName: "A4", type: "table", icon: <FaChair /> },
    { id: 5, seatName: "B1", type: "table", icon: <FaChair /> },
    { id: 6, seatName: "B2", type: "table", icon: <FaChair /> },
    { id: 7, seatName: "B3", type: "table", icon: <FaChair /> },
    { id: 8, seatName: "B4", type: "table", icon: <FaChair /> },
    { id: 9, seatName: "C1", type: "table", icon: <FaChair /> },
    { id: 10, seatName: "C2", type: "table", icon: <FaChair /> },
    { id: 11, seatName: "C3", type: "table", icon: <FaChair /> },
    { id: 12, seatName: "C4", type: "table", icon: <FaChair /> },
    { id: 13, seatName: "D1", type: "table", icon: <FaChair /> },
    { id: 14, seatName: "D2", type: "table", icon: <FaChair /> },
    { id: 15, seatName: "D3", type: "table", icon: <FaChair /> },
    { id: 16, seatName: "D4", type: "table", icon: <FaChair /> },
    { id: 17, seatName: "E1", type: "table", icon: <FaChair /> },
    { id: 18, seatName: "E2", type: "table", icon: <FaChair /> },
    { id: 19, seatName: "E3", type: "table", icon: <FaChair /> },
    { id: 20, seatName: "E4", type: "table", icon: <FaChair /> },
    { id: 21, seatName: "F1", type: "table", icon: <FaChair /> },
    { id: 22, seatName: "F2", type: "table", icon: <FaChair /> },
    { id: 23, seatName: "F3", type: "table", icon: <FaChair /> },
    { id: 25, seatName: "G1", type: "table", icon: <FaChair /> },
    { id: 26, seatName: "G2", type: "table", icon: <FaChair /> },
    { id: 27, seatName: "Box1", type: "box", icon: <FaBox /> },
    { id: 28, seatName: "Box2", type: "box", icon: <FaBox /> },
    { id: 29, seatName: "Box3", type: "box", icon: <FaBox /> },
    { id: 30, seatName: "Box4", type: "box", icon: <FaBox /> },
    { id: 31, seatName: "Box5", type: "box", icon: <FaBox /> },
    { id: 32, seatName: "D5", type: "table", icon: <FaChair /> },
    { id: 33, seatName: "E5", type: "table", icon: <FaChair /> },
    { id: 34, seatName: "Take way", type: "takeaway", icon: <FaShoppingBag /> },
  ];

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1024);

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