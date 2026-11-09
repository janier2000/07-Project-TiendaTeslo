import { Paginacion } from "@/components/Paginacion";
import { useLstProductos } from "@/3-tienda/hooks/useLstProductos";
import { ProductosGrid } from "@/3-tienda/components/ProductosGrid";
import { TiendaJombotron } from "@/3-tienda/components/TiendaJombotron";

export function InicioPage() {
  const { data } = useLstProductos();
  return (
    <>
      <TiendaJombotron titulo="Bienvenido a nuestra tienda"></TiendaJombotron>
      <ProductosGrid LstProductos={data?.products || []}></ProductosGrid>
      <Paginacion totalPaginas={data?.pages || 0}></Paginacion>
    </>
  );
}
