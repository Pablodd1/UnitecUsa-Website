const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const { URL } = require('url');

// Convert Google Drive share link to direct download link
function getDirectDownloadLink(shareLink) {
    const match = shareLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
        const fileId = match[1];
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    return null;
}

// Download file with Google Drive confirmation handling
function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        console.log(`  📥 Downloading: ${path.basename(filepath)}`);

        const downloadWithConfirm = (currentUrl, redirectCount = 0) => {
            if (redirectCount > 5) {
                reject(new Error('Too many redirects'));
                return;
            }

            const request = protocol.get(currentUrl, (response) => {
                const statusCode = response.statusCode;

                // Handle redirects
                if (statusCode === 302 || statusCode === 307 || statusCode === 303) {
                    const redirectUrl = response.headers.location;
                    if (redirectUrl) {
                        console.log(`  🔄 Redirect (${redirectCount + 1})...`);
                        setTimeout(() => downloadWithConfirm(redirectUrl, redirectCount + 1), 100);
                        return;
                    }
                }

                // Handle confirmation page (Google Drive large file warning)
                if (statusCode === 200) {
                    const contentType = response.headers['content-type'] || '';

                    // If it's HTML, it might be a confirmation page
                    if (contentType.includes('text/html')) {
                        let body = '';
                        response.on('data', chunk => body += chunk);
                        response.on('end', () => {
                            // Check for confirmation form
                            const confirmMatch = body.match(/name="confirm" value="([^"]+)"/);
                            if (confirmMatch) {
                                const confirmValue = confirmMatch[1];
                                const parsedUrl = new URL(currentUrl);
                                parsedUrl.searchParams.set('confirm', confirmValue);
                                console.log(`  🔄 Confirming download...`);
                                setTimeout(() => downloadWithConfirm(parsedUrl.toString(), redirectCount + 1), 100);
                            } else {
                                reject(new Error('Could not confirm download'));
                            }
                        });
                        return;
                    }
                }

                // Success - start writing file
                if (statusCode === 200) {
                    const file = fs.createWriteStream(filepath);
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
                            console.log('\r  ✅ Downloaded: ' + path.basename(filepath) + ' '.repeat(50));
                            resolve(filepath);
                        });
                    });

                    file.on('error', (err) => {
                        fs.unlink(filepath, () => {});
                        reject(err);
                    });
                } else {
                    reject(new Error(`HTTP ${statusCode}`));
                }
            });

            request.on('error', (err) => {
                reject(err);
            });
        };

        downloadWithConfirm(url);
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

// Sanitize filename
function sanitizeFilename(name) {
    return name.replace(/[<>:"/\\|?*]/g, '')
               .replace(/\s+/g, '_')
               .substring(0, 100);
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

        const filename = sanitizeFilename(catalog['RELACION CATALOGOS']) + '.pdf';
        const filepath = path.join(catalogsDir, filename);

        try {
            await downloadFile(directLink, filepath);
        } catch (error) {
            console.log(`\r  ❌ Failed: ${error.message}`);
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

        const filename = sanitizeFilename(sheet['RELACION FICHAS TECNICAS']) + '.pdf';
        const categoryDir = path.join(sheetsDir, sanitizeFilename(sheet.CATEGORY));
        if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir, { recursive: true });

        const filepath = path.join(categoryDir, filename);

        try {
            await downloadFile(directLink, filepath);
        } catch (error) {
            console.log(`\r  ❌ Failed: ${error.message}`);
        }
    }

    console.log('\n=== DOWNLOAD COMPLETE ===');
    console.log(`📁 Catalogs: ${catalogsDir}`);
    console.log(`📁 Technical Sheets: ${sheetsDir}`);
}

// Run
downloadAll().catch(console.error);
