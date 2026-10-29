"use client";

import GetFinalPrice from "My_UI/getFinalPrice";
import AddToContainer from "My_UI/cart/addToContainer";
import { useLanguage } from "lib/LanguageContext";
import { getWhatsAppUrl } from "lib/siteSettings";
import { Clock, ShieldCheck, Ship, MessageCircle } from "lucide-react";

export default function BuyBox({ product }) {
  const { language } = useLanguage();
  const isSpanish = language === "es";

  const currency = product.currency || "USD";
  const price = product.price ?? product.basePrice;
  const pricePerM2 = product.price_per_m2;
  const m2PerBox = product.m2_per_box;
  const unitsPerBox = product.units_per_box || product.itemsPerBox || 1;
  const leadTimeLabel = isSpanish
    ? (product.lead_time_days?.label_es || "15 a 30 días")
    : (product.lead_time_days?.label_en || "15 to 30 days");

  const incotermNote = isSpanish
    ? (product.incoterm_pricing?.explanation_es || "Precio base FOB. Cotización CIF disponible según puerto de destino.")
    : (product.incoterm_pricing?.explanation_en || "FOB base price. CIF quote available based on destination port.");

  const displayName = product.locale_variants?.[language]?.name || product.name;
  const whatsappQuoteHref = getWhatsAppUrl(
    isSpanish
      ? `Hola, deseo cotizar ${displayName} (SKU ${product.id}) por contenedor.`
      : `Hello, I would like a container quote for ${displayName} (SKU ${product.id}).`
  );

  const t = {
    inStock: isSpanish ? "En Stock para Despacho / Exportación" : "In Stock for Dispatch / Export",
    outOfStock: isSpanish ? "Cotización bajo pedido" : "Quote on request",
    unitPriceLabel: isSpanish ? "Precio por unidad (FOB)" : "Price per unit (FOB)",
    pricePerM2Label: isSpanish ? "Precio por m²" : "Price per m²",
    packInfoLabel: isSpanish ? "Contenido por empaque" : "Pack contents",
    leadTimeTitle: isSpanish ? "Tiempo estimado de alistamiento / entrega" : "Estimated lead time",
    incotermsTitle: isSpanish ? "Modalidad de Negociación" : "Trade Terms (Incoterms)",
    fobBadge: "FOB",
    cifBadge: "CIF",
    whatsappCta: isSpanish ? "Cotizar FOB / CIF por WhatsApp" : "Request FOB / CIF Quote on WhatsApp",
  };

  return (
    <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-xs space-y-4">
      {/* Stock Status */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {product.stock_status === "out_of_stock" ? t.outOfStock : t.inStock}
        </span>
        <span className="text-xs font-mono font-bold text-slate-500">
          ISO: {currency}
        </span>
      </div>

      {/* Price Block (Currency ISO code, Price per Unit, Price per m²) */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {t.unitPriceLabel}
          </span>
          <GetFinalPrice
            basePrice={product.basePrice}
            price={price}
            currency={currency}
            discountPercent={product.discountPercent}
            className="text-2xl font-black text-slate-900 font-mono"
          />
        </div>

        {pricePerM2 > 0 && (
          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">{t.pricePerM2Label}:</span>
            <span className="font-mono font-bold text-slate-900">
              {Number(pricePerM2).toFixed(2)} {currency} / m²
            </span>
          </div>
        )}

        {m2PerBox > 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">{t.packInfoLabel}:</span>
            <span className="font-mono font-semibold text-slate-800">
              {unitsPerBox} {isSpanish ? "uds" : "units"} ({m2PerBox} m²)
            </span>
          </div>
        )}
      </div>

      {/* Incoterms FOB / CIF Block */}
      <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200/80 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Ship className="w-4 h-4 text-sky-600" />
            {t.incotermsTitle}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 text-[10px] font-black rounded bg-[#132c3f] text-white">
              {t.fobBadge}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-black rounded bg-sky-600 text-white">
              {t.cifBadge}
            </span>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          {incotermNote}
        </p>
      </div>

      {/* Lead time */}
      <div className="flex items-center gap-2.5 text-xs text-slate-700 px-1">
        <Clock className="w-4 h-4 text-slate-500 shrink-0" />
        <span>
          <strong>{t.leadTimeTitle}:</strong> {leadTimeLabel}
        </span>
      </div>

      {/* Actions */}
      <div className="pt-2 space-y-2.5">
        <AddToContainer
          isProductPage
          item={{
            id: product.id,
            slug: product.slug,
            dimensions: product.dimensions,
            container_volume_m3_per_unit: product.container_volume_m3_per_unit,
            m2_per_box: product.m2_per_box,
            units_per_box: product.units_per_box,
            weight_kg_per_box: product.weight_kg_per_box,
            price: price,
            currency: currency,
            name: displayName,
            image: product.image?.url || product.image || "/raster/product.jpg",
          }}
        />

        <a
          href={whatsappQuoteHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.whatsappCta}</span>
        </a>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          {isSpanish
            ? "Consolidación verificada en contenedores de 20ft (33 m³) y 40ft HC (76 m³)."
            : "Verified consolidation in 20ft (33 m³) and 40ft HC (76 m³) containers."}
        </span>
      </div>
    </div>
  );
}
