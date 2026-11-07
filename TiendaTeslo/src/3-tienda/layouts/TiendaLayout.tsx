import { Outlet } from "react-router";
import { TiendaHeader } from "../components/TiendaHeader";
import { TiendaFooter } from "../components/TiendaFooter";

export function TiendaLayout() {
  return (
    <div className="min-h-screen bg-background">
      <TiendaHeader></TiendaHeader>
      <Outlet />
      <TiendaFooter></TiendaFooter>
    </div>
  );
}
