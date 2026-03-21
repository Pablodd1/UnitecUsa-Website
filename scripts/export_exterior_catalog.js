const fs = require('fs')
const path = require('path')

function loadData() {
  const p = path.resolve(__dirname, '..', 'static_data', 'products_full.json')
  if (!fs.existsSync(p)) return []
  const raw = fs.readFileSync(p, 'utf8')
  try {
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch (e) {
    console.error('invalid JSON in products_full.json')
    return []
  }
}

function main() {
  const exteriorCategories = [
    'CUBIERTAS UPVC','JARDINES ARTIFICIALES','PAREDES','LISTONES','PANELES WPC Y ANGULOS','PISOS'
  ]
  const data = loadData()
  const exterior = data.filter((p) => exteriorCategories.includes(p.category))
  const exportItems = exterior.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    image: p.image,
    collection: p.collection,
    description: p.description,
    basePrice: p.basePrice,
    url: `/products/${p.id}`
  }))

  const outPath = path.resolve(__dirname, '..', 'data', 'mega_menu_exterior.json')
  // ensure directory exists
  const dir = path.dirname(outPath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify(exportItems, null, 2))
  console.log(`Exported exterior catalog to ${outPath} with ${exportItems.length} items`)
}

main()
