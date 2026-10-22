interface Props {
  titulo: string;
  subTitulo?: string;
}

export function Jombotron({ titulo, subTitulo }: Props) {
  const defaultSubTitulo =
    "Ropa minimalista y elegante inspirada en el diseño futurista de Tesla. " +
    "Calidad premium para un estilo atemporal.";

  return (
    <section className="py-10 px-4 lg:px-8 bg-muted/30">
      <div className="container mx-auto text-center">
        <h1 className="font-montserrat text-5xl tracking-tight mb-6">
          {titulo}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {subTitulo || defaultSubTitulo}
        </p>
      </div>
    </section>
  );
}
