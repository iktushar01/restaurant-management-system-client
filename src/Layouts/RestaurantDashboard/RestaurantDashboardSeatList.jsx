import React, { useState, useEffect } from 'react';

const RestaurantDashboardSeatList = () => {
  const layoutData = [
    { id: 1, seatName: "KABIN 1", type: "kabin" },
    { id: 2, seatName: "A2", type: "table" },
    { id: 3, seatName: "A3", type: "table" },
    { id: 4, seatName: "A4", type: "table" },
    { id: 5, seatName: "B1", type: "table" },
    { id: 6, seatName: "B2", type: "table" },
    { id: 7, seatName: "B3", type: "table" },
    { id: 8, seatName: "B4", type: "table" },
    { id: 9, seatName: "C1", type: "table" },
    { id: 10, seatName: "C2", type: "table" },
    { id: 11, seatName: "C3", type: "table" },
    { id: 12, seatName: "C4", type: "table" },
    { id: 13, seatName: "D1", type: "table" },
    { id: 14, seatName: "D2", type: "table" },
    { id: 15, seatName: "D3", type: "table" },
    { id: 16, seatName: "D4", type: "table" },
    { id: 17, seatName: "E1", type: "table" },
    { id: 18, seatName: "E2", type: "table" },
    { id: 19, seatName: "E3", type: "table" },
    { id: 20, seatName: "E4", type: "table" },
    { id: 21, seatName: "F1", type: "table" },
    { id: 22, seatName: "F2", type: "table" },
    { id: 23, seatName: "F3", type: "table" },
    { id: 25, seatName: "G1", type: "table" },
    { id: 26, seatName: "G2", type: "table" },
    { id: 27, seatName: "Box1", type: "box" },
    { id: 28, seatName: "Box2", type: "box" },
    { id: 29, seatName: "Box3", type: "box" },
    { id: 30, seatName: "Box4", type: "box" },
    { id: 31, seatName: "Box5", type: "box" },
    { id: 32, seatName: "D5", type: "table" },
    { id: 33, seatName: "E5", type: "table" },
    { id: 34, seatName: "Take way", type: "takeaway" },
  ];

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat.id === selectedSeat ? null : seat.id);
  };

  const getSeatClass = (seat) => {
    let className = "flex items-center justify-center rounded cursor-pointer transition-all duration-200 ";
    
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
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-3 md:p-4">
        <h2 className="text-lg md:text-xl font-bold text-center text-gray-800 mb-3 md:mb-4">Restaurant Seating Layout</h2>
        
        <div className="layout-container bg-gray-50 p-3 md:p-4 rounded-lg">
          {/* Top Section - Kabin and Boxes */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-3 md:gap-0">
            {/* Kabin Section */}
            <div className="text-center w-full md:w-auto">
              <div className="text-xs md:text-sm font-semibold text-gray-700 mb-1">Kabin</div>
              <div 
                className={getSeatClass(kabin) + " p-2 text-xs md:text-sm mx-auto md:mx-0"} 
                style={{ minWidth: isMobile ? '70px' : '80px', minHeight: isMobile ? '35px' : '40px' }}
                onClick={() => handleSeatClick(kabin)}
              >
                {kabin.seatName}
              </div>
            </div>
            
            {/* Boxes Section */}
            <div className="text-center w-full md:w-auto">
              <div className="text-xs md:text-sm font-semibold text-gray-700 mb-1">Private Boxes</div>
              <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                {boxes.map(box => (
                  <div
                    key={box.id}
                    className={getSeatClass(box) + " p-1 md:p-2 text-xs"}
                    style={{ 
                      minWidth: isMobile ? '40px' : '45px', 
                      minHeight: isMobile ? '40px' : '45px',
                      flex: isMobile ? '1 0 21%' : 'none',
                      maxWidth: isMobile ? '22%' : 'none'
                    }}
                    onClick={() => handleSeatClick(box)}
                  >
                    {box.seatName}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tables Section - Responsive grid */}
          <div className="mb-4">
            <div className="text-xs md:text-sm font-semibold text-gray-700 mb-2 text-center">Tables</div>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(tableRows).map(([row, seats]) => (
                <div key={row} className="flex flex-wrap justify-center gap-1 md:gap-2">
                  {seats.map(seat => (
                    <div
                      key={seat.id}
                      className={getSeatClass(seat) + " p-1 text-xs"}
                      style={{ 
                        minWidth: isMobile ? '30px' : '35px', 
                        minHeight: isMobile ? '30px' : '35px',
                        flex: isMobile ? '1 0 15%' : 'none',
                        maxWidth: isMobile ? '18%' : 'none'
                      }}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat.seatName}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Takeaway Section */}
          <div className="flex justify-center mt-2">
            <div
              className={getSeatClass(takeaway) + " p-2 text-xs md:text-sm"}
              style={{ 
                minWidth: isMobile ? '80px' : '90px', 
                minHeight: isMobile ? '30px' : '35px' 
              }}
              onClick={() => handleSeatClick(takeaway)}
            >
              {takeaway.seatName}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RestaurantDashboardSeatList;