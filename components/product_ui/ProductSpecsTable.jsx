"use client";

import React from "react";
import { useLanguage } from "lib/LanguageContext";

export default function ProductSpecsTable({ product }) {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  if (!product) return null;

  const sheet = product.technical_sheet || {};
  const widthCm = product.width_cm ?? sheet.width_cm;
  const lengthCm = product.length_cm ?? sheet.length_cm;
  const thicknessMm = product.thickness_mm ?? sheet.thickness_mm;
  const unitsPerBox = product.units_per_box ?? sheet.units_per_box;
  const m2PerUnit = product.m2_per_unit ?? sheet.m2_per_unit;
  const m2PerBox = product.m2_per_box ?? sheet.m2_per_box;
  const unitWeightKg = sheet.unit_weight_kg ?? product.weight;
  const weightKgPerBox = product.weight_kg_per_box ?? sheet.weight_kg_per_box;
  const unitVolM3 = product.container_volume_m3_per_unit ?? sheet.container_volume_m3_per_unit;
  const boxVolM3 = product.box_volume_m3 ?? sheet.box_volume_m3;
  const boxes20 = product.boxes_per_container_20ft ?? sheet.boxes_per_container_20ft;
  const m2_20 = product.m2_per_container_20ft ?? sheet.m2_per_container_20ft;
  const boxes40 = product.boxes_per_container_40ft ?? sheet.boxes_per_container_40ft;
  const m2_40 = product.m2_per_container_40ft ?? sheet.m2_per_container_40ft;

  const rows = [
    {
      label: isSpanish ? "Código / SKU" : "SKU Code",
      value: product.id,
    },
    {
      label: isSpanish ? "Categoría" : "Category",
      value: isSpanish
        ? `${product.category} — ${product.subcategory}`
        : `${sheet.category_en || product.category} — ${sheet.subcategory_en || product.subcategory}`,
    },
    {
      label: isSpanish ? "Aplicación Recomendada" : "Recommended Application",
      value:
        product.collection === "EXTERIOR"
          ? isSpanish
            ? "Exterior / Intemperie"
            : "Exterior / Weather-Resistant"
          : isSpanish
          ? "Interior Arquitectónico"
          : "Interior Architectural",
    },
    widthCm
      ? {
          label: isSpanish ? "Ancho por Unidad" : "Unit Width",
          value: `${widthCm} cm`,
        }
      : null,
    lengthCm
      ? {
          label: isSpanish ? "Largo por Unidad" : "Unit Length",
          value: `${lengthCm} cm`,
        }
      : null,
    thicknessMm
      ? {
          label: isSpanish ? "Espesor" : "Thickness",
          value: `${thicknessMm} mm`,
        }
      : null,
    m2PerUnit
      ? {
          label: isSpanish ? "Área de Cobertura por Unidad" : "Coverage Area per Unit",
          value: `${m2PerUnit} m²`,
        }
      : null,
    unitsPerBox
      ? {
          label: isSpanish ? "Unidades por Caja / Empaque" : "Units per Box / Pack",
          value: `${unitsPerBox} ${isSpanish ? "unidades" : "units"}`,
        }
      : null,
    m2PerBox
      ? {
          label: isSpanish ? "Área Total por Caja / Empaque" : "Total Coverage per Box / Pack",
          value: `${m2PerBox} m²`,
        }
      : null,
    unitWeightKg
      ? {
          label: isSpanish ? "Peso por Unidad" : "Weight per Unit",
          value: `${unitWeightKg} kg`,
        }
      : null,
    weightKgPerBox
      ? {
          label: isSpanish ? "Peso por Caja / Empaque" : "Weight per Box / Pack",
          value: `${weightKgPerBox} kg`,
        }
      : null,
    unitVolM3
      ? {
          label: isSpanish ? "Volumen Cúbico por Unidad" : "Cubic Volume per Unit",
          value: `${unitVolM3} m³`,
        }
      : null,
    boxVolM3
      ? {
          label: isSpanish ? "Volumen Cúbico por Empaque" : "Cubic Volume per Pack",
          value: `${boxVolM3} m³`,
        }
      : null,
    boxes20
      ? {
          label: isSpanish ? "Capacidad por Contenedor 20 FT" : "20 FT Container Loading Capacity",
          value: `${boxes20.toLocaleString("en-US")} ${isSpanish ? "empaques" : "packs"}${
            m2_20 ? ` (${m2_20.toLocaleString("en-US")} m²)` : ""
          }`,
        }
      : null,
    boxes40
      ? {
          label: isSpanish ? "Capacidad por Contenedor 40 FT High Cube" : "40 FT High Cube Container Loading Capacity",
          value: `${boxes40.toLocaleString("en-US")} ${isSpanish ? "empaques" : "packs"}${
            m2_40 ? ` (${m2_40.toLocaleString("en-US")} m²)` : ""
          }`,
        }
      : null,
    product.price
      ? {
          label: isSpanish ? "Precio de Referencia FOB" : "FOB Reference Price",
          value: `${Number(product.price).toFixed(2)} ${product.currency || "USD"}${
            product.price_per_m2 ? ` (${Number(product.price_per_m2).toFixed(2)} ${product.currency || "USD"} / m²)` : ""
          }`,
        }
      : null,
    {
      label: isSpanish ? "Tiempo de Entrega / Despacho" : "Lead Time",
      value: isSpanish
        ? product.lead_time_days?.label_es || "15 a 30 días"
        : product.lead_time_days?.label_en || "15 to 30 days",
    },
  ].filter(Boolean);

  return (
    <section className="my-12 max-w-5xl mx-auto px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {isSpanish ? "Ficha Técnica del Producto" : "Product Technical Specifications"}
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          {isSpanish
            ? `Valores específicos verificados para ${product.name} (SKU ${product.id}).`
            : `Verified product-specific specifications for ${product.locale_variants?.en?.name || product.name} (SKU ${product.id}).`}
        </p>
      </div>

      <div className="overflow-hidden bg-white shadow-xs border border-slate-200 rounded-xl">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <tbody className="divide-y divide-slate-200">
            {rows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50/60" : "bg-white"}>
                <th
                  scope="row"
                  className="px-6 py-3.5 text-left font-semibold text-slate-900 w-1/2 sm:w-2/5"
                >
                  {row.label}
                </th>
                <td className="px-6 py-3.5 text-slate-700 font-medium">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
