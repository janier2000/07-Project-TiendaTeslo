import { useParams, Navigate } from "react-router";
import { useProducto } from "@/1-admin/hooks/useProducto";
import { Cargando } from "@/components/Cargando";
import { FormularioProducto } from "./ui/FormularioProducto";

export function AdminProductoPage() {
  const { id } = useParams();
  const { data: producto, isLoading, isError } = useProducto(id || "");
  //console.log(producto, isLoading);
  const titulo = id === "nuevo" ? "Nuevo producto" : "Editar producto";
  const subTitulo =
    id === "nuevo"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  if (isError) {
    return <Navigate to="/admin/producto" />;
  }

  if (isLoading) {
    return <Cargando />;
  }

  if (!producto) {
    return <Navigate to="/admin/producto" />;
  }

  return (
    <div>
      <FormularioProducto
        titulo={titulo}
        subTitulo={subTitulo}
        producto={producto}
      />
    </div>
  );
}
