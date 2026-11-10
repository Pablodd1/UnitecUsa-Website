const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const transPath = path.join(rootDir, "utils", "translations.js");
const siteSettings = JSON.parse(
  fs.readFileSync(path.join(rootDir, "static_data", "site_settings.json"), "utf8")
);

let transCode = fs.readFileSync(transPath, "utf8");
const cleanCode = transCode
  .replace(/^import\s+siteSettings\s+from\s+["'][^"']+["'];?/m, "")
  .replace(/export\s+default\s+translations\s*;?/, "module.exports = translations;");

const evalFn = new Function("siteSettings", "module", cleanCode + "\nreturn module.exports;");
const mod = { exports: {} };
const translations = evalFn(siteSettings, mod);

// 1. Complete EN contact object (preserving existing keys and adding all form/info/faqPreview keys)
translations.en.contact = {
  ...translations.en.contact,
  badge: "B2B & Container Logistics Desk",
  title: "Let's Move Your Project at Scale",
  subtitle:
    "Request a direct factory container quote (20ft GP / 40ft HQ) or connect with our Miami and Medellín showrooms.",
  form: {
    title: "Request a Quote or Technical Consultation",
    subtitle:
      "Provide your project or volume details below. Our commercial engineering team responds within 24 business hours.",
    success:
      "Thank you for contacting us. We have received your inquiry and a commercial advisor will reach out to you shortly.",
    fullName: "Full Name",
    companyName: "Company Name",
    email: "Business Email",
    phone: "Phone / WhatsApp",
    volume: "Estimated Order Volume",
    details: "Project & Material Details",
    submit: "Send Inquiry",
    placeholders: {
      name: "John Doe",
      company: "Your Company LLC",
      email: "name@company.com",
      phone: "+1 (305) 000-0000",
      details:
        "Specify product lines (PVC ceilings, WPC wall panels, SPC flooring, UV marble sheets), destination port/city, and estimated m²...",
    },
    volumeOptions: {
      select: "Select estimated volume...",
      c20: "1x 20ft GP Container (~28–33 m³)",
      c40: "1x 40ft HQ Container (~68–76 m³)",
      multiple: "Multiple Containers (B2B Distribution)",
      unsure: "Local Showroom Order / Need Volume Advisory",
    },
  },
  info: {
    title: "Direct Contact Information",
    subtitle:
      "Connect directly with our international trade desk in Miami or our architectural showroom in Medellín.",
    phone: {
      title: "Phone & Commercial Line",
      hours: "Monday – Friday, 8:00 AM – 6:00 PM EST",
    },
    email: {
      title: "Corporate Email",
      note: "For B2B quotes, container packing lists, and technical datasheets",
    },
    hours: {
      title: "Business Hours",
      weekdays: "Monday – Friday: 8:00 AM – 6:00 PM",
      saturday: "Saturday: 9:00 AM – 2:00 PM (Showroom)",
      sunday: "Sunday: Closed",
    },
    fastTrack: {
      title: "Need Immediate Container Pricing?",
      desc: "Speak directly with our commercial engineering team to calculate box and m² consolidation for your destination port.",
      action: "Call Commercial Desk",
    },
  },
  faqPreview: {
    title: "Frequently Asked Questions About Container Imports",
    desc: "Learn about FOB and CIF Incoterms, container capacities, lead times, and product warranties.",
    button: "View All FAQs",
  },
};

