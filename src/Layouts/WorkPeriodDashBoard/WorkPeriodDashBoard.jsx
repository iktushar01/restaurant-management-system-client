import React from "react";
import { Outlet } from "react-router";
import WorkPeriodDashBoardHeader from "./WorkPeriodDashBoardHeader";
import WorkPeriodDashBoardNavbar from "./WorkPeriodDashBoardNavbar";

const WorkPeriodDashBoard = () => {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <WorkPeriodDashBoardHeader />

      <div className="flex flex-1 overflow-hidden">
        <WorkPeriodDashBoardNavbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WorkPeriodDashBoard;
