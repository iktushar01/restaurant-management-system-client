import React from "react";
import {
  CheckCircleIcon,
  ClipboardListIcon,
  UtensilsCrossedIcon,
  XCircleIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const statCards = [
  {
    label: "In Order",
    value: "12",
    icon: ClipboardListIcon,
    accent: "border-l-primary text-primary",
    iconBg: "bg-primary/10",
  },
  {
    label: "Currently Served",
    value: "8",
    icon: UtensilsCrossedIcon,
    accent: "border-l-success text-success",
    iconBg: "bg-success/10",
  },
  {
    label: "Cancelled",
    value: "3",
    icon: XCircleIcon,
    accent: "border-l-destructive text-destructive",
    iconBg: "bg-destructive/10",
  },
  {
    label: "Completed",
    value: "15",
    icon: CheckCircleIcon,
    accent: "border-l-accent-foreground text-foreground",
    iconBg: "bg-accent",
  },
];

const RestaurantDashboard = () => {
  return (
    <div className="bg-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={cn("border-l-4 shadow-sm", stat.accent.split(" ")[0])}
            >
              <CardContent className="flex justify-between items-center p-5">
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
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
