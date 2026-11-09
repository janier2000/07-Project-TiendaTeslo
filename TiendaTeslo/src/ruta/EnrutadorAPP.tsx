import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { RutaNoAutenticado, RutaAdmin } from "../components/ProteccionRuta";
import { TiendaLayout } from "../3-tienda/layouts/TiendaLayout";
import { InicioPage } from "../3-tienda/pages/inicio/InicioPage";
import { ProductoPage } from "../3-tienda/pages/producto/ProductoPage";
import { GeneroPage } from "../3-tienda/pages/genero/GeneroPage";
import { AccesoPage } from "../2-auth/pages/acceso/AccesoPage";
import { RegistroPage } from "../2-auth/pages/registro/RegistroPage";
import { DashboardPage } from "@/1-admin/pages/dashboard/DashboardPage";
import { AdminIndexProductosPage } from "@/1-admin/pages/productosIndex/AdminIndexProductosPage";
import { AdminProductoPage } from "@/1-admin/pages/producto/AdminProductoPage";

const AuthLayout = lazy(() =>
  import("../2-auth/layouts/AuthLayout").then(({ AuthLayout }) => ({
    default: AuthLayout,
  })),
);

const AdminLayout = lazy(() =>
  import("../1-admin/layouts/AdminLayout").then(({ AdminLayout }) => ({
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
    element: (
      <RutaNoAutenticado>
        <AuthLayout />
      </RutaNoAutenticado>
    ),
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
    element: (
      <RutaAdmin>
        <AdminLayout />
      </RutaAdmin>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "producto",
        element: <AdminIndexProductosPage />,
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
