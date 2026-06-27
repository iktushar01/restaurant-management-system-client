import React, { useState } from "react";
import { Outlet } from "react-router";
import WorkPeriodDashBoardHeader from "./WorkPeriodDashBoardHeader";
import WorkPeriodDashBoardNavbar, {
  WorkPeriodMobileSidebar,
} from "./WorkPeriodDashBoardNavbar";

const WorkPeriodDashBoard = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <WorkPeriodDashBoardHeader onMenuClick={() => setMobileNavOpen(true)} />
      <WorkPeriodMobileSidebar
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <WorkPeriodDashBoardNavbar />

        <main className="flex-1 min-w-0 overflow-y-auto p-3 sm:p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WorkPeriodDashBoard;
