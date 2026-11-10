const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");

function walkFiles(dir, extList = [".js", ".jsx"]) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
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

const transPath = path.join(rootDir, "utils", "translations.js");
const siteSettings = JSON.parse(
  fs.readFileSync(path.join(rootDir, "static_data", "site_settings.json"), "utf8")
);
let transCode = fs.readFileSync(transPath, "utf8");
transCode = transCode
  .replace(/^import\s+siteSettings\s+from\s+["'][^"']+["'];?/m, "")
  .replace(/export\s+default\s+translations\s*;?/, "module.exports = translations;");

const evalFn = new Function("siteSettings", "module", transCode + "\nreturn module.exports;");
const mod = { exports: {} };
const translations = evalFn(siteSettings, mod);

function resolveKey(lang, key, brand = "unitec") {
  const keys = key.split(".");
  let value = translations[lang];
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if (brand in value) return value[brand];
    if ("unitec" in value) return value.unitec;
  }
  return value;
}

const files = [
  ...walkFiles(path.join(rootDir, "app")),
  ...walkFiles(path.join(rootDir, "components")),
  ...walkFiles(path.join(rootDir, "utils")),
];

const tRegex = /\bt\(\s*["'`]([^"'`$]+)["'`]/g;
const companyRegex = /\bgetCompanyText\(\s*[^,]+,\s*["'`]([^"'`$]+)["'`]/g;

const undefinedKeys = [];

for (const file of files) {
  const rel = path.relative(rootDir, file).replace(/\\/g, "/");
  const content = fs.readFileSync(file, "utf8");
  let m;
  while ((m = tRegex.exec(content)) !== null) {
    const key = m[1];
    const esVal = resolveKey("es", key);
    const enVal = resolveKey("en", key);
    if (esVal === undefined || enVal === undefined) {
      undefinedKeys.push({ file: rel, key, esVal, enVal });
    }
  }
  while ((m = companyRegex.exec(content)) !== null) {
    const key = m[1];
    const esVal = resolveKey("es", `company.unitec.${key}`);
    const enVal = resolveKey("en", `company.unitec.${key}`);
    if (esVal === undefined || enVal === undefined) {
      undefinedKeys.push({ file: rel, key: `company.unitec.${key}`, esVal, enVal });
    }
  }
}

console.log(`Undefined translation keys across entire app: ${undefinedKeys.length}`);
for (const u of undefinedKeys) {
  console.log(` - [${u.file}] "${u.key}" -> ES: ${u.esVal} | EN: ${u.enVal}`);
}

// Find all dynamic t(...) calls (e.g. t(item.key) or t(`...`))
const dynTRegex = /\bt\(\s*([^"'`\s)][^)]*)\)/g;
for (const file of files) {
  const rel = path.relative(rootDir, file).replace(/\\/g, "/");
  const content = fs.readFileSync(file, "utf8");
  let m;
  while ((m = dynTRegex.exec(content)) !== null) {
    console.log(` [Dynamic t()] ${rel}: t(${m[1]})`);
  }
}

// Scan all JSON files in components/ and static_data/ (excluding products_full.json and product_redirects.json) for dotted translation-like keys
const jsonFiles = [
  ...walkFiles(path.join(rootDir, "components"), [".json"]),
  ...walkFiles(path.join(rootDir, "app"), [".json"]),
];
for (const jf of jsonFiles) {
  const rel = path.relative(rootDir, jf).replace(/\\/g, "/");
  const content = fs.readFileSync(jf, "utf8");
  console.log(` [JSON file] ${rel}: ${content.slice(0, 300)}`);
}

// Also check all strings inside translations.js for accidental dots in the middle of words (excluding URLs/emails/S.A.S./C.C./etc.)
function scanStrings(obj, pathPrefix = "") {
  for (const [k, v] of Object.entries(obj || {})) {
    const curPath = pathPrefix ? `${pathPrefix}.${k}` : k;
    if (typeof v === "string") {
      // Find word.word where neither side is www/com/co/S.A.S/C.C./Auto/etc.
      const matches = v.match(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}\.[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}/g);
      if (matches) {
        const filtered = matches.filter(
          (w) =>
            !w.includes("unitecusadesign") &&
            !w.includes("com") &&
            !w.includes("www") &&
            !w.includes("espaciosimportados")
        );
        if (filtered.length > 0) {
          console.log(`   [Dot in word] ${curPath}: ${JSON.stringify(filtered)} in "${v}"`);
        }
      }
    } else if (Array.isArray(v)) {
      v.forEach((item, idx) => {
        if (typeof item === "string") {
          const matches = item.match(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}\.[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}/g);
          if (matches) console.log(`   [Dot in array] ${curPath}[${idx}]: ${JSON.stringify(matches)}`);
        } else if (typeof item === "object") {
          scanStrings(item, `${curPath}[${idx}]`);
        }
      });
    } else if (typeof v === "object" && v !== null) {
      scanStrings(v, curPath);
    }
  }
}

scanStrings(translations);
