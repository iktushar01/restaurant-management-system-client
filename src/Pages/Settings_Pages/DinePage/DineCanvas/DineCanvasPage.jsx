import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { LayoutGridIcon, RotateCcwIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";
import DineFloorPlanCanvas from "@/components/dine/DineFloorPlanCanvas";
import { floorPlanService } from "@/services/floorPlanService";

const saveStateLabels = {
  idle: "",
  saving: "Saving...",
  saved: "Saved",
  error: "Save failed",
};

const DineCanvasPage = () => {
  const { confirm } = useConfirmDialog();
  const [saveState, setSaveState] = useState("idle");
  const [canvasKey, setCanvasKey] = useState(0);
  const [resetting, setResetting] = useState(false);

  const handleResetLayout = async () => {
    const ok = await confirm({
      title: "Reset floor plan layout?",
      description:
        "This clears all saved zone and table positions and re-runs the default auto-layout.",
    });
    if (!ok) return;

    setResetting(true);
    try {
      await floorPlanService.resetLayout();
      setCanvasKey((key) => key + 1);
      toast.success("Layout reset to default positions");
    } catch (err) {
      toast.error(err.message || "Failed to reset layout");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] p-4 md:p-6 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/WorkPeriod/dine/tables">
            <Button variant="outline" size="sm" className="gap-2">
              <FiArrowLeft className="size-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <LayoutGridIcon className="size-6 text-primary" />
              Floor Plan Editor
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Drag zones and tables to arrange your restaurant layout. Positions save when you drop.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveStateLabels[saveState] && (
            <span
              className={`text-sm ${
                saveState === "error"
                  ? "text-destructive"
                  : saveState === "saving"
                    ? "text-muted-foreground"
                    : "text-emerald-500"
              }`}
            >
              {saveStateLabels[saveState]}
            </span>
          )}
          <Button
            variant="outline"
            onClick={handleResetLayout}
            disabled={resetting}
            className="gap-2"
          >
            <RotateCcwIcon className="size-4" />
            {resetting ? "Resetting..." : "Reset Layout"}
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-3 md:p-4">
        <div className="mb-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded bg-emerald-500" /> Vacant
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded bg-amber-400" /> Reserved
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded bg-red-500" /> Occupied
          </span>
          <span className="hidden sm:inline">• Snap grid: 10px</span>
        </div>

        <DineFloorPlanCanvas
          key={canvasKey}
          onSaveStateChange={setSaveState}
          minHeight={640}
        />
      </div>
    </div>
  );
};

export default DineCanvasPage;
