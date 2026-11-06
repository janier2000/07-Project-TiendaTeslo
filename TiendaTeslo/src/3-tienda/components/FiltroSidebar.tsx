import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "react-router";

export function FiltroSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lstTallas = searchParams.get("lstTallas")?.split(",") || []; // xs,l,xl
  const precio = searchParams.get("precio") || "cualquier";

  function handleClickTalla(talla: string) {
    const lstTallasAux = lstTallas.includes(talla)
      ? lstTallas.filter((s) => s !== talla)
      : [...lstTallas, talla];
    searchParams.set("pagina", "1");
    searchParams.set("lstTallas", lstTallasAux.join(","));
    setSearchParams(searchParams);
  }

  function handlePrecioChange(precio: string) {
    searchParams.set("pagina", "1");
    searchParams.set("precio", precio);
    setSearchParams(searchParams);
  }

  const GrupoTallas = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
  ];

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filtros</h3>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h4 className="font-medium">Tallas</h4>
        <div className="grid grid-cols-3 gap-2">
          {GrupoTallas.map((talla) => (
            <Button
              key={talla.id}
              variant={lstTallas.includes(talla.id) ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={() => handleClickTalla(talla.id)}
            >
              {talla.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* rango precio */}
      <div className="space-y-4">
        <h4 className="font-medium">Precio</h4>
        <RadioGroup
          value={precio}
          onValueChange={handlePrecioChange}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cualquier" id="precioCualquiera" />
            <Label
              htmlFor="precioCualquiera"
              className="text-sm cursor-pointer"
            >
              Cualquier precio
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0-50" id="precio1" />
            <Label htmlFor="precio1" className="text-sm cursor-pointer">
              $0 - $50
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50-100" id="precio2" />
            <Label htmlFor="precio2" className="text-sm cursor-pointer">
              $50 - $100
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="100-200" id="precio3" />
            <Label htmlFor="precio3" className="text-sm cursor-pointer">
              $100 - $200
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="200+" id="precio4" />
            <Label htmlFor="precio4" className="text-sm cursor-pointer">
              $200+
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
