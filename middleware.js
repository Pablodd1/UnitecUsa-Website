import { NextResponse } from "next/server";
import productRedirects from "./static_data/product_redirects.json";

const EN_SLUG_REWRITES = {
  "/about": "/nosotros",
  "/about/history": "/nosotros/historia",
  "/about/who-we-are": "/nosotros/who-we-are",
  "/about/mission": "/nosotros/mission",
  "/about/vision": "/nosotros/vision",
  "/about/quality": "/nosotros/quality",
  "/about/business-models": "/nosotros/business-models",
  "/about/negotiation": "/nosotros/negotiation",
  "/contact": "/contacto",
  "/countries": "/paises",
  "/guides": "/guias",
  "/faqs": "/preguntas-frecuentes",
  "/privacy-policy": "/politicas",
  "/terms-and-conditions": "/terminos",
  "/container-selection": "/seleccion-de-contenedores",
  "/logistics-lab": "/laboratorio-logistico",
  "/cart": "/carrito",
  "/checkout": "/pagar",
};

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Skip static assets, API routes, Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/raster") ||
    pathname.startsWith("/favicons") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 1. Check for locale prefix (/es or /en)
  let locale = null;
  let strippedPath = pathname;

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    locale = "es";
    strippedPath = pathname.slice(3) || "/";
  } else if (pathname === "/en" || pathname.startsWith("/en/")) {
    locale = "en";
    strippedPath = pathname.slice(3) || "/";
  }

  // Normalize trailing slash for lookup
  const cleanStripped = strippedPath.length > 1 && strippedPath.endsWith("/")
    ? strippedPath.slice(0, -1)
    : strippedPath;

  // 2. Check numeric product URLs -> True HTTP 301 Permanent Redirect to keyword slug
  const prodMatch = cleanStripped.match(/^\/(?:productos|products)\/([^/]+)$/i);
  if (prodMatch) {
    const rawId = decodeURIComponent(prodMatch[1]);
    // Only redirect numeric IDs (keep the existing keyword product ID working or redirect numeric IDs)
    if (/^\d+$/.test(rawId) && productRedirects[rawId]) {
      const targetSlug = productRedirects[rawId];
      const prefix = locale ? `/${locale}` : "";
      const redirectUrl = new URL(`${prefix}/productos/${targetSlug}/${search}`, request.url);
      return NextResponse.redirect(redirectUrl, 301);
    }
  }

  // 3. If locale prefix is present (/es/... or /en/...), rewrite to internal App Router path
  if (locale) {
    let internalPath = cleanStripped;

    if (EN_SLUG_REWRITES[cleanStripped]) {
      internalPath = EN_SLUG_REWRITES[cleanStripped];
    } else if (cleanStripped.startsWith("/products/")) {
      internalPath = cleanStripped.replace(/^\/products\//, "/productos/");
    } else if (cleanStripped.startsWith("/collections/")) {
      internalPath = cleanStripped.replace(/^\/collections\//, "/colecciones/");
    } else if (cleanStripped === "/collections") {
      internalPath = "/colecciones";
    } else if (cleanStripped.startsWith("/guides/")) {
      internalPath = cleanStripped.replace(/^\/guides\//, "/guias/");
    }

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = internalPath;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);

    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    });
    response.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
