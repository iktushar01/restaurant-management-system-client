import { ClockIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  IS_RENDER_API,
  SERVER_WAKE_UP_MESSAGE,
  SERVER_WAKE_UP_SECONDS,
} from "@/constants/apiConfig";
import { cn } from "@/lib/utils";

export function ServerWakeUpNotice({ className, compact = false }) {
  if (!IS_RENDER_API) return null;

  if (compact) {
    return (
      <p className={cn("text-sm text-muted-foreground text-center", className)}>
        Server wake-up may take up to {SERVER_WAKE_UP_SECONDS}s — please wait…
      </p>
    );
  }

  return (
    <Alert className={cn("border-amber-500/40 bg-amber-500/10", className)}>
      <ClockIcon className="text-amber-600 dark:text-amber-400" />
      <AlertTitle className="text-amber-900 dark:text-amber-100">
        First load may take up to {SERVER_WAKE_UP_SECONDS} seconds
      </AlertTitle>
      <AlertDescription className="text-amber-900/90 dark:text-amber-100/90">
        {SERVER_WAKE_UP_MESSAGE}
      </AlertDescription>
    </Alert>
  );
}
