import { Paginacion } from "@/components/Paginacion";
import { TiendaJombotron } from "@/3-tienda/components/TiendaJombotron";
import { ProductosGrid } from "@/3-tienda/components/ProductosGrid";
// import { products } from "@/mocks/productosMock";
import { useParams } from "react-router";
import { useProductos } from "@/3-tienda/hooks/useProductos";

export function GeneroPage() {
  const { genero } = useParams();
  const { data } = useProductos();

  const generoLabel =
    genero === "hombre" ? "hombres" : genero === "mujer" ? "mujeres" : "niños";
  return (
    <>
      <TiendaJombotron
        titulo={`Productos para ${generoLabel}`}
      ></TiendaJombotron>
      <ProductosGrid LstProductos={data?.products || []}></ProductosGrid>
      <Paginacion totalPaginas={data?.pages || 1}></Paginacion>
    </>
  );
}
