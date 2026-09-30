import { Montserrat } from 'next/font/google'
import "./globals.css";
import Script from "next/script";
import { getDictionary } from "lib/i18n/getDictionary";
import RootLayoutClient from "./layout-client";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export async function generateMetadata() {
  const lang = 'es';
  const dict = getDictionary(lang);

  const BASE_URL = "https://unitecusadesign.com";
  const canonicalUrl = `${BASE_URL}/`;

  const defaults = {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    keywords: dict.meta.keywords,
    image: `${BASE_URL}/og-image.jpg`,
    siteName: dict.meta.siteName,
    canonical: canonicalUrl,
  };

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: defaults.title,
      template: `%s | ${dict.meta.siteName}`
    },
    description: defaults.description,
    keywords: defaults.keywords,
    authors: [{ name: "UNITEC USA Design Team" }],
    creator: "UNITEC USA Design",
    publisher: "UNITEC USA Design",
    applicationName: dict.meta.siteName,
    generator: "Next.js",
    manifest: "/favicons/manifest.json",

    alternates: {
      canonical: "/",
      languages: {
        'es': `${BASE_URL}/`,
        'x-default': `${BASE_URL}/`
      }
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },

    icons: {
      icon: [
        { url: "/favicons/unitec-favicon.png" },
        { url: "/favicons/unitec-favicon.png", sizes: "16x16", type: "image/png" },
        { url: "/favicons/unitec-favicon.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/favicons/apple-icon.png" },
        { url: "/favicons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      ],
    },

    openGraph: {
      type: "website",
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      url: defaults.canonical,
      siteName: defaults.siteName,
      title: defaults.title,
      description: defaults.description,
      images: [
        {
          url: defaults.image,
          width: 1200,
          height: 630,
          alt: lang === 'es' ? "UNITEC USA Design - Materiales Arquitectónicos" : "UNITEC USA Design - Architectural Materials",
        }
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@unitecusadesign",
      creator: "@unitecusadesign",
      title: defaults.title,
      description: defaults.description,
      images: [defaults.image],
    },

    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: dict.meta.siteName,
    },

    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },
  };
}

export default async function RootLayout({ children }) {
  const lang = 'es';
  const dict = getDictionary(lang);
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="inline-script-1" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K6KPJCJ6');`,
          }}
        />
        {/* Google tag (gtag.js) */}
        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=AW-18156507743" />
        <Script id="inline-script-2" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18156507743');
            `,
          }}
        />
        {/* Google tag (gtag.js) - G-NN981YWDYK */}
        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-NN981YWDYK" />
        <Script id="inline-script-3" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NN981YWDYK');
            `,
          }}
        />
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <Script id="inline-script-4" strategy="afterInteractive" dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        {/* Structured Data / JSON-LD */}

        <Script id="schema-script" type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://unitecusadesign.com/#organization",
                  "name": "Unitec USA Design",
                  "alternateName": "Unitec USA",
                  "url": "https://unitecusadesign.com",
                  "logo": {
                    "@type": "ImageObject",
                    "@id": "https://unitecusadesign.com/#logo",
                    "url": "https://unitecusadesign.com/unitec-logo.png",
                    "contentUrl": "https://unitecusadesign.com/unitec-logo.png",
                    "caption": "Unitec USA Design"
                  },
                  "image": { "@id": "https://unitecusadesign.com/#logo" },
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Carrera 42, Auto. S #75-83 C.C. IDEO Local 274",
                    "addressLocality": "Itagüí",
                    "addressRegion": "Antioquia",
                    "postalCode": "055413",
                    "addressCountry": "CO"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+57 314 233 2147",
                    "contactType": "sales",
                    "areaServed": ["US", "LATAM", "Caribbean"],
                    "availableLanguage": ["English", "Spanish"]
                  },
                  "sameAs": [
                    "https://instagram.com/unitecusadesign",
                    "https://facebook.com/unitecusadesign",
                    "https://www.tiktok.com/@unitecusadesign"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://unitecusadesign.com/#website",
                  "url": "https://unitecusadesign.com",
                  "name": dict.meta.siteName,
                  "description": dict.meta.siteDescription,
                  "publisher": { "@id": "https://unitecusadesign.com/#organization" },
                  "inLanguage": ["es", "en"],
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://unitecusadesign.com/colecciones/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
        {/* Cookiehub */}
        <Script strategy="lazyOnload" src="https://cdn.cookiehub.eu/c2/c2fa7641.js" />
        <Script id="inline-script-5" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
              var cpm = {};
              if (window.cookiehub) {
                window.cookiehub.load(cpm);
              } else {
                window.addEventListener("load", function() {
                  window.cookiehub.load(cpm);
                });
              }
            `,
          }}
        />
        {/* Metricool Analytics Tracker */}
        <Script
          id="metricool-tracker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"5ce44b552f857fc4a5b60d701c3e17cf"})});`
          }}
        />
      </head>
      <body className={`${montserrat.className} font-medium`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K6KPJCJ6"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <RootLayoutClient lang={lang} dict={dict}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
