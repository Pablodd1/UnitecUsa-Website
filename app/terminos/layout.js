import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/terminos/",
    title_es: "Términos y Condiciones Comerciales de Uso y Exportación",
    title_en: "Terms & Conditions of Service and Container Export",
    description_es: "Términos y condiciones aplicables a cotizaciones, pedidos por contenedor, modalidades FOB/CIF, garantías y uso del portal de UNITEC USA Design.",
    description_en: "Terms and conditions governing quotes, container orders, FOB/CIF shipping terms, product warranties, and website usage at UNITEC USA Design.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
