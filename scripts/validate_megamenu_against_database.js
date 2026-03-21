// Validate that MegaMenu categories have products in static data
const fs = require('fs')
const path = require('path')

function loadData() {
  const p = path.resolve(__dirname, '..', 'static_data', 'products_full.json')
  if (!fs.existsSync(p)) {
    console.error('data file not found', p)
    return []
  }
  const raw = fs.readFileSync(p, 'utf8')
  try {
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch (e) {
    console.error('invalid JSON in products_full.json')
    return []
  }
}

function countByCategory(data) {
  const map = {}
  data.forEach((r) => {
    const c = r.category
    if (!c) return
    map[c] = (map[c] || 0) + 1
  })
  return map
}

function main() {
  const data = loadData()
  const counts = countByCategory(data)
  const interiorCats = [
    'CIELO RASO PVC','ILUMINACION','JARDINES ARTIFICIALES','LAMINAS','LISTONES','PANELES WPC Y ANGULOS','PAREDES','CINTAS','PEGANTES','PISOS','ZOCALOS','PAREDES'
  ]
  const exteriorCats = [
    'CUBIERTAS UPVC','JARDINES ARTIFICIALES','PAREDES','LISTONES','PANELES WPC Y ANGULOS','PISOS'
  ]

  console.log('MegaMenu: interior category counts from DB:')
  interiorCats.forEach((c) => {
    console.log(`  ${c}: ${counts[c] || 0}`)
  })
  console.log('\nMegaMenu: exterior category counts from DB:')
  exteriorCats.forEach((c) => {
    console.log(`  ${c}: ${counts[c] || 0}`)
  })
}

main()
