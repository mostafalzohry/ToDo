"use client";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/lib/store";
import { MUIThemeProvider } from "./mui-theme-provider";
import { SnackbarProvider } from "./snackbar-provider";
import { useState } from "react";

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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MUIThemeProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </MUIThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
