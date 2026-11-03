import { Paginacion } from "@/components/Paginacion";
import { products } from "@/mocks/productosMock";
import { Jombotron } from "@/tienda/components/Jombotron";
import { ProductosGrid } from "@/tienda/components/ProductosGrid";
import type { Product } from "@/mocks/productosMock";

export function InicioPage() {
  return (
    <>
      <Jombotron titulo="Bienvenido a nuestra tienda"></Jombotron>

      <ProductosGrid LstProductos={products}></ProductosGrid>

      <Paginacion totalPaginas={5}></Paginacion>
    </>
  );
}
