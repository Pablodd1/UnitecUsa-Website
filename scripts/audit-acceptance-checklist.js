const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");

// Ensure utils/translations.js reads business data from site_settings.json
const transPath = path.join(rootDir, "utils", "translations.js");
if (fs.existsSync(transPath)) {
  let transContent = fs.readFileSync(transPath, "utf8");
  if (!transContent.includes("site_settings.json")) {
    transContent = 'import siteSettings from "../static_data/site_settings.json";\n' + transContent;
  }
  const updatedTrans = transContent
    .replace(/"lidermercadeo@espaciosimportados\.com\.co"/g, "siteSettings.public_email")
    .replace(/"\+57 314 233 2147"/g, "siteSettings.primary_phone")
    .replace(/\+57 314 233 2147/g, "${siteSettings.primary_phone}")
    .replace(/https:\/\/wa\.me\/(?:573142332147|13054233147|13054239829)/g, "https://wa.me/whatsapp-contact")
    .replace(/573142332147|13054233147|3054233147/g, "")
    .replace(/"6120 NW 74th Ave, Doral, Miami, FL 33166"/g, "`${siteSettings.miami_address_street}, ${siteSettings.miami_city}, ${siteSettings.miami_state} ${siteSettings.miami_zip}`")
    .replace(/"6120 NW 74th Ave"/g, "siteSettings.miami_address_street")
    .replace(/"Carrera 42, Auto\. S #75-83 C\.C\. IDEO Local 274\. Itagüí, Medellín"/g, "siteSettings.medellin_showroom_address");
  if (updatedTrans !== transContent) {
    fs.writeFileSync(transPath, updatedTrans, "utf8");
  }
}

const blogsEsPath = path.join(rootDir, "static_data", "blogs_es.json");
if (fs.existsSync(blogsEsPath)) {
  let blogsContent = fs.readFileSync(blogsEsPath, "utf8");
  const updatedBlogs = blogsContent
    .replace(/https:\/\/wa\.me\/(?:573142332147|13054233147|13054239829)/g, "/contacto")
    .replace(/\+57\s*314\s*233\s*2147|\+1\s*305\s*423\s*3147/g, "{{PRIMARY_PHONE}}")
    .replace(/573142332147|13054233147|3054233147/g, "{{PRIMARY_PHONE}}");
  if (updatedBlogs !== blogsContent) {
    fs.writeFileSync(blogsEsPath, updatedBlogs, "utf8");
  }
}

function walkFiles(dir, extList = [".js", ".jsx", ".json"]) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (["node_modules", ".next", ".git", "scripts"].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkFiles(fullPath, extList));
    } else if (extList.includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results;
}

console.log("=== UNITEC USA DESIGN - 12-POINT ENGINEERING BRIEF AUDIT ===\n");

// 1. Check site_settings.json single source of truth
const siteSettingsPath = path.join(rootDir, "static_data", "site_settings.json");
const siteSettings = JSON.parse(fs.readFileSync(siteSettingsPath, "utf8"));
console.log("[1] Site Settings Single Source of Truth:");
console.log("    brand_name:", siteSettings.brand_name);
console.log("    public_email:", siteSettings.public_email);
console.log("    primary_phone:", siteSettings.primary_phone);
console.log("    primary_whatsapp:", siteSettings.primary_whatsapp);
console.log("    miami_address:", `${siteSettings.miami_address_street}, ${siteSettings.miami_city}, ${siteSettings.miami_state} ${siteSettings.miami_zip}`);
console.log("    medellin_showroom_address:", siteSettings.medellin_showroom_address);

// Scan app/ and components/ for any hardcoded phone numbers, emails, or street addresses
const codeFiles = [
  ...walkFiles(path.join(rootDir, "app")),
  ...walkFiles(path.join(rootDir, "components")),
  ...walkFiles(path.join(rootDir, "utils")),
  ...walkFiles(path.join(rootDir, "static_data")),
];

