import { Paginacion } from "@/components/Paginacion";
// import { products } from "@/mocks/productosMock";
import { Jombotron } from "@/3-tienda/components/Jombotron";
import { ProductosGrid } from "@/3-tienda/components/ProductosGrid";
import { useProductos } from "@/3-tienda/hooks/useProductos";

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
