import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/laboratorio-logistico/",
    title_es: "Laboratorio Logístico 3D — Simulador de Carga de Contenedores",
    title_en: "3D Logistics Lab — Container Loading Simulator",
    description_es: "Simule en 3D el volumen cúbico (m³) y el peso (kg) de sus cajas de paneles WPC, láminas PVC y pisos SPC dentro de contenedores de 20ft y 40ft HC.",
    description_en: "Simulate cubic volume (m³) and payload weight (kg) in 3D for your boxes of WPC panels, PVC sheets, and SPC flooring inside 20ft and 40ft HC containers.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
