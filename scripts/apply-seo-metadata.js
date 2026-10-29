const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../app');

const ROUTE_META_CONFIGS = [
  {
    file: 'blog/layout.js',
    path: '/blog/',
    title_es: 'Blog de Construcción, Remodelación y Diseño Arquitectónico',
    title_en: 'Construction, Renovation & Architectural Design Blog',
    description_es: 'Artículos, guías técnicas y tendencias en láminas de mármol PVC, paneles WPC, pisos SPC e importación por contenedor para construcción y diseño.',
    description_en: 'Technical guides, articles, and architectural trends in PVC marble sheets, WPC wall panels, SPC flooring, and container import across the Americas.',
  },
  {
    file: 'contacto/layout.js',
    path: '/contacto/',
    title_es: 'Contacto y Cotizaciones por Contenedor en Miami y Medellín',
    title_en: 'Contact & Wholesale Container Quotes in Miami & Medellín',
    description_es: 'Contáctenos en Doral (Miami) o en nuestro showroom de Medellín para cotizar contenedores de 20ft y 40ft de paneles WPC, cielo raso PVC y pisos SPC.',
    description_en: 'Contact our Miami headquarters or Medellín showroom for 20ft and 40ft container quotes on WPC wall panels, PVC ceilings, and SPC flooring.',
  },
  {
    file: 'nosotros/layout.js',
    path: '/nosotros/',
    title_es: 'Sobre Nosotros — Materiales Arquitectónicos PVC, WPC y SPC',
    title_en: 'About Us — Wholesale PVC, WPC & SPC Architectural Materials',
    description_es: 'Conozca a UNITEC USA Design: más de 20 años suministrando materiales arquitectónicos en PVC, WPC y SPC con exportación por contenedor a Latinoamérica.',
    description_en: 'Learn about UNITEC USA Design: over 20 years supplying wholesale PVC, WPC, and SPC architectural materials with container export across the Americas.',
  },
  {
    file: 'nosotros/historia/layout.js',
    path: '/nosotros/historia/',
    title_es: 'Nuestra Historia — Más de 20 Años Transformando la Construcción',
    title_en: 'Our History — Over 20 Years Transforming Construction',
    description_es: 'Recorra los más de 20 años de trayectoria de UNITEC USA Design conectando innovación en PVC y WPC con logística internacional en Estados Unidos y Latinoamérica.',
    description_en: 'Explore over two decades of UNITEC USA Design history connecting PVC and WPC architectural innovation with international container logistics.',
  },
  {
    file: 'nosotros/who-we-are/layout.js',
    path: '/nosotros/who-we-are/',
    title_es: 'Quiénes Somos — Especialistas en Materiales Constructivos Livianos',
    title_en: 'Who We Are — Lightweight Architectural Building Materials Specialists',
    description_es: 'Somos un proveedor integral de revestimientos en PVC, WPC y pisos SPC con operación en Miami y showroom en Medellín para distribuidores y constructores.',
    description_en: 'We are a wholesale supplier of PVC cladding, WPC panels, and SPC flooring operating from Miami and Medellín for distributors and contractors.',
  },
  {
    file: 'nosotros/mission/layout.js',
    path: '/nosotros/mission/',
    title_es: 'Nuestra Misión — Soluciones Constructivas Sostenibles y Eficientes',
    title_en: 'Our Mission — Sustainable & Efficient Building Solutions',
    description_es: 'Nuestra misión es brindar materiales constructivos durables, impermeables y reciclables en PVC, WPC y SPC que optimicen tiempos y costos de obra.',
    description_en: 'Our mission is to deliver durable, waterproof, and recyclable PVC, WPC, and SPC building materials that optimize construction timelines and costs.',
  },
  {
    file: 'nosotros/vision/layout.js',
    path: '/nosotros/vision/',
    title_es: 'Nuestra Visión — Liderazgo en Materiales Arquitectónicos en América',
    title_en: 'Our Vision — Architectural Materials Leadership Across the Americas',
    description_es: 'Consolidarnos como la marca referente en soluciones constructivas de PVC, WPC y SPC en Estados Unidos, Colombia, Centroamérica, el Caribe y Suramérica.',
    description_en: 'To stand as the benchmark brand for PVC, WPC, and SPC architectural building solutions across the United States, Latin America, and the Caribbean.',
  },
  {
    file: 'nosotros/quality/layout.js',
    path: '/nosotros/quality/',
    title_es: 'Compromiso con la Calidad y Certificación ISO 9001',
    title_en: 'Quality Commitment & ISO 9001 Certified Manufacturing',
    description_es: 'Productos fabricados bajo estándares ISO 9001 con resistencia a la humedad, durabilidad de 15 a 25 años y materiales 100 % reciclables.',
    description_en: 'Architectural materials manufactured under ISO 9001 quality standards offering moisture resistance, 15–25 year durability, and 100% recyclable content.',
  },
  {
    file: 'nosotros/business-models/layout.js',
    path: '/nosotros/business-models/',
    title_es: 'Modalidades de Negociación Internacional — Incoterms FOB y CIF',
    title_en: 'International Business Models — FOB & CIF Container Incoterms',
    description_es: 'Conozca nuestras modalidades de exportación por contenedor en términos FOB y CIF para distribuidores, importadores y constructoras en Latinoamérica.',
    description_en: 'Explore our FOB and CIF container export terms tailored for building material distributors, importers, and construction firms across Latin America.',
  },
  {
    file: 'nosotros/negotiation/layout.js',
    path: '/nosotros/negotiation/',
    title_es: 'Condiciones Comerciales y Logística de Exportación por Contenedor',
    title_en: 'Commercial Terms & Container Export Logistics',
    description_es: 'Opciones flexibles de consolidación de contenedores de 20 y 40 pies High Cube con acompañamiento aduanero y logístico para su empresa.',
    description_en: 'Flexible 20ft and 40ft High Cube container consolidation options with end-to-end commercial and logistics support for your business.',
  },
  {
    file: 'preguntas-frecuentes/layout.js',
    path: '/preguntas-frecuentes/',
    title_es: 'Preguntas Frecuentes sobre Paneles WPC, PVC, SPC y Contenedores',
    title_en: 'Frequently Asked Questions — WPC, PVC, SPC & Container Import',
    description_es: 'Respuestas claras sobre instalación, durabilidad, cubicaje de contenedores de 20ft y 40ft, precios FOB/CIF y envíos de materiales arquitectónicos.',
    description_en: 'Clear answers regarding installation, durability, 20ft and 40ft container loading capacities, FOB/CIF pricing, and international shipping.',
  },
  {
    file: 'politicas/layout.js',
    path: '/politicas/',
    title_es: 'Política de Privacidad y Tratamiento de Datos',
    title_en: 'Privacy Policy & Data Protection',
    description_es: 'Consulte la política de privacidad, protección de datos personales y seguridad de la información para clientes y distribuidores de UNITEC USA Design.',
    description_en: 'Review the privacy policy, personal data protection practices, and information security standards for UNITEC USA Design clients and partners.',
  },
  {
    file: 'terminos/layout.js',
    path: '/terminos/',
    title_es: 'Términos y Condiciones Comerciales de Uso y Exportación',
    title_en: 'Terms & Conditions of Service and Container Export',
    description_es: 'Términos y condiciones aplicables a cotizaciones, pedidos por contenedor, modalidades FOB/CIF, garantías y uso del portal de UNITEC USA Design.',
    description_en: 'Terms and conditions governing quotes, container orders, FOB/CIF shipping terms, product warranties, and website usage at UNITEC USA Design.',
  },
  {
    file: 'seleccion-de-contenedores/layout.js',
    path: '/seleccion-de-contenedores/',
    title_es: 'Selección de Contenedores de 20 FT y 40 FT High Cube',
    title_en: '20 FT & 40 FT High Cube Container Selection',
    description_es: 'Seleccione un contenedor de 20 pies (33 m³) o 40 pies High Cube (76 m³) para consolidar su pedido mayorista de paneles WPC, PVC y pisos SPC.',
    description_en: 'Select a 20ft (33 m³) or 40ft High Cube (76 m³) container to consolidate your wholesale order of WPC panels, PVC sheets, and SPC flooring.',
  },
  {
    file: 'laboratorio-logistico/layout.js',
    path: '/laboratorio-logistico/',
    title_es: 'Laboratorio Logístico 3D — Simulador de Carga de Contenedores',
    title_en: '3D Logistics Lab — Container Loading Simulator',
    description_es: 'Simule en 3D el volumen cúbico (m³) y el peso (kg) de sus cajas de paneles WPC, láminas PVC y pisos SPC dentro de contenedores de 20ft y 40ft HC.',
    description_en: 'Simulate cubic volume (m³) and payload weight (kg) in 3D for your boxes of WPC panels, PVC sheets, and SPC flooring inside 20ft and 40ft HC containers.',
  },
  {
    file: 'carrito/layout.js',
    path: '/carrito/',
    title_es: 'Carrito de Contenedor y Resumen de Cubicaje',
    title_en: 'Container Cart & Cubic Volume Summary',
    description_es: 'Revise las referencias seleccionadas, el porcentaje de llenado de su contenedor en metros cúbicos (m³) y gestione su cotización mayorista.',
    description_en: 'Review your selected SKUs, container cubic meter (m³) fill percentage, and manage your wholesale container quote.',
    noindex: true,
  },
  {
    file: 'pagar/layout.js',
    path: '/pagar/',
    title_es: 'Solicitud de Cotización Formal de Contenedor (FOB / CIF)',
    title_en: 'Formal Container Quote Request (FOB / CIF)',
    description_es: 'Complete los datos de su empresa y puerto de destino para recibir su cotización formal e invoice proforma de contenedor de 20ft o 40ft HC.',
    description_en: 'Complete your company details and destination port to receive your formal FOB/CIF container quote and proforma invoice.',
    noindex: true,
  },
];

