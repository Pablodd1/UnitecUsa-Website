const fs = require('fs');
const path = require('path');

const missingFiles = [
  '14032001.webp','14032002.webp','14032004.webp','14032014.webp','14091101.webp',
  '14141001.webp','14141002.webp','14141003.webp','14123002.webp','14122606.webp',
  '14122607.webp','14123102.webp','14123104.webp','14123105.webp','14123112.webp',
  '14123113.webp','14123114.webp','WPC-PARED-31.webp','14112312.webp'
];

const dir = path.resolve(__dirname, '..', 'public', 'raster', 'products');
const placeholder = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottQAAAABJRU5ErkJggg==','base64');

if (!fs.existsSync(dir)) {
  console.warn('Product images directory not found:', dir);
  process.exit(0);
}

missingFiles.forEach((fname) => {
  const p = path.join(dir, fname);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, placeholder);
    console.log('Created placeholder:', p);
  } else {
    console.log('Already exists:', p);
  }
});
