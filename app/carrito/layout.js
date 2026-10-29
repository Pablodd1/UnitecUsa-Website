import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/carrito/",
    title_es: "Carrito de Contenedor y Resumen de Cubicaje",
    title_en: "Container Cart & Cubic Volume Summary",
    description_es: "Revise las referencias seleccionadas, el porcentaje de llenado de su contenedor en metros cúbicos (m³) y gestione su cotización mayorista.",
    description_en: "Review your selected SKUs, container cubic meter (m³) fill percentage, and manage your wholesale container quote.",
    noindex: true,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
