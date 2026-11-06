import { Paginacion } from "@/components/Paginacion";
// import { products } from "@/mocks/productosMock";
import { Jombotron } from "@/tienda/components/Jombotron";
import { ProductosGrid } from "@/tienda/components/ProductosGrid";
import { useProductos } from "@/tienda/hooks/useProductos";

export function InicioPage() {
  const { data } = useProductos();
  return (
    <>
      <Jombotron titulo="Bienvenido a nuestra tienda"></Jombotron>
      <ProductosGrid LstProductos={data?.products || []}></ProductosGrid>
      <Paginacion totalPaginas={data?.pages || 0}></Paginacion>
    </>
  );
}
