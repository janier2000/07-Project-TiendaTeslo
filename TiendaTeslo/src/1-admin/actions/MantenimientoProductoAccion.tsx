import { sleep } from "@/lib/sleep";
import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/productoInterface";

export async function MantenimientoProductoAccion(
  productoParcial: Partial<Product>,
): Promise<Product> {
  await sleep(1500);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], ...objProducto } = productoParcial;
  const estaCreando = id === "new";

  objProducto.stock = Number(objProducto.stock || 0);
  objProducto.price = Number(objProducto.price || 0);

  const { data } = await tesloApi<Product>({
    url: estaCreando ? "/products" : `/products/${id}`,
    method: estaCreando ? "POST" : "PATCH",
    data: objProducto,
  });

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes("http")) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
}
