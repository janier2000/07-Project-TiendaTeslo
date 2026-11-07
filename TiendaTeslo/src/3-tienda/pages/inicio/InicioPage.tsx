import { Paginacion } from "@/components/Paginacion";
// import { products } from "@/mocks/productosMock";
import { TiendaJombotron } from "@/3-tienda/components/TiendaJombotron";
import { ProductosGrid } from "@/3-tienda/components/ProductosGrid";
import { useProductos } from "@/3-tienda/hooks/useProductos";

export function InicioPage() {
  const { data } = useProductos();
  return (
    <>
      <TiendaJombotron titulo="Bienvenido a nuestra tienda"></TiendaJombotron>
      <ProductosGrid LstProductos={data?.products || []}></ProductosGrid>
      <Paginacion totalPaginas={data?.pages || 0}></Paginacion>
    </>
  );
}
