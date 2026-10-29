import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/blog/",
    title_es: "Blog de Construcción, Remodelación y Diseño Arquitectónico",
    title_en: "Construction, Renovation & Architectural Design Blog",
    description_es: "Artículos, guías técnicas y tendencias en láminas de mármol PVC, paneles WPC, pisos SPC e importación por contenedor para construcción y diseño.",
    description_en: "Technical guides, articles, and architectural trends in PVC marble sheets, WPC wall panels, SPC flooring, and container import across the Americas.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
