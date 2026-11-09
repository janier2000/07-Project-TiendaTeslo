import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { obtenerProductoXIdAccion } from "../actions/obtenerProductoXIdAccion";
import { MantenimientoProductoAccion } from "../actions/MantenimientoProductoAccion";
import type { Product } from "@/interfaces/productoInterface";

export function useProductoAdmin(id: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => obtenerProductoXIdAccion(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    // enabled: !!id
  });

  const mutation = useMutation({
    mutationFn: MantenimientoProductoAccion,
    onSuccess: (product: Product) => {
      // Invalidar caché
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });

      // Actualizar queryData
      queryClient.setQueryData(["products", { id: product.id }], product);
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
