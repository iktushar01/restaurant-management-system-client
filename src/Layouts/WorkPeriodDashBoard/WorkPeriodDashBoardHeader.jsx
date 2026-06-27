import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ClockIcon,
  HomeIcon,
  UtensilsCrossedIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserAccountMenu } from "@/Shared/UserAccountMenu/UserAccountMenu";

const WorkPeriodDashBoardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <header className="h-16 shrink-0 bg-primary text-primary-foreground shadow-md">
      <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8 w-full mx-auto">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <SidebarTrigger
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:hidden"
          />

          <div className="flex sm:hidden items-center gap-2 min-w-0">
            <UtensilsCrossedIcon className="size-5 shrink-0" />
            <span className="font-bold text-base truncate">DineFlow</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <UtensilsCrossedIcon className="size-6" />
            <span className="font-bold text-xl">DineFlow</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            render={<Link to="/RestaurantDashboard/Index" />}
          >
            <HomeIcon className="size-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          <div className="flex items-center font-medium bg-primary-foreground/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
            <ClockIcon className="mr-1.5 sm:mr-2 size-4 shrink-0" />
            <span className="tabular-nums text-xs sm:text-base">
              {formatTime(currentTime)}
            </span>
          </div>

          <ModeToggle className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />

          <UserAccountMenu />
        </div>
      </div>
    </header>
  );
};

export default WorkPeriodDashBoardHeader;
