import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  CoinsIcon,
  DollarSignIcon,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
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
    icon: UtensilsCrossedIcon,
    subRoutes: [
      { name: "Floor Plan", path: "/WorkPeriod/dine", icon: TableIcon },
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
  {
    name: "Currency",
    path: "/WorkPeriod/settings/currency",
    icon: DollarSignIcon,
  },
];

function WorkPeriodSidebarMenu({ collapsed = false, onNavigate }) {
  const location = useLocation();

  return (
    <SidebarMenu>
      {menuItems.map((item) => {
        const Icon = item.icon;

        if (item.subRoutes) {
          const isSectionActive = item.subRoutes.some(
            (sub) => location.pathname === sub.path
          );

          return (
            <SidebarMenuItem key={item.name}>
              <Collapsible
                defaultOpen={isSectionActive}
                className="group/collapsible"
              >
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton
                      tooltip={collapsed ? item.name : undefined}
                      isActive={isSectionActive}
                    />
                  }
                >
                  <Icon />
                  {!collapsed && <span>{item.name}</span>}
                  {!collapsed && (
                    <ChevronRightIcon className="ml-auto size-4 transition-transform group-data-[panel-open]/collapsible:rotate-90" />
                  )}
                </CollapsibleTrigger>
                {!collapsed && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subRoutes.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isActive = location.pathname === subItem.path;

                        return (
                          <SidebarMenuSubItem key={subItem.path}>
                            <SidebarMenuSubButton
                              render={<NavLink to={subItem.path} onClick={onNavigate} />}
                              isActive={isActive}
                            >
                              <SubIcon />
                              <span>{subItem.name}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </Collapsible>
            </SidebarMenuItem>
          );
        }

        const isActive = location.pathname === item.path;

        return (
          <SidebarMenuItem key={item.path}>
            <SidebarMenuButton
              render={<NavLink to={item.path} onClick={onNavigate} />}
              isActive={isActive}
              tooltip={collapsed ? item.name : undefined}
            >
              <Icon />
              {!collapsed && <span>{item.name}</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

function SidebarShell({ collapsed, onToggle, onNavigate, className }) {
  return (
    <aside
      data-state={collapsed ? "collapsed" : "expanded"}
      data-collapsible={collapsed ? "icon" : ""}
      className={cn(
        "group flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1 py-1">
          {!collapsed && (
            <span className="min-w-0 flex-1 truncate text-base font-semibold">
              DineFlow
            </span>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn("shrink-0 text-sidebar-foreground hover:bg-sidebar-accent", collapsed && "mx-auto")}
          >
            {collapsed ? (
              <ChevronRightIcon className="size-4" />
            ) : (
              <ChevronLeftIcon className="size-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <WorkPeriodSidebarMenu collapsed={collapsed} onNavigate={onNavigate} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </aside>
  );
}

const WorkPeriodDashBoardNavbar = () => {
  const { open, setOpen, isMobile, openMobile, setOpenMobile } = useSidebar();
  const collapsed = !open;

  const handleToggle = () => setOpen(!open);

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          className="w-[min(100vw-2rem,20rem)] p-0 gap-0 bg-sidebar text-sidebar-foreground border-sidebar-border"
        >
          <SheetHeader className="border-b border-sidebar-border px-4 py-4">
            <SheetTitle className="text-lg font-bold text-sidebar-foreground">
              DineFlow
            </SheetTitle>
          </SheetHeader>
          <SidebarContent className="h-[calc(100vh-4.5rem)] overflow-y-auto">
            <SidebarGroup>
              <SidebarGroupContent>
                <WorkPeriodSidebarMenu onNavigate={() => setOpenMobile(false)} />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <SidebarShell
      collapsed={collapsed}
      onToggle={handleToggle}
      className="hidden md:flex"
    />
  );
};

export default WorkPeriodDashBoardNavbar;
