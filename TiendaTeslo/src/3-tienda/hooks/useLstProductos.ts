import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { obtenerLstProductoAction } from "../actions/obtenerProductoAction";

export function useLstProductos() {
  const { genero } = useParams();
  const [searchParams] = useSearchParams();
  const consulta = searchParams.get("consulta") || undefined;
  const limite = searchParams.get("limite") || 6;
  const pagina = searchParams.get("pagina") || 1;
  const lstTallas = searchParams.get("lstTallas") || undefined;
  const precio = searchParams.get("precio") || "cualquier";
  const compensar = (Number(pagina) - 1) * Number(limite);
  let minPrecio = undefined;
  let maxPrecio = undefined;

  const genderAux =
    genero === "hombre"
      ? "men"
      : genero === "mujer"
        ? "women"
        : genero === "nino"
          ? "kid"
          : undefined;

  console.log({ genero });

  switch (precio) {
    case "cualquier":
      //
      break;
    case "0-50":
      minPrecio = 0;
      maxPrecio = 50;
      break;
    case "50-100":
      minPrecio = 50;
      maxPrecio = 100;
      break;
    case "100-200":
      minPrecio = 100;
      maxPrecio = 200;
      break;
    case "200+":
      minPrecio = 200;
      maxPrecio = undefined;
      break;
  }

  return useQuery({
    queryKey: [
      "products",
      {
        offset: compensar,
        limit: limite,
        gender: genderAux,
        sizes: lstTallas,
        minPrice: minPrecio,
        maxPrice: maxPrecio,
        query: consulta,
      },
    ],
    queryFn: () =>
      obtenerLstProductoAction({
        limit: isNaN(+limite) ? 9 : limite,
        offset: isNaN(compensar) ? 0 : compensar,
        gender: genderAux,
        sizes: lstTallas,
        minPrice: minPrecio,
        maxPrice: maxPrecio,
        query: consulta,
      }),
    staleTime: 1000 * 60 * 5,
  });
}
