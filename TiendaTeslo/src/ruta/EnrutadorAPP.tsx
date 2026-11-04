import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { TiendaLayout } from "../tienda/layouts/TiendaLayout";
import { InicioPage } from "../tienda/pages/inicio/InicioPage";
import { ProductoPage } from "../tienda/pages/producto/ProductoPage";
import { GeneroPage } from "../tienda/pages/genero/GeneroPage";
import { AccesoPage } from "../autorizacion/pages/acceso/AccesoPage";
import { RegistroPage } from "../autorizacion/pages/registro/RegistroPage";
import { DashboardPage } from "@/admin/pages/dashboard/DashboardPage";
import { AdminProductosIndexPage } from "@/admin/pages/ProductosIndex/AdminProductosIndexPage";
import { AdminProductoPage } from "@/admin/pages/producto/AdminProductoPage";

const AutorizacionLayout = lazy(() =>
  import("../autorizacion/layouts/AutorizacionLayout").then(
    ({ AutorizacionLayout }) => ({ default: AutorizacionLayout }),
  ),
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
    path: "/autorizacion",
    element: <AutorizacionLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/autorizacion/acceso" />,
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
