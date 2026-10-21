import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { TiendaHeader } from "@/tienda/components/tiendaHeader";

export function TiendaLayout() {
  return (
    <div className="min-h-screen bg-background">
      <TiendaHeader></TiendaHeader>
      <Outlet />
      <Button> prueba </Button>
    </div>
  );
}
