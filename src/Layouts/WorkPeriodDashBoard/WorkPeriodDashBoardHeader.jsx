import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  ClockIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
  UtensilsCrossedIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WorkPeriodDashBoardHeader = ({ onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [username] = useState("John Doe");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <header className="h-16 bg-primary text-primary-foreground shadow-md">
      <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8 w-full mx-auto">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground shrink-0"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <MenuIcon className="size-5" />
          </Button>

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

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                />
              }
            >
              <Avatar className="size-7 mr-2">
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xs">
                  {username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline truncate max-w-[120px]">
                {username}
              </span>
              <ChevronDownIcon className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                <span className="text-xs text-muted-foreground block">Signed in as</span>
                {username}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default WorkPeriodDashBoardHeader;
