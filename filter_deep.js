import fs from 'fs';

const data = JSON.parse(fs.readFileSync('static_data/products_full.json', 'utf8'));

const results = data.filter(p => {
    const text = (p.name + ' ' + p.category + ' ' + p.subcategory).toUpperCase();
    return text.includes('LISTON') ||
        text.includes('PANEL') ||
        text.includes('ANGULO') ||
        text.includes('WPC') ||
        text.includes('SMART') ||
        text.includes('CINTA') ||
        text.includes('PEGANTE');
});

console.log(JSON.stringify(results.map(r => ({
    name: r.name,
    category: r.category,
    subcategory: r.subcategory,
    collection: r.collection
})).slice(0, 50), null, 2));
