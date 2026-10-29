import siteSettingsData from "../static_data/site_settings.json";

export const siteSettings = siteSettingsData;

export function getMiamiAddressFormatted() {
  const { miami_address_street, miami_address_suite, miami_city, miami_state, miami_zip } = siteSettingsData;
  const streetPart = miami_address_suite
    ? `${miami_address_street}, ${miami_address_suite}`
    : miami_address_street;
  return `${streetPart}, ${miami_city}, ${miami_state} ${miami_zip}`;
}

export function getWhatsAppUrl(customMessage = "") {
  const base = `https://wa.me/${siteSettingsData.primary_whatsapp}`;
  if (!customMessage) return base;
  return `${base}?text=${encodeURIComponent(customMessage)}`;
}

export function getTelUrl() {
  const digits = siteSettingsData.primary_phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

export function getMailtoUrl() {
  return `mailto:${siteSettingsData.public_email}`;
}

export function interpolateSiteSettings(text) {
  if (typeof text !== "string") return text;
  return text
    .replace(/\{\{BRAND_NAME\}\}/g, siteSettingsData.brand_name)
    .replace(/\{\{PRIMARY_PHONE\}\}/g, siteSettingsData.primary_phone)
    .replace(/\{\{PUBLIC_EMAIL\}\}/g, siteSettingsData.public_email)
    .replace(/\{\{MIAMI_ADDRESS\}\}/g, getMiamiAddressFormatted())
    .replace(/\{\{MEDELLIN_ADDRESS\}\}/g, siteSettingsData.medellin_showroom_address);
}

export function getOrganizationSchema() {
  const {
    brand_name,
    public_email,
    primary_phone,
    miami_address_street,
    miami_address_suite,
    miami_city,
    miami_state,
    miami_zip,
    medellin_showroom_address,
    medellin_postal_code,
    nit,
    us_ein,
    base_url,
    social,
    countries_served,
  } = siteSettingsData;

  const org = {
    "@type": "Organization",
    "@id": `${base_url}/#organization`,
    name: brand_name,
    url: base_url,
    email: public_email || undefined,
    telephone: primary_phone,
    logo: {
      "@type": "ImageObject",
      "@id": `${base_url}/#logo`,
      url: `${base_url}/unitec-logo.png`,
      contentUrl: `${base_url}/unitec-logo.png`,
      caption: brand_name,
    },
    image: { "@id": `${base_url}/#logo` },
    address: [
      {
        "@type": "PostalAddress",
        name: `${brand_name} - Miami Headquarters`,
        streetAddress: miami_address_suite
          ? `${miami_address_street}, ${miami_address_suite}`
          : miami_address_street,
        addressLocality: miami_city,
        addressRegion: miami_state,
        postalCode: miami_zip,
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        name: `${brand_name} - Showroom Medellín`,
        streetAddress: medellin_showroom_address,
        addressLocality: "Itagüí, Medellín",
        addressRegion: "Antioquia",
        postalCode: medellin_postal_code || "055413",
        addressCountry: "CO",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: primary_phone,
        email: public_email || undefined,
        contactType: "sales",
        areaServed: countries_served.map((c) => c.code),
        availableLanguage: ["Spanish", "English"],
      },
    ],
    sameAs: Object.values(social || {}).filter(Boolean),
  };

  if (nit && nit.trim() !== "") {
    org.taxID = nit.trim();
  } else if (us_ein && us_ein.trim() !== "") {
    org.taxID = us_ein.trim();
  }

  return org;
}

export default siteSettingsData;
