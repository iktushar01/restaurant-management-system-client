import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
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
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

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

function WorkPeriodSidebarMenu() {
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavigate = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

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
                      tooltip={item.name}
                      isActive={isSectionActive}
                    />
                  }
                >
                  <Icon />
                  <span>{item.name}</span>
                  <ChevronRightIcon className="ml-auto size-4 transition-transform group-data-[panel-open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subRoutes.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isActive = location.pathname === subItem.path;

                      return (
                        <SidebarMenuSubItem key={subItem.path}>
                          <SidebarMenuSubButton
                            render={<NavLink to={subItem.path} onClick={handleNavigate} />}
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
              </Collapsible>
            </SidebarMenuItem>
          );
        }

        const isActive = location.pathname === item.path;

        return (
          <SidebarMenuItem key={item.path}>
            <SidebarMenuButton
              render={<NavLink to={item.path} onClick={handleNavigate} />}
              isActive={isActive}
              tooltip={item.name}
            >
              <Icon />
              <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

const WorkPeriodDashBoardNavbar = () => {
  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="[&_[data-slot=sidebar-container]]:top-16 [&_[data-slot=sidebar-container]]:bottom-auto [&_[data-slot=sidebar-container]]:h-[calc(100svh-4rem)]"
    >
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1 py-1">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="truncate text-base font-semibold">DineFlow</span>
          </div>
          <SidebarTrigger className="hidden shrink-0 md:flex" />
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <WorkPeriodSidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default WorkPeriodDashBoardNavbar;
