import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/politicas/",
    title_es: "Política de Privacidad y Tratamiento de Datos",
    title_en: "Privacy Policy & Data Protection",
    description_es: "Consulte la política de privacidad, protección de datos personales y seguridad de la información para clientes y distribuidores de UNITEC USA Design.",
    description_en: "Review the privacy policy, personal data protection practices, and information security standards for UNITEC USA Design clients and partners.",
    noindex: false,
  });
}

export default function RouteLayout({ children }) {
  return children;
}
