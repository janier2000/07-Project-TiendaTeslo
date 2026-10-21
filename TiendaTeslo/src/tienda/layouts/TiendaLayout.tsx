import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";

export function TiendaLayout() {
  return (
    <div>
      Tienda Layout
      <Outlet />
      <Button> prueba </Button>
    </div>
  );
}
