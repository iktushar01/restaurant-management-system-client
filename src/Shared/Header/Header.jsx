import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClockIcon, ChevronDownIcon, LogOutIcon, UserIcon } from "lucide-react";
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

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [username] = useState("John Doe");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <header className="sticky top-0 z-50 h-14 shrink-0 bg-primary text-primary-foreground shadow-md">
      <div className="flex h-full w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/RestaurantDashboard/Index"
          className="text-xl sm:text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity shrink-0"
        >
          DineFlow
        </Link>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden sm:flex items-center font-medium tabular-nums text-sm">
            <ClockIcon className="mr-2 size-4 opacity-90" />
            {formatTime(currentTime)}
          </div>

          <ModeToggle className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground gap-1.5"
                />
              }
            >
              <span className="hidden sm:inline truncate max-w-[140px]">{username}</span>
              <Avatar className="size-7 sm:hidden">
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xs">
                  {username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <ChevronDownIcon className="size-4 opacity-80" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{username}</DropdownMenuLabel>
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

export default Header;
