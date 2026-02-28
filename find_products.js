import fs from 'fs';

const data = JSON.parse(fs.readFileSync('static_data/products_full.json', 'utf8'));

const keywords = ['CINTA', 'PEGANTE', 'PELICULA', 'LISTON', 'PANEL', 'ANGULO', 'WPC', 'INTELIGENTE', 'SMART'];

const found = [];

data.forEach(p => {
    const text = (p.name + ' ' + p.category + ' ' + p.subcategory).toUpperCase();
    if (keywords.some(k => text.includes(k))) {
        found.push({
            name: p.name,
            category: p.category,
            subcategory: p.subcategory,
            collection: p.collection
        });
    }
});

// Print unique category/subcategory/collection combinations for these keywords
const uniqueMaps = new Set();
found.forEach(f => {
    uniqueMaps.add(`${f.collection} | ${f.category} | ${f.subcategory}`);
});

console.log('--- Matching Product Structures ---');
Array.from(uniqueMaps).forEach(m => console.log(m));

// Also find specific examples for "PELICULA" or "SMART" as they seemed missing
console.log('\n--- Specific "PELICULA/SMART" Search ---');
data.forEach(p => {
    const text = (p.name + ' ' + p.category + ' ' + p.subcategory).toUpperCase();
    if (text.includes('PELICULA') || text.includes('SMART') || text.includes('INTELIGENTE')) {
        console.log(`ID: ${p.id} | Name: ${p.name}`);
    }
});
