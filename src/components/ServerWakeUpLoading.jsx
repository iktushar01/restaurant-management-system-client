import { Loader2Icon } from "lucide-react";
import { ServerWakeUpNotice } from "@/components/ServerWakeUpNotice";
import { cn } from "@/lib/utils";

export function ServerWakeUpLoading({ message = "Loading...", className }) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center gap-6 bg-background p-6",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2Icon className="size-10 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      </div>
      <div className="w-full max-w-md">
        <ServerWakeUpNotice />
      </div>
    </div>
  );
}
