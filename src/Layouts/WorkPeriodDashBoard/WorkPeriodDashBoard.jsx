import React from "react";
import { Outlet } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import WorkPeriodDashBoardHeader from "./WorkPeriodDashBoardHeader";
import WorkPeriodDashBoardNavbar from "./WorkPeriodDashBoardNavbar";

const WorkPeriodDashBoard = () => {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-svh flex-col bg-background text-foreground">
          <WorkPeriodDashBoardHeader />

          <div className="flex flex-1 min-h-0 w-full">
            <WorkPeriodDashBoardNavbar />

            <SidebarInset className="min-w-0 overflow-y-auto p-3 sm:p-4 md:p-6">
              <Outlet />
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default WorkPeriodDashBoard;
