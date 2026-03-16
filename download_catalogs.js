const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

// Convert Google Drive share link to direct download link
function getDirectDownloadLink(shareLink) {
    const match = shareLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
        const fileId = match[1];
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    return null;
}

// Download file with progress
function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        const protocol = url.startsWith('https') ? https : http;

        console.log(`  📥 Downloading: ${path.basename(filepath)}`);

        const request = protocol.get(url, (response) => {
            // Handle redirects (Google Drive often redirects)
            if (response.statusCode === 302 || response.statusCode === 307) {
                const redirectUrl = response.headers.location;
                console.log(`  🔄 Redirecting to: ${redirectUrl.substring(0, 50)}...`);
                return downloadFile(redirectUrl, filepath).then(resolve).catch(reject);
            }

            if (response.statusCode !== 200) {
                fs.unlink(filepath, () => {});
                reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
                return;
            }

            let totalSize = 0;
            let downloadedSize = 0;

            const contentLength = response.headers['content-length'];
            if (contentLength) {
                totalSize = parseInt(contentLength);
            }

            response.pipe(file);

            response.on('data', (chunk) => {
                downloadedSize += chunk.length;
                if (totalSize > 0) {
                    const percent = ((downloadedSize / totalSize) * 100).toFixed(1);
                    process.stdout.write(`\r  📊 ${percent}% downloaded...`);
                }
            });

            file.on('finish', () => {
                file.close(() => {
                    console.log('\r  ✅ Downloaded: ' + path.basename(filepath));
                    resolve(filepath);
                });
            });
        });

        request.on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });

        file.on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

// Parse CSV files
function parseCSV(content) {
    const lines = content.split('\n').filter(l => l.trim());
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length >= 5) {
            const row = {};
            headers.forEach((header, index) => {
                row[header.trim()] = values[index]?.trim() || '';
            });
            data.push(row);
        }
    }
    return data;
}

// Main download function
async function downloadAll() {
    console.log('=== DOWNLOADING CATALOGS AND TECHNICAL SHEETS ===\n');

    // Create download directories
    const catalogsDir = path.join(__dirname, 'downloads', 'catalogs');
    const sheetsDir = path.join(__dirname, 'downloads', 'technical_sheets');

    if (!fs.existsSync(catalogsDir)) fs.mkdirSync(catalogsDir, { recursive: true });
    if (!fs.existsSync(sheetsDir)) fs.mkdirSync(sheetsDir, { recursive: true });

    // Load catalog CSV
    const catalogsCSV = fs.readFileSync('catalog_links.csv', 'utf8');
    const catalogs = parseCSV(catalogsCSV);

    console.log(`📁 Catalogs to download: ${catalogs.length}`);
    console.log('---');

    // Download catalogs
    for (const catalog of catalogs) {
        const directLink = getDirectDownloadLink(catalog.URL);
        if (!directLink) {
            console.log(`  ❌ Invalid link for: ${catalog['RELACION CATALOGOS']}`);
            continue;
        }

        const filename = catalog['RELACION CATALOGOS']
            .replace(/[<>:"/\\|?*]/g, '')
            .replace(/\s+/g, '_') + '.pdf';

        const filepath = path.join(catalogsDir, filename);

        try {
            await downloadFile(directLink, filepath);
        } catch (error) {
            console.log(`  ❌ Failed: ${error.message}`);
        }
    }

    console.log('\n---');
    console.log(`📁 Technical sheets to download: 49`);
    console.log('---');

    // Load technical sheets CSV
    const sheetsCSV = fs.readFileSync('technical_sheets.csv', 'utf8');
    const sheets = parseCSV(sheetsCSV);

    // Download technical sheets
    for (const sheet of sheets) {
        const url = sheet.URL;
        if (!url || url.includes('Producto no ingresado')) continue;

        const directLink = getDirectDownloadLink(url);
        if (!directLink) {
            console.log(`  ❌ Invalid link for: ${sheet['RELACION FICHAS TECNICAS']}`);
            continue;
        }

        const filename = sheet['RELACION FICHAS TECNICAS']
            .replace(/[<>:"/\\|?*]/g, '')
            .replace(/\s+/g, '_') + '.pdf';

        const categoryDir = path.join(sheetsDir, sheet.CATEGORY.replace(/[<>:"/\\|?*]/g, ''));
        if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir, { recursive: true });

        const filepath = path.join(categoryDir, filename);

        try {
            await downloadFile(directLink, filepath);
        } catch (error) {
            console.log(`  ❌ Failed: ${error.message}`);
        }
    }

    console.log('\n=== DOWNLOAD COMPLETE ===');
    console.log(`📁 Catalogs: ${catalogsDir}`);
    console.log(`📁 Technical Sheets: ${sheetsDir}`);
}

// Run
downloadAll().catch(console.error);
