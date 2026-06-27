import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import { formatRoleLabel } from "@/constants/rolePermissions";
import { cn } from "@/lib/utils";

function getDisplayName(user) {
  if (!user) return "User";
  return user.admin?.name || user.normalUser?.name || user.email || "User";
}

function getInitials(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
}

export function UserAccountMenu({ triggerClassName, showAvatarOnMobile = false }) {
  const navigate = useNavigate();
  const { user, role, logout, hasRole } = useAuth();
  const displayName = getDisplayName(user);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className={cn(
              "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground gap-1.5",
              triggerClassName
            )}
          />
        }
      >
        {showAvatarOnMobile ? (
          <>
            <span className="hidden sm:inline truncate max-w-[140px]">{displayName}</span>
            <Avatar className="size-7 sm:hidden">
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xs">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>
            <Avatar className="size-7 mr-0 sm:mr-2">
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xs">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline truncate max-w-[120px]">{displayName}</span>
          </>
        )}
        <ChevronDownIcon className="size-4 opacity-80" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium leading-none">{displayName}</span>
              {user?.email && (
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              )}
              {role && (
                <Badge variant="secondary" className="w-fit text-[10px]">
                  {formatRoleLabel(role)}
                </Badge>
              )}
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {hasRole("ADMIN", "SUPER_ADMIN") && (
            <DropdownMenuItem render={<Link to="/WorkPeriod/PropertyInformation" />}>
              <UserIcon />
              Profile
            </DropdownMenuItem>
          )}
          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            <LogOutIcon />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
