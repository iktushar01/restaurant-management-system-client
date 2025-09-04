import React, { useState } from 'react';

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

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat.id === selectedSeat ? null : seat.id);
  };

  const getSeatClass = (seat) => {
    let className = "flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ";
    
    if (selectedSeat === seat.id) {
      className += "transform scale-105 shadow-lg ";
    }
    
    switch(seat.type) {
      case "kabin":
        className += "bg-purple-600 text-white font-bold p-4 ";
        break;
      case "box":
        className += "bg-red-500 text-white font-medium p-3 ";
        break;
      case "takeaway":
        className += "bg-green-500 text-white font-bold p-3 ";
        break;
      default:
        className += "bg-blue-500 text-white p-2 ";
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Restaurant Seating Layout</h2>
        
        <div className="layout-container bg-gray-50 p-6 rounded-lg">
          {/* Kabin Section */}
          <div className="mb-8 text-center">
            <div className="text-xl font-semibold text-gray-700 mb-3">Kabin</div>
            <div className="flex justify-center">
              <div 
                className={getSeatClass(kabin)} 
                style={{ minWidth: '120px' }}
                onClick={() => handleSeatClick(kabin)}
              >
                {kabin.seatName}
              </div>
            </div>
          </div>
          
          {/* Tables Section */}
          <div className="mb-8">
            <div className="text-xl font-semibold text-gray-700 mb-3 text-center">Tables</div>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(tableRows).map(([row, seats]) => (
                <div key={row} className="flex justify-center space-x-3">
                  {seats.map(seat => (
                    <div
                      key={seat.id}
                      className={getSeatClass(seat)}
                      style={{ minWidth: '50px', minHeight: '50px' }}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat.seatName}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Boxes Section */}
          <div className="mb-8">
            <div className="text-xl font-semibold text-gray-700 mb-3 text-center">Private Boxes</div>
            <div className="flex justify-center space-x-4">
              {boxes.map(box => (
                <div
                  key={box.id}
                  className={getSeatClass(box)}
                  style={{ minWidth: '70px', minHeight: '70px' }}
                  onClick={() => handleSeatClick(box)}
                >
                  {box.seatName}
                </div>
              ))}
            </div>
          </div>
          
          {/* Takeaway Section */}
          <div className="flex justify-end mt-6">
            <div
              className={getSeatClass(takeaway)}
              style={{ minWidth: '120px' }}
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