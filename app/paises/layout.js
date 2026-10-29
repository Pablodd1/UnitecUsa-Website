import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/paises/",
    title_es: "Países que Atendemos — Exportación por Contenedor de PVC, WPC y SPC",
    title_en: "Countries Served — Container Export of PVC, WPC & SPC Materials",
    description_es: "Conozca los países que atendemos desde Miami y Medellín: Estados Unidos, Colombia, Venezuela, Ecuador, República Dominicana, El Salvador, Guatemala, Honduras y Perú.",
    description_en: "Explore the countries we serve from Miami and Medellín: United States, Colombia, Venezuela, Ecuador, Dominican Republic, El Salvador, Guatemala, Honduras, and Peru.",
  });
}

export default function PaisesLayout({ children }) {
  return children;
}
