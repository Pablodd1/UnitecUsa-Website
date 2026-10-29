import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Ship, Calculator, MapPin, Phone, CheckCircle2 } from "lucide-react";
import products from "../../../static_data/products_full.json";
import siteSettings, { getWhatsAppUrl, getMiamiAddressFormatted } from "lib/siteSettings";
import { buildPageMetadata } from "lib/seoMetadata";

const GUIDE_SLUGS = [
  "mejores-proveedores-cielo-raso-pvc-colombia",
  "panel-wpc-vs-drywall-precio-m2",
  "como-importar-contenedor-pisos-spc",
];

export async function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (slug === "mejores-proveedores-cielo-raso-pvc-colombia") {
    return buildPageMetadata({
      path: `/guias/${slug}/`,
      title_es: "Proveedores de Cielo Raso en PVC en Colombia: Especificaciones y Contenedores",
      title_en: "PVC Ceiling Suppliers in Colombia: Specifications & Container Wholesale",
      description_es: "Guía técnica para compradores de cielo raso en PVC en Colombia: láminas de 30x595 cm (8.5 mm), showroom en Medellín (C.C. IDEO) e importación por contenedor.",
      description_en: "Technical buyer's guide for PVC ceilings in Colombia: 30x595 cm (8.5 mm) panels, Medellín C.C. IDEO showroom, and container-load wholesale.",
    });
  }

  if (slug === "panel-wpc-vs-drywall-precio-m2") {
    return buildPageMetadata({
      path: `/guias/${slug}/`,
      title_es: "Panel WPC vs. Drywall: Comparativa Técnica, Rendimiento y Precio por m²",
      title_en: "WPC Wall Panel vs. Drywall: Technical Comparison, Coverage & Price per m²",
      description_es: "Comparativa técnica entre paneles WPC interiores (16x295 cm, 25 mm, 4.72 m²/caja, 64.83 USD/m² FOB) y drywall tradicional en tiempos de obra y humedad.",
      description_en: "Technical comparison between interior WPC wall panels (16x295 cm, 25 mm, 4.72 m²/box, 64.83 USD/m² FOB) and traditional drywall installation.",
    });
  }

  if (slug === "como-importar-contenedor-pisos-spc") {
    return buildPageMetadata({
      path: `/guias/${slug}/`,
      title_es: "Cómo Importar un Contenedor de Pisos SPC: Cubicaje, Peso e Incoterms FOB/CIF",
      title_en: "How to Import a Container of SPC Flooring: Cubic Volume, Weight & FOB/CIF Terms",
      description_es: "Cómo calcular cajas, metros cuadrados (m²) y peso para importar un contenedor de 20ft o 40ft HC de pisos SPC click con base IXPE (18.3x122 cm, 4 mm).",
      description_en: "How to calculate boxes, square meters (m²), and payload weight when importing a 20ft or 40ft HC container of click-lock SPC flooring with IXPE pad.",
    });
  }

  return { title: "Guía no encontrada" };
}

