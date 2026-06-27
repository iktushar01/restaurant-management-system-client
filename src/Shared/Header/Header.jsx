import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClockIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserAccountMenu } from "@/Shared/UserAccountMenu/UserAccountMenu";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

          <UserAccountMenu showAvatarOnMobile />
        </div>
      </div>
    </header>
  );
};

export default Header;
