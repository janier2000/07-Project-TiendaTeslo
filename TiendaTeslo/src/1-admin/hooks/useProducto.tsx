import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { obtenerProductoAction } from "../actions/obtenerProductoAction";
import { MantenimientoProductoAccion } from "../actions/MantenimientoProductoAccion";
import type { Product } from "@/interfaces/productoInterface";

export function useProducto(id: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => obtenerProductoAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    // enabled: !!id
  });

  const mutation = useMutation({
    mutationFn: MantenimientoProductoAccion,
    onSuccess: function (producto: Product) {
      // Invalidar caché
      console.log("Producto mantenimiento:", producto);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: producto.id }],
      });
      // Actualizar queryData
      queryClient.setQueryData(["products", { id: producto.id }], producto);
    },
  });

  // const handleSubmitForm = async (productLike: Partial<Product>) => {
  //   console.log({ productLike });
  // };

  return {
    ...query,
    mutation,
  };
}