for (const cfg of ROUTE_META_CONFIGS) {
  const fullPath = path.join(appDir, cfg.file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  const content = `import { buildPageMetadata } from "lib/seoMetadata";

export async function generateMetadata() {
  return buildPageMetadata({
    path: ${JSON.stringify(cfg.path)},
    title_es: ${JSON.stringify(cfg.title_es)},
    title_en: ${JSON.stringify(cfg.title_en)},
    description_es: ${JSON.stringify(cfg.description_es)},
    description_en: ${JSON.stringify(cfg.description_en)},
    noindex: ${Boolean(cfg.noindex)},
  });
}

export default function RouteLayout({ children }) {
  return children;
}
`;
  fs.writeFileSync(fullPath, content, 'utf8');
}

// Simplify blog/[slug]/layout.js so blog/[slug]/page.js handles article metadata without duplicate conflicts
fs.writeFileSync(
  path.join(appDir, 'blog/[slug]/layout.js'),
  `export default function BlogPostLayout({ children }) {\n  return children;\n}\n`,
  'utf8'
);

// Fix all colecciones/**/page.js metadata to strip duplicate "| Unitec USA Design" and use Spanish description matching the Spanish title
const COLLECTION_DESCRIPTIONS_ES = {
  '/colecciones/': 'Explore el catálogo completo de materiales arquitectónicos en PVC, WPC y pisos SPC con especificaciones por caja y cubicaje para contenedores de 20ft y 40ft.',
  '/colecciones/cintas/': 'Cintas decorativas autoadhesivas de papel y metálicas para juntas, dilataciones y acabados arquitectónicos en muros y paneles interiores.',
  '/colecciones/cubiertas-upvc/': 'Cubiertas termoacústicas en UPVC, tejas coloniales PVC y láminas de policarbonato resistentes a la corrosión y radiación solar para techos.',
  '/colecciones/exterior/': 'Soluciones arquitectónicas para exteriores: fachadas WPC, pisos deck, cubiertas UPVC y jardines verticales con protección UV e impermeabilidad.',
  '/colecciones/fachada-deck/': 'Revestimientos de fachada exterior tipo Deck coextruidos con textura de madera y cero mantenimiento para proyectos residenciales y comerciales.',
  '/colecciones/fachada-exterior-pvc/': 'Paneles de fachada exterior en PVC de alta resistencia climática y aislamiento para cerramientos arquitectónicos modernos.',
  '/colecciones/fachadas/': 'Sistemas de fachadas ventiladas y revestimientos exteriores en WPC, PVC y Polifachada diseñados para soportar sol, lluvia y humedad.',
  '/colecciones/interior/': 'Revestimientos arquitectónicos para interiores: paneles WPC acanalados, láminas de mármol PVC, cielo raso PVC, paneles acústicos y pisos SPC.',
  '/colecciones/jardines-artificiales/': 'Módulos de jardines verticales sintéticos y musgo decorativo para muros verdes interiores y exteriores con filtro UV y cero riego.',
  '/colecciones/laminas/': 'Láminas de mármol PVC con recubrimiento UV, tableros Foam Board y PVC Board impermeables de 122x244 cm para muros y mobiliario.',
  '/colecciones/listones-wpc-exterior/': 'Listones arquitectónicos tubulares en WPC y PVC para pérgolas, quiebrasoles, divisiones de ambientes y cielos rasos alistonados.',
  '/colecciones/paneles-wpc/': 'Paneles WPC acanalados y redondos (Media Caña) para revestimiento de paredes y techos interiores con rápida instalación y resistencia al agua.',
  '/colecciones/paneles-wpc-exterior/': 'Paneles WPC coextruidos para fachadas exteriores resistentes a rayos UV, lluvia e intemperie sin necesidad de barnices ni selladores.',
  '/colecciones/paredes/': 'Revestimientos murales para interiores: paneles WPC, paneles acústicos, paneles PS, muros acolchados 3D, piedra PU Arqunitec y rollos adhesivos.',
  '/colecciones/paredes-uniflex/': 'Láminas flexibles Uniflex y Muroflex para revestimiento continuo de muros planos y columnas curvas en remodelaciones rápidas.',
  '/colecciones/pegantes/': 'Adhesivos de montaje multipropósito Pegatec de alta adherencia inicial para instalación limpia de paneles WPC, láminas PVC y zócalos.',
  '/colecciones/pisos/': 'Pisos SPC con sistema click y base IXPE 100 % impermeables para interiores y pisos Deck WPC para terrazas y zonas húmedas exteriores.',
  '/colecciones/pisos-deck/': 'Pisos Deck WPC para exteriores antideslizantes y resistentes al agua para terrazas, balcones y bordes de piscina sin astillas.',
  '/colecciones/polifachada/': 'Paneles exteriores de Polifachada con acabado arquitectónico y aislamiento térmico para fachadas comerciales, industriales y modulares.',
  '/colecciones/sales/': 'Referencias seleccionadas de paneles WPC, láminas tipo mármol y pisos SPC con condiciones especiales para pedidos mayoristas por contenedor.',
  '/colecciones/search/': 'Buscador técnico del catálogo de productos UNITEC USA Design por referencia, SKU, categoría, dimensiones y aplicación interior o exterior.',
  '/colecciones/zocalos/': 'Zócalos impermeables en SPC de 240 cm de largo para remates perimetrales de pisos interiores con alta resistencia al impacto y la humedad.',
};

function walkCollections(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkCollections(full);
    } else if (entry.name === 'page.js') {
      let code = fs.readFileSync(full, 'utf8');
      // Strip trailing "| Unitec USA Design" from title so root layout template appends it once
      code = code.replace(
        /(title:\s*["'])([^"']+?)\s*\|\s*Unitec USA Design(["'])/gi,
        '$1$2$3'
      );

      // Extract canonical path to replace English description with matching Spanish description
      const canonicalMatch = code.match(/canonical:\s*["']https:\/\/unitecusadesign\.com(\/colecciones\/[^"']*)["']/);
      if (canonicalMatch) {
        const routePath = canonicalMatch[1].endsWith('/') ? canonicalMatch[1] : `${canonicalMatch[1]}/`;
        const descEs = COLLECTION_DESCRIPTIONS_ES[routePath];
        if (descEs) {
          code = code.replace(
            /description:\s*\n?\s*["'][^"']+["']/,
            `description: ${JSON.stringify(descEs)}`
          );
          // Add hreflang languages alongside canonical if not already present
          if (!code.includes('languages:')) {
            code = code.replace(
              /alternates:\s*\{\s*canonical:\s*["']([^"']+)["']\s*,?\s*\}/,
              `alternates: {\n            canonical: "$1",\n            languages: {\n                es: "https://unitecusadesign.com/es${routePath}",\n                en: "https://unitecusadesign.com/en${routePath}",\n                "x-default": "https://unitecusadesign.com/es${routePath}",\n            },\n        }`
            );
          }
        }
      }
      fs.writeFileSync(full, code, 'utf8');
    }
  }
}

walkCollections(path.join(appDir, 'colecciones'));
console.log('Applied SEO metadata across all routes and collections.');
