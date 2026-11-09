import { Navigate } from "react-router";
import type { PropsWithChildren } from "react";
import { useAuthStore } from "@/2-auth/store/useAuthStore";

export function RutaAutenticado({ children }: PropsWithChildren) {
  const { estadosAut } = useAuthStore();
  if (estadosAut === "checkiado") {
    return null;
  } else if (estadosAut === "no-autenticado") {
    return <Navigate to="/auth/login" />;
  }
  return children;
}

export function RutaNoAutenticado({ children }: PropsWithChildren) {
  const { estadosAut } = useAuthStore();
  if (estadosAut === "checkiado") {
    return null;
  } else if (estadosAut === "autenticado") {
    return <Navigate to="/" />;
  }
  return children;
}

export function RutaAdmin({ children }: PropsWithChildren) {
  const { estadosAut, esAdminStore } = useAuthStore();
  if (estadosAut === "checkiado") {
    return null;
  } else if (estadosAut === "no-autenticado") {
    return <Navigate to="/auth/login" />;
  }

  if (!esAdminStore()) {
    return <Navigate to="/" />;
  }
  return children;
}
