"use client";

import { useSnackbar } from "@/lib/hooks/use-snackbar";
import { Snackbar, Alert } from "@mui/material";
import { createContext, useContext, ReactNode } from "react";

interface SnackbarContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbarContext must be used within SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const contextValue: SnackbarContextType = {
    showSuccess: (message: string) => showSnackbar(message, "success"),
    showError: (message: string) => showSnackbar(message, "error"),
    showWarning: (message: string) => showSnackbar(message, "warning"),
    showInfo: (message: string) => showSnackbar(message, "info"),
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
