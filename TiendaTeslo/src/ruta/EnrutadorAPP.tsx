import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { TiendaLayout } from "../tienda/layouts/TiendaLayout";
import { InicioPage } from "../tienda/pages/inicio/InicioPage";
import { ProductoPage } from "../tienda/pages/producto/ProductoPage";
import { GeneroPage } from "../tienda/pages/genero/GeneroPage";
import { AccesoPage } from "../auth/pages/acceso/AccesoPage";
import { RegistroPage } from "../auth/pages/registro/RegistroPage";
import { DashboardPage } from "@/admin/pages/dashboard/DashboardPage";
import { AdminProductosIndexPage } from "@/admin/pages/ProductosIndex/AdminProductosIndexPage";
import { AdminProductoPage } from "@/admin/pages/producto/AdminProductoPage";

const AuthLayout = lazy(() =>
  import("../auth/layouts/AuthLayout").then(({ AuthLayout }) => ({
    default: AuthLayout,
  })),
);

const AdminLayout = lazy(() =>
  import("../admin/layouts/AdminLayout").then(({ AdminLayout }) => ({
    default: AdminLayout,
  })),
);

export const EnrutadorAPP = createBrowserRouter([
  // Rutas principales
  {
    path: "/",
    element: <TiendaLayout />,
    children: [
      {
        index: true,
        element: <InicioPage />,
      },
      {
        path: "producto/:idSlug",
        element: <ProductoPage />,
      },
      {
        path: "genero/:genero",
        element: <GeneroPage />,
      },
    ],
  },

  // Rutas de autenticación
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/acceso" />,
      },
      {
        path: "acceso",
        element: <AccesoPage />,
      },
      {
        path: "registro",
        element: <RegistroPage />,
      },
    ],
  },
  // Rutas de administrador
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "productos",
        element: <AdminProductosIndexPage />,
      },
      {
        path: "producto/:id",
        element: <AdminProductoPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
