import { Button } from "@/components/ui/button";
// import type { Product } from "@/mocks/productosMock";
import { Filter, Grid, List } from "lucide-react";
import { ProductoCard } from "./ProductoCard";
import { ProductoFiltroSidebar } from "./ProductoFiltroSidebar";
import { useSearchParams } from "react-router";
import { useState } from "react";
import type { Product } from "@/interfaces/productoInterface";

interface Props {
  LstProductos: Product[];
}

export function ProductosGrid({ LstProductos }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const ModoVisualizacion = searchParams.get("viewMode") || "grid";

  function handleClickModoVisualizacion(modo: "grid" | "list") {
    searchParams.set("viewMode", modo);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <section className="py-12 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-light">Productos</h2>
              <span className="text-muted-foreground">
                ({LstProductos.length} productos)
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>

              <div className="hidden md:flex border rounded-md">
                <Button
                  variant={ModoVisualizacion === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleClickModoVisualizacion("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={ModoVisualizacion === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleClickModoVisualizacion("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block">
              <ProductoFiltroSidebar />
            </div>

            {/* Mobile Filters */}
            {mostrarFiltros && (
              <div className="fixed inset-0 z-50 bg-background p-4 lg:hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filtros</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMostrarFiltros(false)}
                  >
                    Cerrar
                  </Button>
                </div>
                <ProductoFiltroSidebar />
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div
                className={
                  ModoVisualizacion === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {LstProductos.map((producto) => (
                  <ProductoCard
                    key={producto.id}
                    name={producto.title}
                    price={producto.price}
                    image={producto.images[0]}
                    category={producto.gender}
                    sizes={producto.sizes}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
