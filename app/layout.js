import { Montserrat } from 'next/font/google'
import "./globals.css";
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

  const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "";
  const resolveBaseUrl = (value) => {
    if (!value) return "http://localhost:3000";
    const trimmed = value.trim();
    if (!trimmed) return "http://localhost:3000";
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      return new URL(withProtocol).toString();
    } catch {
      return "http://localhost:3000";
    }
  };

  const BASE_URL = resolveBaseUrl(rawBaseUrl);
  const canonicalUrl = `${BASE_URL}/${lang}`;

  const defaults = {
    title: dict.meta.siteName + " | " + (lang === 'es' ? "Diseñamos el Futuro" : "We Design the Future"),
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
      canonical: defaults.canonical,
      languages: {
        'en': `${BASE_URL}`,
        'es': `${BASE_URL}/es`,
        'x-default': `${BASE_URL}`
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
        { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
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
      site: "@building.innovation",
      creator: "@building.innovation",
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
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/#organization`,
                  "name": "UNITEC USA Design",
                  "url": process.env.NEXT_PUBLIC_BASE_URL,
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`
                  },
                  "description": dict.meta.siteDescription,
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": lang === 'es' ? "Ventas" : "Sales",
                    "availableLanguage": ["English", "Spanish"]
                  },
                  "sameAs": [
                    "https://instagram.com/building.innovation",
                    "https://facebook.com/buildinginnovation"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/#website`,
                  "url": process.env.NEXT_PUBLIC_BASE_URL,
                  "name": "UNITEC USA Design",
                  "publisher": {
                    "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/#organization`
                  },
                  "inLanguage": ["en", "es"]
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${montserrat.className} font-medium`}>
        <RootLayoutClient lang={lang} dict={dict}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}