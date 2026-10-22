import { Paginacion } from "@/components/Paginacion";
import { Jombotron } from "@/tienda/components/Jombotron";

export function InicioPage() {
  return (
    <>
      <Jombotron titulo="Bienvenido a nuestra tienda"></Jombotron>

      <Paginacion totalPaginas={5}></Paginacion>
    </>
  );
}
