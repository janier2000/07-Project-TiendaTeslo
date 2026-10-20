import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { TiendaLayout } from "../tienda/layouts/TiendaLayout";
import { InicioPage } from "../tienda/pages/inicio/InicioPage";
import { ProductoPage } from "../tienda/pages/producto/ProductoPage";
import { GeneroPage } from "../tienda/pages/genero/GeneroPage";
import { AccesoPage } from "../autorizacion/pages/acceso/AccesoPage";
import { RegistroPage } from "../autorizacion/pages/registro/RegistroPage";
import { DashboardPage } from "../administrador/pages/dashboard/DashboardPage";
import { AdminProductosIndexPage } from "../administrador/pages/ProductosIndex/AdminProductosIndexPage";
import { AdminProductoPage } from "../administrador/pages/producto/AdminProductoPage";

// aca para esto funcione toca hacer el cambio a export default en AutorizacionLayout.tsx
const AutorizacionLayout = lazy(
  () => import("../autorizacion/layouts/AutorizacionLayout"),
);
const AdministradorLayout = lazy(
  () => import("../administrador/layouts/AdministradorLayout"),
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
    path: "/administrador",
    element: <AdministradorLayout />,
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
