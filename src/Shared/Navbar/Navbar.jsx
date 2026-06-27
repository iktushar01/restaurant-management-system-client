import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BanknoteIcon,
  CalendarIcon,
  ChevronDownIcon,
  CreditCardIcon,
  FileTextIcon,
  HomeIcon,
  MenuIcon,
  PackageIcon,
  PieChartIcon,
  SettingsIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    name: "Dashboard",
    icon: HomeIcon,
    path: "/RestaurantDashboard/Index",
  },
  {
    name: "Order",
    icon: ShoppingBagIcon,
    path: "/RestaurantOrder/Orders",
  },
  {
    name: "Event",
    icon: CalendarIcon,
    path: "/event",
    subMenu: [
      { name: "Dashboard", path: "/event/dashboard" },
      { name: "Manage Event", path: "/event/manage" },
      { name: "Today's Events", path: "/event/today" },
    ],
  },
  {
    name: "Inventory",
    icon: PackageIcon,
    path: "/inventory",
    subMenu: [
      { name: "Home", path: "/inventory" },
      { name: "Purchase", path: "/inventory/purchase" },
      { name: "Purchase Details", path: "/inventory/purchase-details" },
      { name: "Settings", path: "/WorkPeriod/inventory/category" },
    ],
  },
  {
    name: "HR",
    icon: UsersIcon,
    path: "/hr",
    subMenu: [
      { name: "Add Designation", path: "/hr/designation/Index" },
      { name: "Add Earning Heading", path: "/hr/earning-heading/Index" },
      { name: "Add Deduction Heading", path: "/hr/deduction-heading/Index" },
      { name: "Employee Payroll", path: "/hr/HrEmployeePayroll/Index" },
      { name: "Employee Salary Payable", path: "/hr/salary-payable/Index" },
      {
        name: "Grand Employee Salary Payable",
        path: "/hr/grand-salary/Index",
      },
    ],
  },
  {
    name: "Income",
    icon: BanknoteIcon,
    path: "/income",
    subMenu: [
      { name: "Add Income Types", path: "/income/OthersIncomeHead/Index" },
      { name: "Manage Income", path: "/income/OthersIncome/Index" },
      { name: "Day Wise Income", path: "/income/daily-income" },
    ],
  },
  {
    name: "Expense",
    icon: CreditCardIcon,
    path: "/expense",
    subMenu: [
      { name: "Add Expense Types", path: "/expense/ExpenseHead/Index" },
      { name: "Manage Expenses", path: "/expense/manage" },
      { name: "Day Wise Expense", path: "/expense/daily-expense" },
    ],
  },
  {
    name: "Bank",
    icon: PieChartIcon,
    path: "/bank",
    subMenu: [
      { name: "Bank", path: "/bank/bankinfo/Index" },
      { name: "Branch", path: "/bank/BankBranchInfo/Index" },
      { name: "Transactions", path: "/bank/BankAccountInfo/Index" },
    ],
  },
  {
    name: "Due",
    icon: FileTextIcon,
    path: "/due",
    subMenu: [{ name: "Due Details", path: "/due/details" }],
  },
  {
    name: "Report",
    icon: FileTextIcon,
    path: "/report",
    subMenu: [
      { name: "Current Report", path: "/report/current" },
      { name: "Daily Statement", path: "/report/daily" },
    ],
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    path: "/WorkPeriod/Index",
  },
];

const navLinkClass = ({ isActive }) =>
  cn(
    "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors whitespace-nowrap",
    isActive
      ? "bg-accent text-accent-foreground font-medium"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
  );

const DesktopNavItem = ({ item }) => {
  const location = useLocation();
  const Icon = item.icon;
  const isSubmenuActive =
    item.subMenu?.some((subItem) => location.pathname === subItem.path) ?? false;

  if (!item.subMenu) {
    return (
      <NavLink to={item.path} className={navLinkClass}>
        <Icon className="size-4" />
        <span>{item.name}</span>
      </NavLink>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className={cn(
              "h-auto px-3 py-2 font-normal",
              isSubmenuActive && "bg-accent text-accent-foreground"
            )}
          />
        }
      >
        <Icon className="size-4" />
        <span>{item.name}</span>
        <ChevronDownIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {item.subMenu.map((subItem) => (
          <DropdownMenuItem key={subItem.path} render={<NavLink to={subItem.path} />}>
            {subItem.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileNavItem = ({ item, onNavigate }) => {
  const Icon = item.icon;
  const [open, setOpen] = useState(false);

  if (!item.subMenu) {
    return (
      <NavLink
        to={item.path}
        className={navLinkClass}
        onClick={onNavigate}
      >
        <Icon className="size-4" />
        <span>{item.name}</span>
      </NavLink>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <span className="flex items-center gap-2">
          <Icon className="size-4" />
          {item.name}
        </span>
        <ChevronDownIcon className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
          {item.subMenu.map((subItem) => (
            <NavLink
              key={subItem.path}
              to={subItem.path}
              className={navLinkClass}
              onClick={onNavigate}
            >
              {subItem.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-card text-card-foreground border-b border-border shadow-sm">
      <div className="   mx-auto px-4">
        <div className="flex justify-between items-center py-3 md:hidden">
          <span className="text-lg font-medium">Menu</span>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={<Button variant="outline" size="icon-sm" />}
            >
              <MenuIcon className="size-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                  <MobileNavItem
                    key={item.name}
                    item={item}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex justify-center flex-wrap gap-1 py-2">
          {menuItems.map((item) => (
            <DesktopNavItem key={item.name} item={item} />
          ))}
        </div>
      </div>
      <Separator />
    </nav>
  );
};

export default Navbar;
