import Link from "next/link";
import { ArrowRight, BookOpen, Ship, Calculator } from "lucide-react";
import siteSettings from "lib/siteSettings";

export const GUIDES_DATA = [
  {
    slug: "mejores-proveedores-cielo-raso-pvc-colombia",
    title_es: "Proveedores de Cielo Raso en PVC en Colombia: Especificaciones, Formatos y Compra por Contenedor",
    title_en: "PVC Ceiling Suppliers in Colombia: Specifications, Formats & Container Wholesale",
    excerpt_es: "Análisis técnico de láminas y cornisas de cielo raso en PVC (30 × 595 cm, espesor 8.5 mm), rendimiento por paquete (10.71 m²), disponibilidad en Medellín (C.C. IDEO) y capacidad por contenedor de 20ft y 40ft HC.",
    excerpt_en: "Technical overview of PVC ceiling panels and cornices (30 × 595 cm, 8.5 mm thickness), coverage per pack (10.71 m²), Medellín C.C. IDEO showroom availability, and 20ft/40ft HC container capacities.",
    category_es: "Cielo Raso PVC • Colombia",
    category_en: "PVC Ceilings • Colombia",
  },
  {
    slug: "panel-wpc-vs-drywall-precio-m2",
    title_es: "Panel WPC vs. Drywall: Comparativa Técnica, Rendimiento por Caja y Precio por m²",
    title_en: "WPC Wall Panel vs. Drywall: Technical Comparison, Box Coverage & Price per m²",
    excerpt_es: "Comparación objetiva entre paneles WPC interiores (16 × 295 cm, 25 mm, 4.72 m² por caja de 10 unidades, 64.83 USD/m² FOB) y sistemas tradicionales de drywall en obra limpia, resistencia al agua y mantenimiento.",
    excerpt_en: "Objective comparison between interior WPC wall panels (16 × 295 cm, 25 mm, 4.72 m² per 10-unit box, 64.83 USD/m² FOB) and traditional drywall across installation speed, moisture resistance, and lifecycle maintenance.",
    category_es: "Paneles WPC • Análisis de Costos",
    category_en: "WPC Panels • Cost Analysis",
  },
  {
    slug: "como-importar-contenedor-pisos-spc",
    title_es: "Cómo Importar un Contenedor de Pisos SPC: Cubicaje (m³), Peso, Incoterms FOB/CIF y Tiempos",
    title_en: "How to Import a Container of SPC Flooring: Cubic Volume (m³), Weight, FOB/CIF Terms & Lead Times",
    excerpt_es: "Guía paso a paso con cifras reales de catálogo para importar pisos SPC click con base IXPE (18.3 × 122 cm, 4 mm, 2.2326 m²/caja) en contenedores de 20 pies y 40 pies High Cube.",
    excerpt_en: "Step-by-step guide using verified catalog specs for importing click-lock SPC flooring with IXPE pad (18.3 × 122 cm, 4 mm, 2.2326 m²/box) in 20ft and 40ft High Cube containers.",
    category_es: "Pisos SPC • Logística de Importación",
    category_en: "SPC Flooring • Import Logistics",
  },
];

export default function GuiasIndexPage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="bg-[#132c3f] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-sky-300 mb-6">
            <BookOpen className="w-4 h-4" />
            GUÍAS TÉCNICAS Y COMERCIALES — {siteSettings.brand_name}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
            Guías de Importación por Contenedor, Especificaciones y Precios por m²
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Documentación técnica elaborada exclusivamente con los datos dimensionales, pesos por empaque, precios FOB y capacidades de contenedor verificados en el catálogo de {siteSettings.brand_name}.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-6 space-y-8">
        {GUIDES_DATA.map((guide) => (
          <article
            key={guide.slug}
            className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-slate-50/60 hover:bg-white hover:shadow-lg hover:border-sky-300 transition-all"
          >
            <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-sky-600 mb-2">
              {guide.category_es}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
              <Link href={`/guias/${guide.slug}`} className="hover:text-sky-600 transition-colors">
                {guide.title_es}
              </Link>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
              {guide.excerpt_es}
            </p>
            <Link
              href={`/guias/${guide.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#132c3f] hover:text-sky-600"
            >
              <span>Leer guía técnica completa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
        ))}

        {/* Direct Links to Container Planner & 3D Logistics Lab */}
        <div className="grid sm:grid-cols-2 gap-6 pt-8">
          <Link
            href="/seleccion-de-contenedores"
            className="p-6 rounded-2xl bg-[#132c3f] text-white hover:bg-slate-800 transition-colors flex items-start gap-4"
          >
            <Ship className="w-8 h-8 text-sky-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-1">Seleccionar Contenedor (20ft / 40ft HC)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Inicie la consolidación de su contenedor de 33 m³ o 76 m³ con cálculo automático de volumen y peso por SKU.
              </p>
            </div>
          </Link>

          <Link
            href="/laboratorio-logistico"
            className="p-6 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-start gap-4"
          >
            <Calculator className="w-8 h-8 text-sky-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-1">Laboratorio Logístico 3D</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Visualice la densidad volumétrica y el límite de peso (28,000 kg) de su carga antes de solicitar su cotización FOB o CIF.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
