import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/nosotros/vision/",
    title_es: "Nuestra Visión — Liderazgo en Materiales Arquitectónicos en América",
    title_en: "Our Vision — Architectural Materials Leadership Across the Americas",
    description_es: "Consolidarnos como la marca referente en soluciones constructivas de PVC, WPC y SPC en Estados Unidos, Colombia, Centroamérica, el Caribe y Suramérica.",
    description_en: "To stand as the benchmark brand for PVC, WPC, and SPC architectural building solutions across the United States, Latin America, and the Caribbean.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
