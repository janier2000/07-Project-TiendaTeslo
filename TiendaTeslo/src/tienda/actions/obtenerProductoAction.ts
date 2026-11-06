import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces/productoResponse";

interface Options {
  limit?: number | string;
  offset?: number | string;
  sizes?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export async function obtenerProductoAction(
  options: Options,
): Promise<ProductsResponse> {
  const { limit, offset, gender, sizes, minPrice, maxPrice, query } = options;

  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
      q: query,
    },
  });

  const lstProductoAux = data.products.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));

  return {
    ...data,
    products: lstProductoAux,
  };
}
