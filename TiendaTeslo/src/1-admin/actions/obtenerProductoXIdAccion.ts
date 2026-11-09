import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/productoInterface";

export async function obtenerProductoXIdAccion(id: string): Promise<Product> {
  if (!id) {
    throw new Error("Se requiere un ID.");
  }

  if (id === "nuevo") {
    return {
      id: "new",
      title: "",
      price: 0,
      description: "",
      slug: "",
      stock: 0,
      sizes: [],
      gender: "men",
      tags: [],
      images: [],
    } as unknown as Product;
  }
  const { data } = await tesloApi.get<Product>(`/products/${id}`);
  const imagen = (function () {
    return data.images.map((image) => {
      if (image.includes("http")) {
        return image;
      }
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    });
  })();

  return {
    ...data,
    images: imagen,
  };
}
