interface Props {
  titulo: string;
  subTitulo: string;
}

export function AdminTitulo({ titulo, subTitulo }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{titulo}</h1>
      <p className="text-gray-600">{subTitulo}</p>
    </div>
  );
}
