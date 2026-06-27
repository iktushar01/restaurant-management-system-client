import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import ConfirmDialogProvider from "@/Shared/ConfirmDialog/ConfirmDialog";
import { AuthProvider } from "@/context/AuthProvider";
import { CurrencyProvider } from "@/context/CurrencyProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { router } from "./Router/Router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CurrencyProvider>
          <ConfirmDialogProvider>
            <RouterProvider router={router} />
            <Toaster />
          </ConfirmDialogProvider>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
