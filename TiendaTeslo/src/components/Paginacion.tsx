import { useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  totalPaginas: number;
}

export const Paginacion = ({ totalPaginas }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = searchParams.get("pagina") || "1";
  const pagina = isNaN(+queryPage) ? 1 : +queryPage;

  const handleClickPagina = (pagina: number) => {
    if (pagina < 1 || pagina > totalPaginas) return;

    searchParams.set("pagina", pagina.toString());

    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={pagina === 1}
        onClick={() => handleClickPagina(pagina - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>

      {Array.from({ length: totalPaginas }).map((_, index) => (
        <Button
          key={index}
          variant={pagina === index + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => handleClickPagina(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={pagina === totalPaginas}
        onClick={() => handleClickPagina(pagina + 1)}
      >
        Siguientes
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
