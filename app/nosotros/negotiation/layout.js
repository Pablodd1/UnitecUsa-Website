import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/nosotros/negotiation/",
    title_es: "Condiciones Comerciales y Logística de Exportación por Contenedor",
    title_en: "Commercial Terms & Container Export Logistics",
    description_es: "Opciones flexibles de consolidación de contenedores de 20 y 40 pies High Cube con acompañamiento aduanero y logístico para su empresa.",
    description_en: "Flexible 20ft and 40ft High Cube container consolidation options with end-to-end commercial and logistics support for your business.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
