import React from "react";
import { Outlet } from "react-router";
import WorkPeriodDashBoardHeader from "./WorkPeriodDashBoardHeader";
import WorkPeriodDashBoardNavbar from "./WorkPeriodDashBoardNavbar";

const WorkPeriodDashBoard = () => {
  return (
    <div className="flex flex-col h-screen">
      <WorkPeriodDashBoardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <WorkPeriodDashBoardNavbar />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WorkPeriodDashBoard;