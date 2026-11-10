import { toast } from "sonner";
import { useParams, Navigate, useNavigate } from "react-router";
import { Cargando } from "@/components/Cargando";
import { useProducto } from "@/1-admin/hooks/useProducto";
import { FormularioProducto } from "./ui/FormularioProducto";
import type { Product } from "@/interfaces/productoInterface";

export function AdminProductoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: producto,
    isLoading,
    isError,
    mutation,
  } = useProducto(id || "");
  //console.log(producto, isLoading);
  const titulo = id === "nuevo" ? "Nuevo producto" : "Editar producto";
  const subTitulo =
    id === "nuevo"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const handleSubmit = async function (productoParcial: Partial<Product>) {
    debugger;
    await mutation.mutateAsync(productoParcial, {
      onSuccess: (data) => {
        debugger;
        toast.success("Producto actualizado correctamente", {
          position: "top-right",
        });
        navigate(`/admin/producto/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error al actualizar el producto");
      },
    });
  };

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
        onSubmit={handleSubmit}
      />
    </div>
  );
}
