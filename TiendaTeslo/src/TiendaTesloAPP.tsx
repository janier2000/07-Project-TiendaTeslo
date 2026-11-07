import { RouterProvider } from "react-router";
import { EnrutadorAPP } from "./ruta/EnrutadorAPP";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export function TiendaTesloAPP() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={EnrutadorAPP} />
    </QueryClientProvider>
  );
}
