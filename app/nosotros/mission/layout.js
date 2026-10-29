import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/nosotros/mission/",
    title_es: "Nuestra Misión — Soluciones Constructivas Sostenibles y Eficientes",
    title_en: "Our Mission — Sustainable & Efficient Building Solutions",
    description_es: "Nuestra misión es brindar materiales constructivos durables, impermeables y reciclables en PVC, WPC y SPC que optimicen tiempos y costos de obra.",
    description_en: "Our mission is to deliver durable, waterproof, and recyclable PVC, WPC, and SPC building materials that optimize construction timelines and costs.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