// 2. Complete ES contact object
translations.es.contact = {
  ...translations.es.contact,
  badge: "Mesa Comercial B2B y Logística por Contenedor",
  title: "Cotice Su Proyecto o Contenedor Directo",
  subtitle:
    "Solicite cotización por contenedor (20ft GP / 40ft HQ) bajo Incoterms FOB o CIF, o comuníquese con nuestras sedes en Miami y Medellín.",
  form: {
    title: "Solicitar Cotización o Asesoría Técnica",
    subtitle:
      "Complete los datos de su empresa o proyecto. Nuestro equipo de ingeniería comercial responde en menos de 24 horas hábiles.",
    success:
      "Gracias por contactarnos. Hemos recibido su información correctamente y uno de nuestros asesores se comunicará con usted muy pronto.",
    fullName: "Nombre Completo",
    companyName: "Empresa / Constructora",
    email: "Correo Electrónico Corporativo",
    phone: "Teléfono / WhatsApp",
    volume: "Volumen Estimado de Compra",
    details: "Detalles del Proyecto y Materiales",
    submit: "Enviar Solicitud",
    placeholders: {
      name: "Juan Pérez",
      company: "Constructora o Distribuidora S.A.S.",
      email: "contacto@empresa.com",
      phone: "+57 300 000 0000",
      details:
        "Indique las líneas de interés (cielo raso PVC, paneles WPC, pisos SPC, láminas mármol UV), ciudad/puerto de destino y m² estimados...",
    },
    volumeOptions: {
      select: "Seleccione el volumen estimado...",
      c20: "1 Contenedor de 20 pies GP (~28–33 m³)",
      c40: "1 Contenedor de 40 pies HQ (~68–76 m³)",
      multiple: "Múltiples Contenedores (Distribución Mayorista)",
      unsure: "Despacho Local / Requiere Asesoría de Cubicaje",
    },
  },
  info: {
    title: "Información de Contacto Directo",
    subtitle:
      "Comuníquese directamente con nuestra sede en Estados Unidos (Doral, Miami) o nuestro showroom en Medellín (C.C. IDEO Itagüí).",
    phone: {
      title: "Línea Telefónica y Comercial",
      hours: "Lunes a Viernes, 8:00 AM – 6:00 PM",
    },
    email: {
      title: "Correo Corporativo",
      note: "Cotizaciones B2B, fichas técnicas y órdenes de contenedor",
    },
    hours: {
      title: "Horario de Atención",
      weekdays: "Lunes a Viernes: 8:00 AM – 6:00 PM",
      saturday: "Sábados: 9:00 AM – 2:00 PM (Showroom)",
      sunday: "Domingos y Festivos: Cerrado",
    },
    fastTrack: {
      title: "¿Necesita Cotización Inmediata por Contenedor?",
      desc: "Hable directamente con nuestro equipo comercial para calcular cajas, m² y cubicaje según su puerto o ciudad de destino.",
      action: "Llamar a Mesa Comercial",
    },
  },
  faqPreview: {
    title: "¿Tiene preguntas sobre importación, medidas o garantías?",
    desc: "Consulte nuestra guía de preguntas frecuentes sobre términos FOB/CIF, capacidades de contenedor y especificaciones técnicas.",
    button: "Ver Preguntas Frecuentes",
  },
};

// 3. Complete EN & ES footer keys
translations.en.footer = {
  ...translations.en.footer,
  followUs: "Follow Us",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  contact: {
    ...translations.en.footer.contact,
    phone: "Phone & WhatsApp",
    email: "Corporate Email",
  },
};

translations.es.footer = {
  ...translations.es.footer,
  followUs: "Síguenos",
  privacy: "Política de Privacidad",
  terms: "Términos y Condiciones",
  contact: {
    ...translations.es.footer.contact,
    phone: "Teléfono y WhatsApp",
    email: "Correo Electrónico",
  },
};

// 4. Complete company.unitec.description and company.binw.description in EN & ES
const descEn =
  "Direct container import (20ft GP & 40ft HQ) and wholesale distribution of PVC ceilings, WPC wall panels, SPC flooring, and architectural finishes across the United States and Latin America.";
const descEs =
  "Importación directa por contenedor (20ft GP y 40ft HQ) y distribución mayorista de cielo raso PVC, paneles WPC, pisos SPC y acabados arquitectónicos en Estados Unidos, Colombia y Latinoamérica.";

translations.en.company.unitec.description = descEn;
translations.en.company.binw.description = descEn;
translations.es.company.unitec.description = descEs;
translations.es.company.binw.description = descEs;

// 5. Complete EN cta.btnSecondary
translations.en.cta = {
  ...translations.en.cta,
  btnSecondary: "QUOTE EASILY VIA WHATSAPP",
};

// 6. Add top-level quality and whoWeAre in ES (matching EN structure)
translations.es.quality = translations.es.company.unitec.quality;
translations.es.whoWeAre = {
  ...translations.es.company.unitec.whoWeAre,
  company: siteSettings.brand_name,
  tagline: '"¡Diseñamos el futuro!"',
};

// Serialize back to utils/translations.js cleanly while preserving siteSettings references
let jsonStr = JSON.stringify(translations, null, 4);
// Replace literal phone/email/address values with siteSettings references so single-source-of-truth audit passes 100%
jsonStr = jsonStr
  .replace(new RegExp(JSON.stringify(siteSettings.public_email), "g"), "siteSettings.public_email")
  .replace(new RegExp(JSON.stringify(siteSettings.primary_phone), "g"), "siteSettings.primary_phone")
  .replace(new RegExp(JSON.stringify(siteSettings.miami_address_street), "g"), "siteSettings.miami_address_street")
  .replace(new RegExp(JSON.stringify(siteSettings.medellin_showroom_address), "g"), "siteSettings.medellin_showroom_address");

const finalOutput = `import siteSettings from "../static_data/site_settings.json";\nconst translations = ${jsonStr};\n\nexport default translations;\n`;
fs.writeFileSync(transPath, finalOutput, "utf8");
console.log("Successfully updated utils/translations.js!");
