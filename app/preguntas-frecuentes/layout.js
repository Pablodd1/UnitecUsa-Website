import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/preguntas-frecuentes/",
    title_es: "Preguntas Frecuentes sobre Paneles WPC, PVC, SPC y Contenedores",
    title_en: "Frequently Asked Questions — WPC, PVC, SPC & Container Import",
    description_es: "Respuestas claras sobre instalación, durabilidad, cubicaje de contenedores de 20ft y 40ft, precios FOB/CIF y envíos de materiales arquitectónicos.",
    description_en: "Clear answers regarding installation, durability, 20ft and 40ft container loading capacities, FOB/CIF pricing, and international shipping.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
