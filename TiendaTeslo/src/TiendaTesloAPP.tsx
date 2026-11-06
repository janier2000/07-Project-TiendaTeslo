import { RouterProvider } from "react-router";
import { EnrutadorAPP } from "./ruta/EnrutadorAPP";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function TiendaTesloAPP() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={EnrutadorAPP} />
    </QueryClientProvider>
  );
}
