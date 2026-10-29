import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/nosotros/",
    title_es: "Sobre Nosotros — Materiales Arquitectónicos PVC, WPC y SPC",
    title_en: "About Us — Wholesale PVC, WPC & SPC Architectural Materials",
    description_es: "Conozca a UNITEC USA Design: más de 20 años suministrando materiales arquitectónicos en PVC, WPC y SPC con exportación por contenedor a Latinoamérica.",
    description_en: "Learn about UNITEC USA Design: over 20 years supplying wholesale PVC, WPC, and SPC architectural materials with container export across the Americas.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
