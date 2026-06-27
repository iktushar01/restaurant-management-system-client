import React from "react";
import {
  CheckCircleIcon,
  ClipboardListIcon,
  UtensilsCrossedIcon,
  XCircleIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const STAT_CONFIG = [
  {
    key: "inOrder",
    label: "In Order",
    icon: ClipboardListIcon,
    accent: "border-l-primary text-primary",
    iconBg: "bg-primary/10",
  },
  {
    key: "currentlyServed",
    label: "Currently Served",
    icon: UtensilsCrossedIcon,
    accent: "border-l-success text-success",
    iconBg: "bg-success/10",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    icon: XCircleIcon,
    accent: "border-l-destructive text-destructive",
    iconBg: "bg-destructive/10",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircleIcon,
    accent: "border-l-accent-foreground text-foreground",
    iconBg: "bg-accent",
  },
];

const RestaurantDashboard = ({ stats, loading }) => {
  return (
    <div className="w-full bg-background p-3 sm:p-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {STAT_CONFIG.map((stat) => {
          const Icon = stat.icon;
          const value = stats?.[stat.key] ?? 0;

          return (
            <Card
              key={stat.key}
              className={cn("border-l-4 shadow-sm", stat.accent.split(" ")[0])}
            >
              <CardContent className="flex justify-between items-center p-5">
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {loading ? (
                      <span className="inline-block h-9 w-10 rounded bg-muted animate-pulse" />
                    ) : (
                      value
                    )}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
                <div className={cn("p-3 rounded-full", stat.iconBg)}>
                  <Icon className={cn("size-5", stat.accent.split(" ").slice(1).join(" "))} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantDashboard;
