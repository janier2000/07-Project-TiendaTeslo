import { Paginacion } from "@/components/Paginacion";
import { Jombotron } from "@/3-tienda/components/Jombotron";
import { ProductosGrid } from "@/3-tienda/components/ProductosGrid";
import { products } from "@/mocks/productosMock";
import { useParams } from "react-router";

export function GeneroPage() {
  const { genero } = useParams();

  const generoLabel =
    genero === "hombre" ? "hombres" : genero === "mujer" ? "mujeres" : "niños";
  return (
    <>
      <Jombotron titulo={`Productos para ${generoLabel}`}></Jombotron>
      <ProductosGrid LstProductos={products}></ProductosGrid>
      <Paginacion totalPaginas={5}></Paginacion>
    </>
  );
}
