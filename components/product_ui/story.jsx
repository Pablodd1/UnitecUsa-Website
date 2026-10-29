"use client";

import { useLanguage } from "lib/LanguageContext";
import { Ship, PackageCheck, Layers } from "lucide-react";

export default function ProductStory({ data }) {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  if (!data) return null;

  const localeData = data.locale_variants?.[language] || data.locale_variants?.es || {};
  const uniqueDescription =
    localeData.description_unique || data.description_unique || data.description;
  const displayName = localeData.name || data.name;

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-600 block mb-2">
            {isSpanish ? "DESCRIPCIÓN Y LOGÍSTICA POR CONTENEDOR" : "PRODUCT DESCRIPTION & CONTAINER LOGISTICS"}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {displayName}
          </h2>
        </div>

        {/* Single unique product description (never repeated across multiple components) */}
        <p className="text-base text-slate-700 leading-relaxed">
          {uniqueDescription}
        </p>

        {/* Per-Product Container Loading Figures */}
        {(data.boxes_per_container_20ft || data.boxes_per_container_40ft) && (
          <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-1">
                <Layers className="w-4 h-4 text-sky-600" />
                <span>{isSpanish ? "Rendimiento por Empaque" : "Coverage per Pack"}</span>
              </div>
              <p className="text-lg font-black text-slate-900">
                {data.m2_per_box ? `${data.m2_per_box} m²` : `${data.units_per_box || 1} uds`}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {data.units_per_box || 1} {isSpanish ? "unidades por empaque" : "units per pack"}
                {data.box_volume_m3 ? ` • ${data.box_volume_m3} m³` : ""}
              </p>
            </div>

            {data.boxes_per_container_20ft && (
              <div className="bg-white p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-1">
                  <Ship className="w-4 h-4 text-sky-600" />
                  <span>{isSpanish ? "Contenedor 20 FT (33 m³)" : "20 FT Container (33 m³)"}</span>
                </div>
                <p className="text-lg font-black text-slate-900">
                  {data.boxes_per_container_20ft.toLocaleString("en-US")} {isSpanish ? "empaques" : "packs"}
                </p>
                {data.m2_per_container_20ft && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isSpanish ? "Cobertura total:" : "Total coverage:"}{" "}
                    <strong>{data.m2_per_container_20ft.toLocaleString("en-US")} m²</strong>
                  </p>
                )}
              </div>
            )}

            {data.boxes_per_container_40ft && (
              <div className="bg-white p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-1">
                  <PackageCheck className="w-4 h-4 text-sky-600" />
                  <span>{isSpanish ? "Contenedor 40 FT HC (76 m³)" : "40 FT HC Container (76 m³)"}</span>
                </div>
                <p className="text-lg font-black text-slate-900">
                  {data.boxes_per_container_40ft.toLocaleString("en-US")} {isSpanish ? "empaques" : "packs"}
                </p>
                {data.m2_per_container_40ft && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isSpanish ? "Cobertura total:" : "Total coverage:"}{" "}
                    <strong>{data.m2_per_container_40ft.toLocaleString("en-US")} m²</strong>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
