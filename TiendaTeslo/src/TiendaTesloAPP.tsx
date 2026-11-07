import { RouterProvider } from "react-router";
import { EnrutadorAPP } from "./ruta/EnrutadorAPP";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export function TiendaTesloAPP() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={EnrutadorAPP} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
