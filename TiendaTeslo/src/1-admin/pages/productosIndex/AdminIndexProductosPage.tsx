import { Link } from "react-router";
import { PencilIcon, PlusIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Cargando } from "@/components/Cargando";
import { Paginacion } from "@/components/Paginacion";
import { useLstProductos } from "@/3-tienda/hooks/useLstProductos";
import { AdminTitulo } from "@/1-admin/components/AdminTitulo";
import { formatoMoneda } from "@/lib/formatoMoneda";

export function AdminIndexProductosPage() {
  const { data, isLoading } = useLstProductos();
  if (isLoading) {
    return <Cargando />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitulo
          titulo="Productos"
          subTitulo="Aquí puedes ver y administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/producto/nuevo">
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map((producto) => (
            <TableRow key={producto.id}>
              <TableCell>
                <img
                  src={producto.images[0]}
                  alt={producto.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>
                <Link
                  to={`/admin/producto/${producto.id}`}
                  className="hover:text-blue-500 underline"
                >
                  {producto.title}
                </Link>
              </TableCell>
              <TableCell>{formatoMoneda(producto.price)}</TableCell>
              <TableCell>
                {producto.gender === "men"
                  ? "Hombre"
                  : producto.gender === "women"
                    ? "Mujer"
                    : producto.gender === "kid"
                      ? "Niño"
                      : "unisexo"}
              </TableCell>
              <TableCell>{producto.stock}</TableCell>
              <TableCell>{producto.sizes.join(",")}</TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/producto/${producto.id}`}>
                  <PencilIcon className="w-4 h-4 mr-1 text-blue-500" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Paginacion totalPaginas={data?.pages || 0} />
    </>
  );
}
