import { Search, Menu } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";

export function Header() {
  // const [cantidadEnElCarrito] = useState(40);
  const [searchParams, setSearchParams] = useSearchParams();
  const consultaParametro = searchParams.get("consulta") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const { genero } = useParams();

  function handleKeyDownBuscar(evento: React.KeyboardEvent<HTMLInputElement>) {
    if (evento.key !== "Enter") {
      return;
    }
    const consultaAux = new URLSearchParams();
    const inputConsulta = inputRef.current?.value;
    if (!inputConsulta) {
      consultaAux.delete("consulta");
    } else {
      consultaAux.set("consulta", inputConsulta);
    }
    setSearchParams(consultaAux);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navegación - Escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                !genero ? "underline underline-offset-4" : "",
              )}
            >
              Todos
            </Link>
            <Link
              to="/genero/hombre"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                genero === "hombre" ? "underline underline-offset-4" : "",
              )}
            >
              Hombres
            </Link>
            <Link
              to="/genero/mujer"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                genero === "mujer" ? "underline underline-offset-4" : "",
              )}
            >
              Mujeres
            </Link>
            <Link
              to="/genero/nino"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                genero === "nino" ? "underline underline-offset-4" : "",
              )}
            >
              Niños
            </Link>
          </nav>

          {/* Búsqueda y carrito */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  placeholder="Buscar productos..."
                  className="pl-9 w-64 h-9 bg-white"
                  onKeyDown={handleKeyDownBuscar}
                  defaultValue={consultaParametro}
                />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/autorizacion/acceso">
              <Button variant="default" size="sm" className="ml-2">
                Acceso
              </Button>
            </Link>

            <Link to="/administrador">
              <Button variant="destructive" size="sm" className="ml-2">
                Administrador
              </Button>
            </Link>

            {/* <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cantidadEnElCarrito > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cantidadEnElCarrito}
                </span>
              )}
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
