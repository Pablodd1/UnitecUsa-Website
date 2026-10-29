import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/nosotros/who-we-are/",
    title_es: "Quiénes Somos — Especialistas en Materiales Constructivos Livianos",
    title_en: "Who We Are — Lightweight Architectural Building Materials Specialists",
    description_es: "Somos un proveedor integral de revestimientos en PVC, WPC y pisos SPC con operación en Miami y showroom en Medellín para distribuidores y constructores.",
    description_en: "We are a wholesale supplier of PVC cladding, WPC panels, and SPC flooring operating from Miami and Medellín for distributors and contractors.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
