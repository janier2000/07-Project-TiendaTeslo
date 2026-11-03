import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function TiendaLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}
