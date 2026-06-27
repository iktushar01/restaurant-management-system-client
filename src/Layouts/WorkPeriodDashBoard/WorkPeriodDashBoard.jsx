import React from "react";
import { Outlet } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import WorkPeriodDashBoardHeader from "./WorkPeriodDashBoardHeader";
import WorkPeriodDashBoardNavbar from "./WorkPeriodDashBoardNavbar";

const WorkPeriodDashBoard = () => {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen className="min-h-svh w-full flex-col">
        <div className="flex min-h-svh w-full flex-col bg-background text-foreground">
          <WorkPeriodDashBoardHeader />

          <div className="flex min-h-0 flex-1 w-full">
            <WorkPeriodDashBoardNavbar />

            <main className="min-w-0 flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default WorkPeriodDashBoard;
