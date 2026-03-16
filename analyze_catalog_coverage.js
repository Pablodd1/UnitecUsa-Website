const fs = require('fs');
const path = require('path');

// Load products database
const productsPath = path.join(__dirname, 'static_data', 'products_full.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Load technical sheets CSV
const technicalSheetsPath = path.join(__dirname, 'technical_sheets.csv');
const csvContent = fs.readFileSync(technicalSheetsPath, 'utf8');

// Parse technical sheets
const sheets = [];
const lines = csvContent.split('\n').slice(1); // Skip header
lines.forEach(line => {
    if (line.trim() && line.includes(',')) {
        const parts = line.split(',');
        const url = parts.slice(4).join(',').trim();
        if (url && !url.includes('Producto no ingresado')) {
            sheets.push({
                no: parts[0],
                name: parts[1],
                category: parts[2]?.trim(),
                subcategory: parts[3]?.trim(),
                url: url.replace(/"/g, '')
            });
        }
    }
});

// Get all categories and subcategories from products
const productCategories = {};
products.forEach(p => {
    const cat = p.category || 'UNKNOWN';
    const sub = p.subcategory || 'UNKNOWN';
    if (!productCategories[cat]) productCategories[cat] = new Set();
    productCategories[cat].add(sub);
});

// Convert to arrays for comparison
const productCatArray = Object.keys(productCategories).sort();
const sheetCatArray = [...new Set(sheets.map(s => s.category))].sort();

console.log('=== CATALOG COVERAGE ANALYSIS ===\n');

console.log('📊 Products in Database by Category:');
productCatArray.forEach(cat => {
    const subs = productCategories[cat];
    console.log(`  ${cat}: ${products.filter(p => p.category === cat).length} products, ${subs.size} subcategories`);
});

console.log('\n📁 Technical Sheets by Category:');
const sheetsByCategory = {};
sheets.forEach(s => {
    if (!sheetsByCategory[s.category]) sheetsByCategory[s.category] = [];
    sheetsByCategory[s.category].push(s.subcategory);
});
Object.keys(sheetsByCategory).sort().forEach(cat => {
    const uniqueSubs = [...new Set(sheetsByCategory[cat])];
    console.log(`  ${cat}: ${uniqueSubs.length} subcategories`);
    uniqueSubs.forEach(sub => console.log(`    - ${sub}`));
});

console.log('\n=== COMPARISON ===\n');

// Find categories in DB but not in sheets
console.log('⚠️  CATEGORIES IN DB BUT NOT IN TECHNICAL SHEETS:');
productCatArray.forEach(cat => {
    if (!sheetsByCategory[cat]) {
        const subs = [...productCategories[cat]];
        console.log(`  ${cat}: ${subs.length} subcategories`);
        subs.forEach(sub => console.log(`    - ${sub}`));
    }
});

// Find categories in sheets but not in DB
console.log('\n❌ CATEGORIES IN SHEETS BUT NOT IN DB:');
sheetCatArray.forEach(cat => {
    if (!productCategories[cat]) {
        console.log(`  ${cat}`);
    }
});

// Find subcategory match analysis
console.log('\n=== SUBCATEGORY COVERAGE ===\n');
let totalSubs = 0;
let coveredSubs = 0;
let missingSubs = 0;

productCatArray.forEach(cat => {
    const dbSubs = [...productCategories[cat]];
    const sheetSubs = sheetsByCategory[cat] || [];
    totalSubs += dbSubs.length;

    dbSubs.forEach(sub => {
        if (sheetSubs.includes(sub)) {
            coveredSubs++;
        } else {
            missingSubs++;
        }
    });
});

console.log(`Total subcategories in DB: ${totalSubs}`);
console.log(`Subcategories with technical sheets: ${coveredSubs}`);
console.log(`Subcategories missing technical sheets: ${missingSubs}`);
console.log(`Coverage: ${((coveredSubs / totalSubs) * 100).toFixed(1)}%`);

// Detailed missing subcategories
console.log('\n📋 MISSING TECHNICAL SHEETS BY CATEGORY:');
productCatArray.forEach(cat => {
    const dbSubs = [...productCategories[cat]];
    const sheetSubs = sheetsByCategory[cat] || [];
    const missing = dbSubs.filter(sub => !sheetSubs.includes(sub));

    if (missing.length > 0) {
        console.log(`\n  ${cat}:`);
        missing.forEach(sub => console.log(`    - ${sub}`));
    }
});

// Export results to JSON
const results = {
    summary: {
        totalProducts: products.length,
        totalCategories: productCatArray.length,
        totalSubcategories: totalSubs,
        technicalSheets: sheets.length,
        coveragePercent: ((coveredSubs / totalSubs) * 100).toFixed(1)
    },
    missingByCategory: {}
};

productCatArray.forEach(cat => {
    const dbSubs = [...productCategories[cat]];
    const sheetSubs = sheetsByCategory[cat] || [];
    const missing = dbSubs.filter(sub => !sheetSubs.includes(sub));
    if (missing.length > 0) {
        results.missingByCategory[cat] = missing;
    }
});

fs.writeFileSync('catalog_coverage_report.json', JSON.stringify(results, null, 2));
console.log('\n📄 Report saved to: catalog_coverage_report.json');
