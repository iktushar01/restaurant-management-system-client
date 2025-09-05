import React from "react";
import { Outlet } from "react-router";
import WorkPeriodDashBoardHeader from "./WorkPeriodDashBoardHeader";
import WorkPeriodDashBoardNavbar from "./WorkPeriodDashBoardNavbar";

const WorkPeriodDashBoard = () => {
  return (
    <div>
      <WorkPeriodDashBoardHeader />
      <WorkPeriodDashBoardNavbar />
      <Outlet />
    </div>
  );
};

export default WorkPeriodDashBoard;
