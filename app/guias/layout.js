import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/guias/",
    title_es: "Guías Técnicas de Importación, Precios por m² y Proveedores PVC / WPC / SPC",
    title_en: "Technical Guides: Container Import, Price per m² & PVC / WPC / SPC Suppliers",
    description_es: "Guías técnicas con datos reales de catálogo sobre proveedores de cielo raso PVC en Colombia, comparativa WPC vs drywall por m² e importación de contenedores SPC.",
    description_en: "Data-driven technical guides covering PVC ceiling suppliers in Colombia, WPC vs drywall cost per m², and how to import a container of SPC flooring.",
  });
}

export default function GuiasLayout({ children }) {
  return children;
}
