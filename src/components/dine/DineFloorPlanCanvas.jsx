import React, { useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { UsersIcon, UtensilsCrossedIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  clampPosition,
  DEFAULT_TABLE_SIZE,
  getLocationTypeLabel,
  getLocationZoneClasses,
  getTableStatusClasses,
  GRID_SIZE,
  snapToGrid,
  findZoneAtPoint,
} from "@/lib/floorPlanUtils";
import { floorPlanService } from "@/services/floorPlanService";
import { dineLocationService } from "@/services/dineLocationService";
import { dineTableService } from "@/services/dineTableService";

const DineFloorPlanCanvas = ({
  readOnly = false,
  onSaveStateChange,
  className,
  minHeight = 420,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canvas, setCanvas] = useState({ width: 1400, height: 900, gridSize: GRID_SIZE });
  const [locations, setLocations] = useState([]);
  const [tables, setTables] = useState([]);
  const saveTimerRef = useRef(null);

  const notifySaveState = useCallback(
    (state) => {
      onSaveStateChange?.(state);
      if (state === "saved") {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(() => onSaveStateChange?.("idle"), 2000);
      }
    },
    [onSaveStateChange]
  );

  const loadFloorPlan = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await floorPlanService.getFloorPlan();
      setCanvas(res.data.canvas);
      setLocations(res.data.locations);
      setTables(res.data.tables);
    } catch (err) {
      setError(err.message || "Failed to load floor plan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFloorPlan();
    return () => clearTimeout(saveTimerRef.current);
  }, [loadFloorPlan]);

  const persistLocation = async (id, payload) => {
    notifySaveState("saving");
    try {
      await dineLocationService.update(id, payload);
      notifySaveState("saved");
    } catch (err) {
      notifySaveState("error");
      throw err;
    }
  };

  const persistTable = async (id, payload) => {
    notifySaveState("saving");
    try {
      await dineTableService.update(id, payload);
      notifySaveState("saved");
    } catch (err) {
      notifySaveState("error");
      throw err;
    }
  };

  const handleLocationDragStop = async (locationId, d) => {
    const location = locations.find((item) => item.id === locationId);
    if (!location) return;

    const { x, y } = clampPosition(
      d.x,
      d.y,
      location.width,
      location.height,
      canvas.width,
      canvas.height
    );

    setLocations((prev) =>
      prev.map((item) =>
        item.id === locationId ? { ...item, positionX: x, positionY: y } : item
      )
    );

    try {
      await persistLocation(locationId, {
        positionX: x,
        positionY: y,
        width: location.width,
        height: location.height,
      });
    } catch {
      loadFloorPlan();
    }
  };

  const handleLocationResizeStop = async (locationId, ref, position) => {
    const width = snapToGrid(parseInt(ref.style.width, 10));
    const height = snapToGrid(parseInt(ref.style.height, 10));
    const { x, y } = clampPosition(
      position.x,
      position.y,
      width,
      height,
      canvas.width,
      canvas.height
    );

    setLocations((prev) =>
      prev.map((item) =>
        item.id === locationId
          ? { ...item, positionX: x, positionY: y, width, height }
          : item
      )
    );

    try {
      await persistLocation(locationId, {
        positionX: x,
        positionY: y,
        width,
        height,
      });
    } catch {
      loadFloorPlan();
    }
  };

  const handleTableDragStop = async (tableId, d) => {
    const table = tables.find((item) => item.id === tableId);
    if (!table) return;

    const { x, y } = clampPosition(
      d.x,
      d.y,
      DEFAULT_TABLE_SIZE,
      DEFAULT_TABLE_SIZE,
      canvas.width,
      canvas.height
    );

    const zone = findZoneAtPoint(x, y, DEFAULT_TABLE_SIZE, DEFAULT_TABLE_SIZE, locations);
    const nextLocationId = zone?.id ?? table.locationId;

    setTables((prev) =>
      prev.map((item) =>
        item.id === tableId
          ? {
              ...item,
              positionX: x,
              positionY: y,
              locationId: nextLocationId,
              locationName: zone?.name ?? item.locationName,
            }
          : item
      )
    );

    try {
      await persistTable(tableId, {
        positionX: x,
        positionY: y,
        ...(zone && zone.id !== table.locationId ? { locationId: zone.id } : {}),
      });
    } catch {
      loadFloorPlan();
    }
  };

  if (loading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-border bg-muted/20 text-muted-foreground",
          className
        )}
        style={{ minHeight }}
      >
        Loading floor plan...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-destructive/30 bg-destructive/10 text-destructive p-6",
          className
        )}
        style={{ minHeight }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-auto rounded-xl border border-border bg-[#0a0a0a] shadow-inner",
        className
      )}
      style={{ minHeight, maxHeight: readOnly ? 520 : 720 }}
    >
      <div
        className="relative"
        style={{ width: canvas.width, height: canvas.height, minWidth: canvas.width }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(250,204,21,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,204,21,0.08) 1px, transparent 1px)",
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          }}
        />

        {locations.map((location) => (
          <Rnd
            key={location.id}
            bounds="parent"
            dragGrid={[GRID_SIZE, GRID_SIZE]}
            resizeGrid={[GRID_SIZE, GRID_SIZE]}
            size={{ width: location.width, height: location.height }}
            position={{ x: location.positionX, y: location.positionY }}
            disableDragging={readOnly}
            enableResizing={!readOnly}
            minWidth={160}
            minHeight={120}
            onDragStop={(_e, d) => handleLocationDragStop(location.id, d)}
            onResizeStop={(_e, _dir, ref, _delta, position) =>
              handleLocationResizeStop(location.id, ref, position)
            }
            className={cn(
              "!absolute rounded-xl border-2 border-dashed",
              getLocationZoneClasses(location.type)
            )}
            style={{ zIndex: 1 }}
          >
            <div className="flex h-full flex-col p-3 pointer-events-none">
              <div className="text-sm font-semibold truncate">{location.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {getLocationTypeLabel(location.type)}
              </div>
            </div>
          </Rnd>
        ))}

        {tables.map((table) => (
          <Rnd
            key={table.id}
            bounds="parent"
            dragGrid={[GRID_SIZE, GRID_SIZE]}
            size={{ width: DEFAULT_TABLE_SIZE, height: DEFAULT_TABLE_SIZE }}
            position={{ x: table.positionX, y: table.positionY }}
            disableDragging={readOnly}
            enableResizing={false}
            onDragStop={(_e, d) => handleTableDragStop(table.id, d)}
            className={cn(
              "!absolute flex flex-col items-center justify-center rounded-lg border-2 shadow-md cursor-grab active:cursor-grabbing",
              getTableStatusClasses(table.status)
            )}
            style={{ zIndex: 2 }}
          >
            <UtensilsCrossedIcon className="size-4 mb-0.5 pointer-events-none" />
            <span className="text-xs font-bold pointer-events-none">{table.tableNo}</span>
            <span className="text-[10px] opacity-90 flex items-center gap-0.5 pointer-events-none">
              <UsersIcon className="size-2.5" />
              {table.capacity}
            </span>
          </Rnd>
        ))}

        {locations.length === 0 && tables.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Add dining locations and tables to build your floor plan.
          </div>
        )}
      </div>
    </div>
  );
};

export default DineFloorPlanCanvas;
