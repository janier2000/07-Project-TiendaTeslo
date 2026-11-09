export function formatoMoneda(valor: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0, // Elimina los decimales (.00)
    maximumFractionDigits: 0,
  }).format(valor);
}
