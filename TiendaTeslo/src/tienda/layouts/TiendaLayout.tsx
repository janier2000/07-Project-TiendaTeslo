import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function TiendaLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header></Header>
      <Outlet />
      <Button> prueba </Button>
      <Footer></Footer>
    </div>
  );
}
