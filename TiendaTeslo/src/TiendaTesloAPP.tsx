import { RouterProvider } from "react-router";
import { EnrutadorAPP } from "./ruta/EnrutadorAPP";
import { type PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CargaPantallaCompleta } from "./components/CargaPantallaCompleta";
import { useAuthStore } from "./2-auth/store/useAuthStore";

const queryClient = new QueryClient();

const VerificarAuthProveedora = ({ children }: PropsWithChildren) => {
  const { chequearEstadoStore } = useAuthStore();

  const { isLoading, data } = useQuery({
    queryKey: ["auth"],
    queryFn: chequearEstadoStore,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });

  console.log("está cargando:", isLoading);
  console.log("data:", { data });

  if (isLoading) {
    return <CargaPantallaCompleta />;
  }
  return children;
};

export function TiendaTesloAPP() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      {/* Proveedor personalizado */}
      <VerificarAuthProveedora>
        <RouterProvider router={EnrutadorAPP} />
      </VerificarAuthProveedora>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
