import fs from 'fs';

const data = JSON.parse(fs.readFileSync('static_data/products_full.json', 'utf8'));

const categories = new Set();
const subcategories = new Set();
const collections = new Set();

data.forEach(p => {
    categories.add(p.category);
    subcategories.add(p.subcategory);
    collections.add(p.collection);
});

console.log('--- Collections ---');
Array.from(collections).forEach(c => console.log(c));
console.log('--- Categories ---');
Array.from(categories).forEach(c => console.log(c));
console.log('--- Subcategories ---');
Array.from(subcategories).forEach(s => console.log(s));
