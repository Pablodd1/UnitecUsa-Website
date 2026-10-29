import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/seleccion-de-contenedores/",
    title_es: "Selección de Contenedores de 20 FT y 40 FT High Cube",
    title_en: "20 FT & 40 FT High Cube Container Selection",
    description_es: "Seleccione un contenedor de 20 pies (33 m³) o 40 pies High Cube (76 m³) para consolidar su pedido mayorista de paneles WPC, PVC y pisos SPC.",
    description_en: "Select a 20ft (33 m³) or 40ft High Cube (76 m³) container to consolidate your wholesale order of WPC panels, PVC sheets, and SPC flooring.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
