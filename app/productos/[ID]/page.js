import ProductSection from "My_UI/product_ui/product_section";
import RecommendationsSection from "My_UI/product_ui/recommended_section";
import SheetDimensions from "My_UI/product_ui/dimension";
import HowShippingWorks from "My_UI/product_ui/steps";
import ProductStory from "My_UI/product_ui/story";
import ProductSpecsTable from "My_UI/product_ui/ProductSpecsTable";
import productData from "static_data/products_full.json";
import siteSettings from "lib/siteSettings";
import { notFound, permanentRedirect } from "next/navigation";

const BASE_URL = siteSettings.base_url || "https://unitecusadesign.com";

function findProduct(paramValue) {
  const key = decodeURIComponent(String(paramValue || "")).trim();
  const lower = key.toLowerCase();
  return productData.find(
    (p) =>
      String(p.slug || "").toLowerCase() === lower ||
      String(p.id).toLowerCase() === lower
  );
}

export async function generateStaticParams() {
  const slugParams = productData.map((p) => ({
    ID: String(p.slug || p.id),
  }));
  // Keep the existing keyword product ID working alongside all slugs
  const legacyKeyword = productData
    .filter((p) => !/^\d+$/.test(String(p.id)) && String(p.id) !== String(p.slug))
    .map((p) => ({ ID: String(p.id) }));
  return [...slugParams, ...legacyKeyword];
}

export async function generateMetadata({ params }, parent) {
  const { ID } = await params;
  const product = findProduct(ID);

  if (!product) {
    return {
      title: "Producto no encontrado",
      description: "El producto solicitado no está disponible.",
      robots: { index: false, follow: false },
    };
  }

  const parentMeta = await parent;
  const canonicalSlug = product.slug || product.id;
  const canonicalUrl = `${BASE_URL}/productos/${canonicalSlug}/`;
  const titleText = `${product.name} (${product.subcategory || product.category})`;
  const descText = (product.description_unique || product.description || "").slice(0, 158);
  const imageUrl = product.image ? `${BASE_URL}${product.image}` : `${BASE_URL}/og-image.jpg`;

  return {
    ...parentMeta,
    title: titleText,
    description: descText,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${BASE_URL}/es/productos/${canonicalSlug}/`,
        en: `${BASE_URL}/en/productos/${canonicalSlug}/`,
        "x-default": `${BASE_URL}/es/productos/${canonicalSlug}/`,
      },
    },
    openGraph: {
      ...parentMeta.openGraph,
      title: `${titleText} | ${siteSettings.brand_name}`,
      description: descText,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.image_alt_text || product.name,
        },
      ],
    },
    twitter: {
      ...parentMeta.twitter,
      title: `${titleText} | ${siteSettings.brand_name}`,
      description: descText,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }) {
  const { ID } = await params;
  const rawParam = decodeURIComponent(String(ID || "")).trim();
  const product = findProduct(rawParam);

  if (!product) return notFound();

  // If accessed by numeric ID, permanently redirect (301) to the canonical keyword slug
  if (/^\d+$/.test(rawParam) && product.slug && rawParam !== product.slug) {
    permanentRedirect(`/productos/${product.slug}`);
  }

  const canonicalSlug = product.slug || product.id;
  const canonicalUrl = `${BASE_URL}/productos/${canonicalSlug}/`;

  // Build valid Product JSON-LD strictly from verified Section 2 fields
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    name: product.name,
    description: product.description_unique || product.description,
    sku: String(product.id),
    mpn: String(product.id),
    category: `${product.category} > ${product.subcategory}`,
    image: product.image ? [`${BASE_URL}${product.image}`] : [`${BASE_URL}/og-image.jpg`],
    brand: {
      "@type": "Brand",
      name: siteSettings.brand_name,
    },
    manufacturer: {
      "@id": `${BASE_URL}/#organization`,
    },
    additionalProperty: [
      product.width_cm ? { "@type": "PropertyValue", name: "Width (cm)", value: product.width_cm, unitCode: "CMT" } : null,
      product.length_cm ? { "@type": "PropertyValue", name: "Length (cm)", value: product.length_cm, unitCode: "CMT" } : null,
      product.thickness_mm ? { "@type": "PropertyValue", name: "Thickness (mm)", value: product.thickness_mm, unitCode: "MMT" } : null,
      product.units_per_box ? { "@type": "PropertyValue", name: "Units per Box/Pack", value: product.units_per_box } : null,
      product.m2_per_box ? { "@type": "PropertyValue", name: "Coverage per Box (m²)", value: product.m2_per_box, unitCode: "MTK" } : null,
      product.weight_kg_per_box ? { "@type": "PropertyValue", name: "Weight per Box (kg)", value: product.weight_kg_per_box, unitCode: "KGM" } : null,
      product.boxes_per_container_20ft ? { "@type": "PropertyValue", name: "Boxes per 20ft Container", value: product.boxes_per_container_20ft } : null,
      product.boxes_per_container_40ft ? { "@type": "PropertyValue", name: "Boxes per 40ft HC Container", value: product.boxes_per_container_40ft } : null,
    ].filter(Boolean),
  };

  if (product.price && product.price > 0) {
    productSchema.offers = {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: product.currency || "USD",
      price: Number(product.price).toFixed(2),
      availability:
        product.stock_status === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@id": `${BASE_URL}/#organization`,
      },
    };
  }

  // Only emit aggregateRating if real verified reviews exist (never fake ratings)
  if (Array.isArray(product.reviews) && product.reviews.length > 0) {
    const avgRating =
      product.reviews.reduce((sum, r) => sum + Number(r.rating || 5), 0) /
      product.reviews.length;
    productSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: product.reviews.length,
    };
  }

  return (
    <main className="mx-auto py-8 px-4 md:px-10 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* 1. Summary & Price Block (H1 = unique product name) */}
      <ProductSection data={product} />

      {/* 2. Per-Product Specifications Table (Section 2 fields only) */}
      <ProductSpecsTable product={product} />

      {/* 3. Per-Product Unique Description & Container Loading Figures */}
      <ProductStory data={product} />
      <SheetDimensions sheet={product} />

      {/* 4. Container Shipping Workflow & Related Products */}
      <HowShippingWorks />
      <RecommendationsSection itemID={product.id} />
    </main>
  );
}
