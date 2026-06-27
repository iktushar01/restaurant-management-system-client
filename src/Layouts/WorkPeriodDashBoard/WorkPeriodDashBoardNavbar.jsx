import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  CoinsIcon,
  FactoryIcon,
  HamburgerIcon,
  ListIcon,
  MapPinIcon,
  PackageIcon,
  ScaleIcon,
  ShoppingCartIcon,
  NetworkIcon,
  TableIcon,
  TagIcon,
  TruckIcon,
  UserIcon,
  UtensilsCrossedIcon,
  WarehouseIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    name: "Work Period",
    path: "/WorkPeriod/Index",
    icon: ShoppingCartIcon,
  },
  {
    name: "Foods",
    path: "/WorkPeriod/foods/index",
    icon: HamburgerIcon,
  },
  {
    name: "Food Category",
    path: "/WorkPeriod/foodCategory/index",
    icon: ListIcon,
  },
  {
    name: "Dine",
    path: "/dine",
    icon: UtensilsCrossedIcon,
    subRoutes: [
      { name: "Dining Location", path: "/WorkPeriod/dine/location", icon: TableIcon },
      { name: "Tables", path: "/WorkPeriod/dine/tables", icon: TableIcon },
    ],
  },
  {
    name: "Waiter",
    path: "/WorkPeriod/RestaurantDineWaiter/Index",
    icon: UserIcon,
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: PackageIcon,
    subRoutes: [
      { name: "Category", path: "/WorkPeriod/inventory/category", icon: WarehouseIcon },
      { name: "Sub Category", path: "/WorkPeriod/inventory/sub-category", icon: NetworkIcon },
      { name: "Items", path: "/WorkPeriod/inventory/items", icon: ClipboardListIcon },
      { name: "Brands", path: "/WorkPeriod/inventory/brands", icon: TagIcon },
      { name: "Stock Locations", path: "/WorkPeriod/inventory/stock-locations", icon: MapPinIcon },
      { name: "Units", path: "/WorkPeriod/inventory/units", icon: ScaleIcon },
      { name: "Vendors", path: "/WorkPeriod/inventory/vendors", icon: TruckIcon },
    ],
  },
  {
    name: "Property",
    path: "/WorkPeriod/PropertyInformation",
    icon: FactoryIcon,
  },
  {
    name: "Charges",
    path: "/WorkPeriod/Settings/Update",
    icon: CoinsIcon,
  },
];

const linkClass = ({ isActive }) =>
  cn(
    "flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors",
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
  );

const WorkPeriodDashBoardNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-lg font-bold">DineFlow</h1>}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="size-4" />
          ) : (
            <ChevronLeftIcon className="size-4" />
          )}
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      <ScrollArea className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSectionActive = item.subRoutes?.some(
              (sub) => location.pathname === sub.path
            );

            if (item.subRoutes) {
              return (
                <li key={item.name}>
                  <Collapsible defaultOpen={isSectionActive}>
                    <CollapsibleTrigger
                      render={
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-between px-3 py-2.5 h-auto font-normal text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isSectionActive &&
                              "bg-sidebar-accent text-sidebar-accent-foreground"
                          )}
                        />
                      }
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="size-4 shrink-0" />
                        {!isCollapsed && item.name}
                      </span>
                      {!isCollapsed && <ChevronRightIcon className="size-3" />}
                    </CollapsibleTrigger>
                    {!isCollapsed && (
                      <CollapsibleContent>
                        <ul className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-2">
                          {item.subRoutes.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <li key={subItem.name}>
                                <NavLink to={subItem.path} className={linkClass}>
                                  <SubIcon className="mr-2 size-3.5 shrink-0" />
                                  {subItem.name}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </li>
              );
            }

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={cn(linkClass, "px-3 py-2.5 gap-3")}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="size-4 shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </aside>
  );
};

export default WorkPeriodDashBoardNavbar;
