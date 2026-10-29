import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/nosotros/historia/",
    title_es: "Nuestra Historia — Más de 20 Años Transformando la Construcción",
    title_en: "Our History — Over 20 Years Transforming Construction",
    description_es: "Recorra los más de 20 años de trayectoria de UNITEC USA Design conectando innovación en PVC y WPC con logística internacional en Estados Unidos y Latinoamérica.",
    description_en: "Explore over two decades of UNITEC USA Design history connecting PVC and WPC architectural innovation with international container logistics.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