export default async function GuideDetailPage({ params }) {
  const { slug } = await params;
  if (!GUIDE_SLUGS.includes(slug)) {
    notFound();
  }

  const whatsappHref = getWhatsAppUrl();
  const miamiAddress = getMiamiAddressFormatted();

  const pvcCeilingProducts = products.filter((p) => p.category === "CIELO RASO PVC").slice(0, 9);
  const wpcInteriorProducts = products.filter((p) => p.subcategory === "PANELES WPC INTERIOR").slice(0, 8);
  const spcFlooringProducts = products.filter((p) => p.subcategory === "PISOS SPC").slice(0, 8);

  return (
    <main className="w-full bg-white text-slate-900">
      <div className="bg-slate-900 text-white py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/guias"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 hover:text-sky-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Guías Técnicas</span>
          </Link>

          {slug === "mejores-proveedores-cielo-raso-pvc-colombia" && (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
                Proveedores de Cielo Raso en PVC en Colombia: Especificaciones Técnicas y Suministro por Contenedor
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
                Qué evaluar al seleccionar un proveedor mayorista o importador directo de láminas y cornisas de cielo raso en PVC en Colombia, con datos verificados del catálogo de {siteSettings.brand_name}.
              </p>
            </>
          )}

          {slug === "panel-wpc-vs-drywall-precio-m2" && (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
                Panel WPC vs. Drywall: Comparativa Técnica, Rendimiento por Caja y Precio por m²
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
                Análisis técnico de recubrimiento mural entre paneles acanalados WPC de {siteSettings.brand_name} y muros tradicionales de placa de yeso (drywall).
              </p>
            </>
          )}

          {slug === "como-importar-contenedor-pisos-spc" && (
            <>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
                Cómo Importar un Contenedor de Pisos SPC: Cubicaje (m³), Peso, Incoterms FOB/CIF y Tiempos
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
                Guía práctica de ingeniería logística para planificar y consolidar contenedores de 20 pies y 40 pies High Cube de pisos SPC con base IXPE.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-12">
        {/* ================= GUIDE 1: CIELO RASO PVC COLOMBIA ================= */}
        {slug === "mejores-proveedores-cielo-raso-pvc-colombia" && (
          <>
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#132c3f]">
                1. Criterios Técnicos para Evaluar Proveedores de Cielo Raso PVC en Colombia
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Para distribuidores ferreteros, firmas constructoras y remodeladores en Colombia, la compra mayorista de cielo raso en PVC requiere verificar cuatro parámetros técnicos antes de comprometer inventario o contenedores:
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 pt-2">
                <li className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 mb-1">Formato y Espesor Verificado</strong>
                  <span className="text-sm text-slate-600">
                    Las láminas de cielo raso en PVC de {siteSettings.brand_name} cuentan con ancho de 30 cm, longitud de 595 cm y espesor de 8.5 mm (1.785 m² por lámina).
                  </span>
                </li>
                <li className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 mb-1">Empaque y Cobertura por Paquete</strong>
                  <span className="text-sm text-slate-600">
                    Las láminas de 30 × 595 cm se suministran en paquetes de 6 unidades (10.71 m² por paquete, volumen de 0.091 m³ por paquete).
                  </span>
                </li>
                <li className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 mb-1">Presencia Física y Showroom en Colombia</strong>
                  <span className="text-sm text-slate-600">
                    {siteSettings.brand_name} atiende presencialmente en su showroom de Medellín ({siteSettings.medellin_showroom_address}) y coordina operaciones internacionales desde {miamiAddress}.
                  </span>
                </li>
                <li className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="block text-slate-900 mb-1">Resistencia a Humedad y Durabilidad</strong>
                  <span className="text-sm text-slate-600">
                    Material 100 % impermeable, resistente al fuego, libre de mantenimiento con pinturas o solventes y con vida útil estimada entre 15 y 25 años bajo certificación ISO 9001.
                  </span>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#132c3f]">
                2. Referencias Verificadas de Cielo Raso PVC y Cornisas en Catálogo
              </h2>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">SKU / Referencia</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Dimensiones</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Uds / Paquete</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">m² / Paquete</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Paquetes / 20ft</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Precio Ref. FOB</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {pvcCeilingProducts.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold">
                          <Link href={`/productos/${item.slug}`} className="text-sky-700 hover:underline">
                            {item.name}
                          </Link>
                          <span className="block text-xs font-mono text-slate-400">SKU: {item.id}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {item.width_cm} × {item.length_cm} cm ({item.thickness_mm} mm)
                        </td>
                        <td className="px-4 py-3 text-slate-700">{item.units_per_box} uds</td>
                        <td className="px-4 py-3 text-slate-700">{item.m2_per_box} m²</td>
                        <td className="px-4 py-3 text-slate-700">
                          {item.boxes_per_container_20ft?.toLocaleString("en-US")} paq ({item.m2_per_container_20ft?.toLocaleString("en-US")} m²)
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-900">
                          {Number(item.price).toFixed(2)} {item.currency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* ================= GUIDE 2: PANEL WPC VS DRYWALL ================= */}
        {slug === "panel-wpc-vs-drywall-precio-m2" && (
          <>
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#132c3f]">
                1. Diferencias Constructivas: Panel WPC Interior vs. Drywall Tradicional
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Al presupuestar un revestimiento de pared interior en proyectos residenciales, hoteleros o comerciales, comparar únicamente el precio de la lámina cruda de yeso frente a un panel terminado genera desviaciones de presupuesto. El análisis por metro cuadrado (m²) debe considerar las etapas de obra y el comportamiento frente a la humedad:
              </p>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Parámetro Técnico</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Panel WPC Interior ({siteSettings.brand_name})</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Sistema Drywall Estándar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-900">Dimensiones Estándar de Panel</td>
                      <td className="px-4 py-3 text-slate-700">16 cm × 295 cm × 25 mm (0.472 m² por unidad)</td>
                      <td className="px-4 py-3 text-slate-700">122 cm × 244 cm (requiere estructura, cinta, masilla y pintura)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-900">Presentación y Cobertura por Caja</td>
                      <td className="px-4 py-3 text-slate-700">Caja de 10 unidades = 4.72 m² por caja (14.16 kg/caja)</td>
                      <td className="px-4 py-3 text-slate-700">Venta por placa individual + insumos húmedos de acabado</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-900">Precio de Referencia FOB (Catálogo)</td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">30.60 USD / unidad (64.83 USD / m²)</td>
                      <td className="px-4 py-3 text-slate-500 italic">Depende de mano de obra local de encintado, masillado, lijado y pintura</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-900">Comportamiento ante Humedad</td>
                      <td className="px-4 py-3 text-slate-700">100 % impermeable; no se hincha ni prolifera moho</td>
                      <td className="px-4 py-3 text-slate-700">Sensible a filtraciones; requiere placa RH y sellado adicional</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-slate-900">Acabado Superficial y Mantenimiento</td>
                      <td className="px-4 py-3 text-slate-700">Acabado arquitectónico listo al instalar; cero pintura o solventes (15–25 años)</td>
                      <td className="px-4 py-3 text-slate-700">Requiere repintado periódico y resane de fisuras en juntas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#132c3f]">
                2. Referencias Verificadas de Paneles WPC Interior (16 × 295 cm)
              </h2>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Referencia WPC</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Formato</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">m² / Caja (10 uds)</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Cajas / 20ft</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Precio Ref. FOB</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Precio / m²</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {wpcInteriorProducts.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold">
                          <Link href={`/productos/${item.slug}`} className="text-sky-700 hover:underline">
                            {item.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {item.width_cm} × {item.length_cm} cm × {item.thickness_mm} mm
                        </td>
                        <td className="px-4 py-3 text-slate-700">{item.m2_per_box} m²</td>
                        <td className="px-4 py-3 text-slate-700">
                          {item.boxes_per_container_20ft} cajas ({item.m2_per_container_20ft} m²)
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-900">
                          {Number(item.price).toFixed(2)} {item.currency}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-700">
                          {Number(item.price_per_m2).toFixed(2)} {item.currency}/m²
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* ================= GUIDE 3: COMO IMPORTAR CONTENEDOR PISOS SPC ================= */}
        {slug === "como-importar-contenedor-pisos-spc" && (
          <>
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#132c3f]">
                1. Parámetros de Cubicaje y Peso para Importar Pisos SPC por Contenedor
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Los pisos SPC (Stone Plastic Composite) con base IXPE tienen una alta densidad por metro cúbico debido a su núcleo mineral rígido. Al planificar una importación por contenedor de 20 pies (33 m³ nominales / 31.35 m³ útiles) o 40 pies High Cube (76 m³ nominales / 72.20 m³ útiles), es indispensable verificar tanto el volumen por caja como el peso bruto:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold uppercase text-sky-600 block mb-1">Formato de Listón SPC</span>
                  <p className="text-lg font-black text-slate-900">18.3 × 122 cm × 4 mm</p>
                  <p className="text-xs text-slate-600 mt-1">
                    0.2233 m² por listón • Empaque de 10 unidades = 2.2326 m² por caja (0.0089 m³ por caja).
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold uppercase text-sky-600 block mb-1">Modalidades FOB y CIF</span>
                  <p className="text-lg font-black text-slate-900">Incoterms Flexibles</p>
                  <p className="text-xs text-slate-600 mt-1">
                    En FOB entregamos la carga en puerto de embarque; en CIF gestionamos costo, seguro y flete marítimo hasta su puerto en Latinoamérica.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold uppercase text-sky-600 block mb-1">Tiempo de Alistamiento</span>
                  <p className="text-lg font-black text-slate-900">15 a 30 días</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Permite consolidar un contenedor dedicado de pisos SPC o un contenedor mixto con zócalos SPC, paneles WPC y láminas de mármol PVC.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-[#132c3f]">
                2. Tabla de Referencias de Pisos SPC con Base IXPE en Catálogo
              </h2>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Referencia SPC</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Dimensiones</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">m² / Caja (10 uds)</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Peso / Caja</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Precio Ref. FOB</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">Precio / m²</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {spcFlooringProducts.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold">
                          <Link href={`/productos/${item.slug}`} className="text-sky-700 hover:underline">
                            {item.name}
                          </Link>
                          <span className="block text-xs font-mono text-slate-400">SKU: {item.id}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {item.width_cm} × {item.length_cm} cm × {item.thickness_mm} mm
                        </td>
                        <td className="px-4 py-3 text-slate-700">{item.m2_per_box} m²</td>
                        <td className="px-4 py-3 text-slate-700">{item.weight_kg_per_box} kg</td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-900">
                          {Number(item.price).toFixed(2)} {item.currency}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-700">
                          {Number(item.price_per_m2).toFixed(2)} {item.currency}/m²
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* Shared Interactive Tools & Contact CTA Block */}
        <section className="p-8 rounded-2xl bg-[#132c3f] text-white space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black mb-2">
                Planifique su Contenedor en Tiempo Real
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl">
                Utilice nuestro selector de contenedores de 20ft y 40ft High Cube y el Laboratorio Logístico 3D para calcular el cubicaje exacto de su pedido en FOB o CIF.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/seleccion-de-contenedores"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Ship className="w-4 h-4" />
                <span>Selección de Contenedores</span>
              </Link>
              <Link
                href="/laboratorio-logistico"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Calculator className="w-4 h-4" />
                <span>Laboratorio Logístico 3D</span>
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Showroom Medellín: {siteSettings.medellin_showroom_address}</span>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold text-amber-400 hover:text-amber-300"
            >
              <Phone className="w-4 h-4" />
              <span>Asesoría directa por WhatsApp: {siteSettings.primary_phone}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
