"use client"
import Head from "next/head"

/**
 * SeoHead – centralised SEO meta tags for each page.
 * Pass title, description, url, image, canonical as needed.
 */
export default function SeoHead({
  title = "BIwebsite – Innovative Logistics",
  description = "Premium container visualization and logistics platform.",
  url,
  image,
  canonical,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </Head>
  )
}
