import { sleep } from "@/lib/sleep";
import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/productoInterface";

export const MantenimientoProductoAccion = async (
  productoParcial: Partial<Product>,
): Promise<Product> => {
  await sleep(1500);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], ...productoAux } = productoParcial;
  const estaCreando = id === "new";

  productoAux.stock = Number(productoAux.stock || 0);
  productoAux.price = Number(productoAux.price || 0);

  const { data } = await tesloApi<Product>({
    url: estaCreando ? "/products" : `/products/${id}`,
    method: estaCreando ? "POST" : "PATCH",
    data: productoAux,
  });

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes("http")) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
};
