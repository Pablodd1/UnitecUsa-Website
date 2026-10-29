import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/nosotros/business-models/",
    title_es: "Modalidades de Negociación Internacional — Incoterms FOB y CIF",
    title_en: "International Business Models — FOB & CIF Container Incoterms",
    description_es: "Conozca nuestras modalidades de exportación por contenedor en términos FOB y CIF para distribuidores, importadores y constructoras en Latinoamérica.",
    description_en: "Explore our FOB and CIF container export terms tailored for building material distributors, importers, and construction firms across Latin America.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
