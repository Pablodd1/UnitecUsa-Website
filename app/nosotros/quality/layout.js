import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/nosotros/quality/",
    title_es: "Compromiso con la Calidad y Certificación ISO 9001",
    title_en: "Quality Commitment & ISO 9001 Certified Manufacturing",
    description_es: "Productos fabricados bajo estándares ISO 9001 con resistencia a la humedad, durabilidad de 15 a 25 años y materiales 100 % reciclables.",
    description_en: "Architectural materials manufactured under ISO 9001 quality standards offering moisture resistance, 15–25 year durability, and 100% recyclable content.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
