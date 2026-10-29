"use client";

import { useLanguage } from "lib/LanguageContext";
import { CheckCircle2, Layers, Box, Ruler, Ship } from "lucide-react";

export default function ProductContent({ product }) {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const localeData = product.locale_variants?.[language] || product.locale_variants?.es || {};
  const displayName = localeData.name || product.name;
  const displayCategory = localeData.category || product.category;
  const displaySubcategory = localeData.subcategory || product.subcategory;

  const hasReviews = Array.isArray(product.reviews) && product.reviews.length > 0;
  const avgRating = hasReviews
    ? (product.reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / product.reviews.length).toFixed(1)
    : null;

  const t = {
    sku: "SKU",
    category: isSpanish ? "Categoría" : "Category",
    application: isSpanish ? "Aplicación" : "Application",
    dimensions: isSpanish ? "Dimensiones por Unidad" : "Unit Dimensions",
    thickness: isSpanish ? "Espesor" : "Thickness",
    boxCoverage: isSpanish ? "Cobertura por Empaque" : "Coverage per Pack",
    container20: isSpanish ? "Carga Contenedor 20 FT" : "20 FT Container Load",
    container40: isSpanish ? "Carga Contenedor 40 FT HC" : "40 FT HC Container Load",
    units: isSpanish ? "unidades" : "units",
    packs: isSpanish ? "empaques" : "packs",
    reviewsLabel: isSpanish ? "calificaciones verificadas" : "verified reviews",
  };

  return (
    <div className="space-y-6">
      {/* Category & SKU Badge */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
            {displayCategory}
          </span>
          {displaySubcategory && displaySubcategory !== displayCategory && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sky-50 text-sky-800">
              {displaySubcategory}
            </span>
          )}
          <span className="text-xs font-mono text-slate-500 ml-auto">
            {t.sku}: {product.id}
          </span>
        </div>

        {/* H1 = Product Name (unique) */}
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          {displayName}
        </h1>

        {/* Star rating ONLY rendered if real verified reviews exist */}
        {hasReviews && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-amber-500 text-sm">★★★★★</span>
            <span className="text-xs font-semibold text-slate-600">
              {avgRating} ({product.reviews.length} {t.reviewsLabel})
            </span>
          </div>
        )}
      </div>

      {/* Quick Engineering Summary Grid */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {product.width_cm && product.length_cm && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
              <Ruler className="w-3.5 h-3.5 text-sky-600" />
              <span>{t.dimensions}</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {product.width_cm} × {product.length_cm} cm
            </p>
            {product.m2_per_unit && (
              <p className="text-xs text-slate-500">{product.m2_per_unit} m² / {isSpanish ? "unidad" : "unit"}</p>
            )}
          </div>
        )}

        {product.thickness_mm > 0 && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              <span>{t.thickness}</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {product.thickness_mm} mm
            </p>
            <p className="text-xs text-slate-500">
              {product.collection === "EXTERIOR"
                ? (isSpanish ? "Grado Exterior" : "Exterior Grade")
                : (isSpanish ? "Grado Interior" : "Interior Grade")}
            </p>
          </div>
        )}

        {product.units_per_box > 0 && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
              <Box className="w-3.5 h-3.5 text-sky-600" />
              <span>{t.boxCoverage}</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {product.m2_per_box ? `${product.m2_per_box} m²` : `${product.units_per_box} ${t.units}`}
            </p>
            <p className="text-xs text-slate-500">
              {product.units_per_box} {t.units}
              {product.weight_kg_per_box ? ` • ${product.weight_kg_per_box} kg` : ""}
            </p>
          </div>
        )}

        {product.boxes_per_container_20ft > 0 && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
              <Ship className="w-3.5 h-3.5 text-sky-600" />
              <span>{t.container20}</span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {product.boxes_per_container_20ft.toLocaleString("en-US")} {t.packs}
            </p>
            {product.m2_per_container_20ft && (
              <p className="text-xs text-slate-500">
                {product.m2_per_container_20ft.toLocaleString("en-US")} m² / 20ft
              </p>
            )}
          </div>
        )}
      </div>

      {/* Verified Product Attributes */}
      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
        <li className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {isSpanish
              ? "100 % resistente a la humedad y libre de mantenimiento con solventes"
              : "100% moisture-resistant and maintenance-free without harsh solvents"}
          </span>
        </li>
        {product.boxes_per_container_40ft > 0 && (
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isSpanish
                ? `Capacidad en contenedor 40ft High Cube: ${product.boxes_per_container_40ft.toLocaleString("en-US")} empaques (${product.m2_per_container_40ft ? `${product.m2_per_container_40ft.toLocaleString("en-US")} m²` : ""})`
                : `40ft High Cube container capacity: ${product.boxes_per_container_40ft.toLocaleString("en-US")} packs (${product.m2_per_container_40ft ? `${product.m2_per_container_40ft.toLocaleString("en-US")} m²` : ""})`}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}
