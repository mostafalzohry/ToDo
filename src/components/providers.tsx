"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MUIThemeProvider } from "./mui-theme-provider";
import { SnackbarProvider } from "./snackbar-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <MUIThemeProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </MUIThemeProvider>
    </QueryClientProvider>
  );
}
