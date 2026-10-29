import { headers } from "next/headers";
import siteSettings from "./siteSettings";

const BASE_URL = siteSettings.base_url || "https://unitecusadesign.com";
const BRAND = siteSettings.brand_name || "UNITEC USA Design";

export async function getRequestLocale() {
  try {
    const h = await headers();
    const loc = h.get("x-locale");
    if (loc === "en" || loc === "es") return loc;
  } catch {
    // Fallback during static generation when headers() is not dynamic
  }
  return "es";
}

/**
 * Builds consistent server-side Next.js Metadata for any page:
 * - Format: [Page Title] | [Brand Name] (brand name appears ONCE via root layout template)
 * - Language-matched title & meta description (never mixed ES title + EN description)
 * - Self-referencing canonical + hreflang alternates (/es/, /en/, x-default)
 */
export async function buildPageMetadata({
  path = "/",
  title_es,
  title_en,
  description_es,
  description_en,
  image = "/og-image.jpg",
  noindex = false,
}) {
  const locale = await getRequestLocale();
  const isEn = locale === "en";

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedPath = cleanPath === "/" ? "/" : `${cleanPath.replace(/\/+$/, "")}/`;

  // Strip any accidental trailing "| Unitec..." from page title so brand name appears only once
  const rawTitle = isEn ? (title_en || title_es) : (title_es || title_en);
  const pageTitle = String(rawTitle || "")
    .replace(/\s*\|\s*(?:UNITEC\s*USA\s*Design|Unitec\s*USA\s*Design|Unitec\s*USA|UNITEC)\s*$/i, "")
    .trim();

  const description = isEn ? (description_en || description_es) : (description_es || description_en);
  const canonicalUrl = isEn
    ? `${BASE_URL}/en${normalizedPath === "/" ? "/" : normalizedPath}`
    : `${BASE_URL}${normalizedPath}`;

  const esUrl = `${BASE_URL}/es${normalizedPath === "/" ? "/" : normalizedPath}`;
  const enUrl = `${BASE_URL}/en${normalizedPath === "/" ? "/" : normalizedPath}`;
  const imageUrl = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: esUrl,
        en: enUrl,
        "x-default": esUrl,
      },
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "es_CO",
      url: canonicalUrl,
      siteName: BRAND,
      title: `${pageTitle} | ${BRAND}`,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${pageTitle} | ${BRAND}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${BRAND}`,
      description,
      images: [imageUrl],
    },
  };
}
