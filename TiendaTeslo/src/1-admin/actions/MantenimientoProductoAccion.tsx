import { sleep } from "@/lib/sleep";
import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/productoInterface";

export async function MantenimientoProductoAccion(
  productoParcial: Partial<Product> & { ArchivosTemp?: File[] },
): Promise<Product> {
  await sleep(1500);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    id,
    user,
    images = [],
    ArchivosTemp = [],
    ...objProducto
  } = productoParcial;
  const estaCreando = id === "new";

  objProducto.stock = Number(objProducto.stock || 0);
  objProducto.price = Number(objProducto.price || 0);
  //console.log("ArchivosTemp", ArchivosTemp);

  // Preparar las imágenes
  if (ArchivosTemp.length > 0) {
    const lstImagesNombre = await SubirArchivos(ArchivosTemp);
    debugger;
    images.push(...lstImagesNombre);
  }

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

export interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

const SubirArchivos = async (ArchivosTemp: File[]) => {
  const uploadPromises = ArchivosTemp.map(async (archivo) => {
    const formData = new FormData();
    formData.append("file", archivo);

    const { data } = await tesloApi<FileUploadResponse>({
      url: "/files/product",
      method: "POST",
      data: formData,
    });
    return data.fileName;
  });
  // promise para subir todos los archivos a la vez y obtener sus nombres
  const lstNombreArchivoSubido = await Promise.all(uploadPromises);
  return lstNombreArchivoSubido;
};