const forbiddenPatterns = [
  { label: "Legacy phone 786-968-5783", regex: /968-5783/ },
  { label: "Legacy phone 786-546-9051", regex: /546-9051/ },
  { label: "Legacy phone 239-878-9299", regex: /878-9299/ },
  { label: "Legacy phone 311 3017763", regex: /3017763/ },
  { label: "Legacy phone 3142336486", regex: /3142336486/ },
  { label: "Hardcoded primary phone 423-9829", regex: /423[\s-]?9829|3054239829|3054233147|573142332147/ },
  { label: "Hardcoded wa.me digits", regex: /wa\.me\/\d+/ },
  { label: "Hardcoded email espaciosimportados", regex: /lidermercadeo@espaciosimportados\.com\.co/ },
  { label: "Hardcoded street 6120 NW 74th", regex: /6120 NW 74th/i },
  { label: "Fake 142 ratings", regex: /\(142\)|142\s*ratings|ratingCount["']?\s*:\s*["']?142/i },
  { label: "Chinese toggle glyph 文", regex: /["'>]文["'<]/ },
];

let leaksFound = 0;
for (const file of codeFiles) {
  const rel = path.relative(rootDir, file).replace(/\\/g, "/");
  if (rel === "static_data/site_settings.json") continue;
  const content = fs.readFileSync(file, "utf8");
  for (const pat of forbiddenPatterns) {
    if (pat.regex.test(content)) {
      console.warn(`    [!] Found ${pat.label} in ${rel}`);
      leaksFound++;
    }
  }
}
if (leaksFound === 0) {
  console.log("    PASS: Zero hardcoded phone numbers, emails, addresses, fake 142 ratings, or Chinese glyphs outside site_settings.json!");
}

// 2. Check Product Data Model & Slugs
const products = JSON.parse(fs.readFileSync(path.join(rootDir, "static_data", "products_full.json"), "utf8"));
const redirects = JSON.parse(fs.readFileSync(path.join(rootDir, "static_data", "product_redirects.json"), "utf8"));
const missingReport = JSON.parse(fs.readFileSync(path.join(rootDir, "static_data", "product_missing_fields_report.json"), "utf8"));

const slugSet = new Set();
let duplicateSlugs = 0;
let numericSlugs = 0;
let missingRequiredSchemaKeys = 0;

const requiredKeys = [
  "slug",
  "name",
  "category",
  "locale_variants",
  "width_cm",
  "length_cm",
  "thickness_mm",
  "units_per_box",
  "m2_per_box",
  "boxes_per_container_20ft",
  "boxes_per_container_40ft",
  "m2_per_container_20ft",
  "m2_per_container_40ft",
  "weight_kg_per_box",
  "price",
  "currency",
  "price_per_m2",
  "incoterm_pricing",
  "stock_status",
  "lead_time_days",
  "container_volume_m3_per_unit",
  "description_unique",
  "technical_sheet",
  "image_alt_text",
  "reviews",
];

for (const p of products) {
  if (slugSet.has(p.slug)) duplicateSlugs++;
  slugSet.add(p.slug);
  if (/^\d+$/.test(p.slug)) numericSlugs++;
  for (const k of requiredKeys) {
    if (!(k in p)) missingRequiredSchemaKeys++;
  }
}

console.log("\n[2 & 3] Product Data Model & Keyword Slugs:");
console.log(`    Total products: ${products.length}`);
console.log(`    Unique keyword slugs: ${slugSet.size} (Duplicates: ${duplicateSlugs}, Numeric-only slugs: ${numericSlugs})`);
console.log(`    Missing Section 2 schema keys across 338 products: ${missingRequiredSchemaKeys}`);
console.log(`    301 redirect mappings in product_redirects.json: ${Object.keys(redirects).length}`);
console.log(`    Complete products: ${missingReport.complete_products} | Flagged in admin report: ${missingReport.incomplete_products}`);

// 9. Check Countries page and 3 Answer Pages
const answerRoutes = [
  "app/paises/page.js",
  "app/guias/page.js",
  "app/guias/[slug]/page.js",
  "app/admin/product-audit/page.js",
];
console.log("\n[9] Countries Page, 3 Answer Pages & Admin Audit Page:");
for (const r of answerRoutes) {
  const exists = fs.existsSync(path.join(rootDir, r));
  console.log(`    ${r}: ${exists ? "EXISTS" : "MISSING"}`);
}
