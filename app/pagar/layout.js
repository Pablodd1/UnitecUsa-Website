import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/pagar/",
    title_es: "Solicitud de Cotización Formal de Contenedor (FOB / CIF)",
    title_en: "Formal Container Quote Request (FOB / CIF)",
    description_es: "Complete los datos de su empresa y puerto de destino para recibir su cotización formal e invoice proforma de contenedor de 20ft o 40ft HC.",
    description_en: "Complete your company details and destination port to receive your formal FOB/CIF container quote and proforma invoice.",
    noindex: true,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
