const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'static_data', 'products_full.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const categories = {};

products.forEach(p => {
    const cat = p.category;
    const sub = p.subcategory;
    const col = p.collection;
    
    if (!categories[cat]) {
        categories[cat] = {
            subcategories: {},
            total: 0
        };
    }
    
    if (!categories[cat].subcategories[sub]) {
        categories[cat].subcategories[sub] = {
            total: 0,
            collections: new Set()
        };
    }
    
    categories[cat].total++;
    categories[cat].subcategories[sub].total++;
    categories[cat].subcategories[sub].collections.add(col);
});

console.log("Found Categories and Subcategories in DB:");
Object.keys(categories).sort().forEach(cat => {
    console.log(`\nCATEGORY: ${cat} (${categories[cat].total} products)`);
    Object.keys(categories[cat].subcategories).sort().forEach(sub => {
        const info = categories[cat].subcategories[sub];
        console.log(`  - Subcategory: ${sub} (${info.total} products) collections: [${Array.from(info.collections).join(', ')}]`);
    });
});
