import React, { createContext, useCallback, useContext, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ConfirmDialogContext = createContext(null);

export function ConfirmDialogProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    title: "",
    description: "",
    confirmLabel: "Continue",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const confirm = useCallback(
    ({
      title = "Are you sure?",
      description = "",
      confirmLabel = "Continue",
      cancelLabel = "Cancel",
    } = {}) =>
      new Promise((resolve) => {
        setState({
          open: true,
          title,
          description,
          confirmLabel,
          cancelLabel,
          onConfirm: resolve,
        });
      }),
    []
  );

  const handleOpenChange = (open) => {
    if (!open) {
      state.onConfirm?.(false);
      setState((prev) => ({ ...prev, open: false, onConfirm: null }));
    }
  };

  const handleConfirm = () => {
    state.onConfirm?.(true);
    setState((prev) => ({ ...prev, open: false, onConfirm: null }));
  };

  const handleCancel = () => {
    state.onConfirm?.(false);
    setState((prev) => ({ ...prev, open: false, onConfirm: null }));
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <AlertDialog open={state.open} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{state.title}</AlertDialogTitle>
            {state.description && (
              <AlertDialogDescription>{state.description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {state.cancelLabel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {state.confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error("useConfirmDialog must be used within ConfirmDialogProvider");
  }
  return context;
}

export default ConfirmDialogProvider;
