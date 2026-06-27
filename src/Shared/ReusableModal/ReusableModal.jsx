import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "sm:max-w-md",
  md: "sm:max-w-2xl",
  lg: "sm:max-w-4xl",
  xl: "sm: ",
};

const ReusableModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton
        className={cn("gap-0 p-0 overflow-hidden", sizeClasses[size])}
      >
        {title && (
          <DialogHeader className="bg-primary px-6 py-4 text-left">
            <DialogTitle className="text-primary-foreground text-2xl font-bold">
              {title}
            </DialogTitle>
            {subtitle && (
              <DialogDescription className="text-primary-foreground/80 mt-1">
                {subtitle}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className="p-6">{children}</div>

        {footer && (
          <DialogFooter className="border-t bg-muted/30 px-6 py-4">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReusableModal;
