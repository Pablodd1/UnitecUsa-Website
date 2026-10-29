import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/contacto/",
    title_es: "Contacto y Cotizaciones por Contenedor en Miami y Medellín",
    title_en: "Contact & Wholesale Container Quotes in Miami & Medellín",
    description_es: "Contáctenos en Doral (Miami) o en nuestro showroom de Medellín para cotizar contenedores de 20ft y 40ft de paneles WPC, cielo raso PVC y pisos SPC.",
    description_en: "Contact our Miami headquarters or Medellín showroom for 20ft and 40ft container quotes on WPC wall panels, PVC ceilings, and SPC flooring.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
