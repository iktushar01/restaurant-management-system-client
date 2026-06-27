import React, { useState, useEffect } from "react";
import {
  BoxIcon,
  CheckCircleIcon,
  HomeIcon,
  InfoIcon,
  ShoppingBagIcon,
  UtensilsCrossedIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dashboardService } from "../../services/dashboardService";

const getIconForType = (type) => {
  switch (type) {
    case "kabin":
      return HomeIcon;
    case "box":
      return BoxIcon;
    case "takeaway":
      return ShoppingBagIcon;
    default:
      return UtensilsCrossedIcon;
  }
};

const seatTypeClasses = {
  kabin: "bg-accent text-accent-foreground",
  box: "bg-destructive text-destructive-foreground",
  takeaway: "bg-success text-success-foreground",
  table: "bg-primary text-primary-foreground",
};

const RestaurantDashboardSeatList = () => {
  const [layoutData, setLayoutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    dashboardService
      .getSeatLayout()
      .then((res) => {
        setLayoutData(res.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLarge(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat.id === selectedSeat ? null : seat.id);
  };

  const getSeatClass = (seat) =>
    cn(
      "flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-200 p-1",
      seatTypeClasses[seat.type] ?? seatTypeClasses.table,
      selectedSeat === seat.id &&
        "scale-105 shadow-lg ring-2 ring-ring ring-offset-2 ring-offset-background"
    );

  const getSeatSize = (type) => {
    if (isMobile) {
      switch (type) {
        case "kabin":
          return { width: "80px", height: "50px" };
        case "box":
          return { width: "50px", height: "50px" };
        case "takeaway":
          return { width: "90px", height: "40px" };
        default:
          return { width: "40px", height: "40px" };
      }
    }
    if (isLarge) {
      switch (type) {
        case "kabin":
          return { width: "130px", height: "60px" };
        case "box":
          return { width: "80px", height: "80px" };
        case "takeaway":
          return { width: "130px", height: "50px" };
        default:
          return { width: "65px", height: "65px" };
      }
    }
    switch (type) {
      case "kabin":
        return { width: "100px", height: "50px" };
      case "box":
        return { width: "60px", height: "60px" };
      case "takeaway":
        return { width: "110px", height: "40px" };
      default:
        return { width: "50px", height: "50px" };
    }
  };

  const tableRows = {};
  layoutData
    .filter((item) => item.type === "table")
    .forEach((item) => {
      const row = item.seatName.charAt(0);
      if (!tableRows[row]) tableRows[row] = [];
      tableRows[row].push(item);
    });

  const kabin = layoutData.find((item) => item.type === "kabin");
  const boxes = layoutData.filter((item) => item.type === "box");
  const takeaway = layoutData.find((item) => item.type === "takeaway");

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading seat layout...
      </div>
    );
  }

  if (layoutData.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No tables configured. Add dine tables in settings.
      </div>
    );
  }

  const renderSeat = (seat, type) => {
    const Icon = getIconForType(seat.type);
    return (
      <div
        key={seat.id}
        className={getSeatClass(seat)}
        style={getSeatSize(type ?? seat.type)}
        onClick={() => handleSeatClick(seat)}
      >
        <Icon className="size-3 md:size-4" />
        <div className="text-xs mt-1">{seat.seatName}</div>
      </div>
    );
  };

  return (
    <div className="bg-muted/30 p-2 md:p-4 flex justify-center">
      <Card className="w-full  ">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-xl lg:text-2xl text-center flex items-center justify-center gap-2">
            <UtensilsCrossedIcon className="size-5 text-primary" />
            Restaurant Seating Layout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="layout-container bg-muted/40 p-3 md:p-4 lg:p-5 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-3 md:gap-0">
              {kabin && (
                <div className="text-center w-full md:w-auto">
                  <div className="text-xs md:text-sm font-semibold text-foreground mb-1 flex items-center justify-center gap-1">
                    <HomeIcon className="size-3.5" /> Kabin
                  </div>
                  {renderSeat(kabin, "kabin")}
                </div>
              )}

              <div className="text-center w-full md:w-auto">
                <div className="text-xs md:text-sm font-semibold text-foreground mb-1 flex items-center justify-center gap-1">
                  <BoxIcon className="size-3.5" /> Private Boxes
                </div>
                <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                  {boxes.map((box) => renderSeat(box, "box"))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs md:text-sm font-semibold text-foreground mb-2 text-center flex items-center justify-center gap-1">
                <UtensilsCrossedIcon className="size-3.5" /> Tables
              </div>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(tableRows).map(([row, seats]) => (
                  <div key={row} className="flex flex-wrap justify-center gap-1 md:gap-2">
                    {seats.map((seat) => renderSeat(seat, "table"))}
                  </div>
                ))}
              </div>
            </div>

            {takeaway && (
              <div className="flex justify-center mt-2">
                <div className="text-center">
                  <div className="text-xs md:text-sm font-semibold text-foreground mb-1 flex items-center justify-center gap-1">
                    <ShoppingBagIcon className="size-3.5" /> Takeaway
                  </div>
                  {renderSeat(takeaway, "takeaway")}
                </div>
              </div>
            )}
          </div>

          {selectedSeat && (
            <Alert className="border-primary/30 bg-primary/5">
              <InfoIcon />
              <AlertTitle>Selected Seat Information</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>
                  {layoutData.find((seat) => seat.id === selectedSeat)?.seatName} - Type:{" "}
                  {layoutData.find((seat) => seat.id === selectedSeat)?.type}
                </p>
                <Button size="sm" variant="outline" onClick={() => setSelectedSeat(null)}>
                  <CheckCircleIcon />
                  Clear Selection
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDashboardSeatList;
