const fs = require('fs');
const csv = fs.readFileSync('ALL products data base JASMEL.xlsx - Sheet1.csv', 'utf-8');
const lines = csv.split('\n');

// Parse CSV (naively, handling quotes)
function parseLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '\"') {
            inQuotes = !inQuotes;
        } else if (line[i] === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += line[i];
        }
    }
    result.push(current);
    return result;
}

const headers = parseLine(lines[1].trim());
const dataMap = {};

for (let i = 2; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const row = parseLine(lines[i].trim());
    if (row.length >= 9) {
        const refCode = row[0];
        let pesoRaw = row[8] || '';
        pesoRaw = pesoRaw.replace(/,/g, '.');
        const peso = parseFloat(pesoRaw);
        if (!isNaN(peso)) {
            dataMap[refCode] = peso;
        }
    }
}

const dbPath = 'static_data/products_full.json';
const dbStr = fs.readFileSync(dbPath, 'utf-8');
const products = JSON.parse(dbStr);
let updatedCount = 0;

products.forEach(p => {
    if (dataMap[p.id]) {
        const pesoSqm = dataMap[p.id];
        let areaSqm = 0;
        if (p.dimensions && p.dimensions.metric) {
            const w = p.dimensions.metric.width || 0;
            const l = p.dimensions.metric.length || 0;
            // Assumes width and length are in cm
            if (p.dimensions.metric.widthUnit === 'cm' && p.dimensions.metric.lengthUnit === 'cm') {
                areaSqm = (w / 100) * (l / 100);
            }
        }
        p.weightPerSqm = pesoSqm;
        if (areaSqm > 0) {
            p.weight = parseFloat((pesoSqm * areaSqm).toFixed(3)); // Weight per unit in kg
        }
        updatedCount++;
    }
});

fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));
console.log('Successfully updated ' + updatedCount + ' products with weight information.');
