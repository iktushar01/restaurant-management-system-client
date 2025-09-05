import React from "react";
import Header from "../../Shared/Header/Header";
import Navbar from "../../Shared/Navbar/Navbar";
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
