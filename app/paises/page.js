"use client";

import Link from "next/link";
import { Globe, MapPin, Ship, ArrowRight, Layers, CheckCircle2 } from "lucide-react";
import { useLanguage } from "lib/LanguageContext";
import siteSettings, { getWhatsAppUrl, getMiamiAddressFormatted } from "lib/siteSettings";

export default function PaisesPage() {
  const { language } = useLanguage();
  const isSpanish = language === "es";
  const whatsappHref = getWhatsAppUrl();
  const miamiAddress = getMiamiAddressFormatted();

  const productLines = isSpanish
    ? [
        { name: "Cielo Raso en PVC", href: "/colecciones/interior", desc: "Láminas y cornisas de 595 cm (8.5 mm) impermeables para techos." },
        { name: "Paneles WPC Interior y Exterior", href: "/colecciones/paneles-wpc", desc: "Paneles acanalados, redondos y coextruidos de 290–295 cm." },
        { name: "Pisos SPC Click y Deck WPC", href: "/colecciones/pisos", desc: "Pisos rígidos SPC con IXPE y deck exterior para alto tráfico." },
        { name: "Láminas de Mármol PVC y Foam Board", href: "/colecciones/laminas", desc: "Formato 122 × 244 cm con acabado UV brillante, mate y piedra." },
        { name: "Cubiertas Termoacústicas UPVC", href: "/colecciones/cubiertas-upvc", desc: "Tejas anticorrosivas de hasta 11.80 m para bodegas y vivienda." },
        { name: "Fachadas y Listones Arquitectónicos", href: "/colecciones/fachadas", desc: "Polifachada, fachada deck y listones WPC para exteriores." },
      ]
    : [
        { name: "PVC Ceiling Panels", href: "/colecciones/interior", desc: "Waterproof 595 cm (8.5 mm) ceiling panels and perimeter cornices." },
        { name: "Interior & Exterior WPC Wall Panels", href: "/colecciones/paneles-wpc", desc: "Fluted, half-round, and co-extruded 290–295 cm WPC cladding." },
        { name: "SPC Click Flooring & WPC Decking", href: "/colecciones/pisos", desc: "Rigid-core SPC planks with IXPE pad and weather-resistant WPC decking." },
        { name: "PVC Marble Sheets & Foam Board", href: "/colecciones/laminas", desc: "Full 122 × 244 cm sheets with UV high-gloss, matte, and stone finishes." },
        { name: "UPVC Thermoacoustic Roofing", href: "/colecciones/cubiertas-upvc", desc: "Anti-corrosive roofing sheets up to 11.80 m for industrial and residential roofs." },
        { name: "Exterior Facades & Architectural Slats", href: "/colecciones/fachadas", desc: "Polifachada, deck facade cladding, and exterior WPC louvers." },
      ];

  return (
    <main className="w-full bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-[#132c3f] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-sky-300 mb-6">
            <Globe className="w-4 h-4" />
            {isSpanish ? "COBERTURA INTERNACIONAL" : "INTERNATIONAL COVERAGE"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
            {isSpanish
              ? "Países que Atendemos: Exportación por Contenedor y Distribución"
              : "Countries Served: Container Export & Regional Distribution"}
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            {isSpanish
              ? `Desde nuestra sede en ${miamiAddress} y nuestro showroom en Medellín, suministramos contenedores de 20 pies (33 m³) y 40 pies High Cube (76 m³) en modalidades FOB y CIF hacia Estados Unidos, Latinoamérica y el Caribe.`
              : `From our headquarters at ${miamiAddress} and our Medellín showroom, we supply 20ft (33 m³) and 40ft High Cube (76 m³) containers under FOB and CIF terms across the United States, Latin America, and the Caribbean.`}
          </p>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#132c3f] mb-3">
            {isSpanish ? "Mercados Activos y Rutas de Suministro" : "Active Markets & Supply Routes"}
          </h2>
          <p className="text-slate-600 text-base">
            {isSpanish
              ? "Seleccione su país para explorar las líneas constructivas disponibles para despacho local o consolidación por contenedor:"
              : "Explore our verified regional markets and architectural product lines available for local dispatch or container consolidation:"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(siteSettings.countries_served || []).map((country) => (
            <article
              key={country.code}
              className="rounded-2xl border border-slate-200 p-6 bg-slate-50/60 hover:bg-white hover:shadow-lg hover:border-sky-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#132c3f] text-white">
                    {country.code}
                  </span>
                  <MapPin className="w-4 h-4 text-sky-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  {isSpanish ? country.name_es : country.name_en}
                </h3>
                <p className="text-xs font-semibold text-sky-700 mb-4">
                  {isSpanish ? country.city_es : country.city_en}
                </p>

                <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200/80 pt-3 mb-5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <Link href="/colecciones/paneles-wpc" className="hover:text-sky-600 hover:underline">
                      {isSpanish ? "Paneles WPC y Fachadas" : "WPC Wall Panels & Facades"}
                    </Link>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <Link href="/colecciones/pisos" className="hover:text-sky-600 hover:underline">
                      {isSpanish ? "Pisos SPC Click y Deck Exterior" : "SPC Click Flooring & Decking"}
                    </Link>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <Link href="/colecciones/laminas" className="hover:text-sky-600 hover:underline">
                      {isSpanish ? "Láminas de Mármol PVC y Cielo Raso" : "PVC Marble Sheets & Ceilings"}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200/80">
                <Link
                  href="/seleccion-de-contenedores"
                  className="text-xs font-bold text-[#132c3f] hover:text-sky-600 inline-flex items-center gap-1"
                >
                  <Ship className="w-3.5 h-3.5" />
                  <span>{isSpanish ? "Armar contenedor" : "Build container"}</span>
                </Link>
                <Link
                  href="/contacto"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
                >
                  <span>{isSpanish ? "Cotizar FOB/CIF" : "Quote FOB/CIF"}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Product Lines Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#132c3f] mb-8">
            {isSpanish
              ? "Líneas de Producto Disponibles para Exportación y Mayoreo"
              : "Product Lines Available for Container Export & Wholesale"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productLines.map((line, i) => (
              <Link
                key={i}
                href={line.href}
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {line.name}
                  </h3>
                  <Layers className="w-4 h-4 text-sky-600 shrink-0" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{line.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-[#132c3f] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black mb-1">
                {isSpanish
                  ? "¿Desea cotizar un contenedor hacia otro puerto de América?"
                  : "Need a container quote to another port in the Americas?"}
              </h3>
              <p className="text-sm text-slate-300">
                {isSpanish
                  ? "Use nuestro simulador de cubicaje o contáctenos por WhatsApp con su puerto de destino."
                  : "Use our cubic-meter container planner or message us on WhatsApp with your destination port."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/seleccion-de-contenedores"
                className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                {isSpanish ? "Planificador de Contenedor" : "Container Planner"}
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#F37B24] hover:bg-[#e06912] text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                WhatsApp ({siteSettings.primary_phone})
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
