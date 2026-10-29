const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../static_data/products_full.json');
const redirectsPath = path.join(__dirname, '../static_data/product_redirects.json');
const auditReportPath = path.join(__dirname, '../static_data/product_missing_fields_report.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// 1. Typo & whitespace normalization for product names
const NAME_TYPO_FIXES = {
  'PANEL ACRILICO MARMOL VENENCIANO (ZS3D065 Y)': 'PANEL ACRILICO MARMOL VENECIANO (ZS3D065 Y)',
  'PARED UNIFLEX ANTRANCITA': 'PARED UNIFLEX ANTRACITA',
  'PANEL WPC interior Golden Brillo (08)': 'PANEL WPC INTERIOR GOLDEN BRILLO (08)',
  'PANEL WPC interior anoloc Brillo (09)': 'PANEL WPC INTERIOR ANOLOC BRILLO (09)',
};

function cleanProductName(rawName) {
  if (!rawName) return '';
  let cleaned = rawName.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim();
  if (NAME_TYPO_FIXES[cleaned]) {
    cleaned = NAME_TYPO_FIXES[cleaned];
  } else if (NAME_TYPO_FIXES[rawName]) {
    cleaned = NAME_TYPO_FIXES[rawName];
  }
  return cleaned;
}

// 2. ASCII slug generator from Spanish name and category
function toSlugBase(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/ñ/gi, 'n')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

// Subcategory translations & engineering profiles (factual, non-invented)
const SUBCATEGORY_INFO = {
  'ROLLOS ADHESIVOS DE MARMOL': {
    es_type: 'Rollo autoadhesivo decorativo con acabado tipo mármol',
    en_type: 'Self-adhesive decorative marble-finish wall roll',
    es_app: 'revestimiento rápido de muros interiores residenciales y comerciales sin obras húmedas',
    en_app: 'fast interior residential and commercial wall renovation without wet trade work',
    cat_en: 'WALLS',
    sub_en: 'ADHESIVE MARBLE ROLLS',
  },
  'CUBIERTA ACANALADA UPVC BLANCA 11.80': {
    es_type: 'Cubierta termoacústica acanalada en UPVC de gran formato',
    en_type: 'Large-format corrugated UPVC thermoacoustic roofing sheet',
    es_app: 'techos industriales, bodegas y cubiertas arquitectónicas de alta exigencia climática',
    en_app: 'industrial roofs, warehouses, and high-performance architectural roofing',
    cat_en: 'UPVC ROOFING',
    sub_en: 'CORRUGATED UPVC ROOFING 11.80M',
  },
  'CUBIERTA ONDULADA ROMA': {
    es_type: 'Cubierta ondulada perfil Roma en UPVC para exteriores',
    en_type: 'Roma-profile corrugated UPVC exterior roofing sheet',
    es_app: 'cubiertas residenciales, comerciales e industriales con aislamiento termoacústico',
    en_app: 'residential, commercial, and industrial roofing requiring thermal and acoustic insulation',
    cat_en: 'UPVC ROOFING',
    sub_en: 'ROMA CORRUGATED UPVC ROOFING',
  },
  'CUBIERTA TERMOACUSTICA UPVC 2.0mm BLANCA ONDA BAJA': {
    es_type: 'Cubierta termoacústica UPVC de onda baja (espesor 2.0 mm)',
    en_type: 'Low-wave 2.0 mm UPVC thermoacoustic roofing sheet',
    es_app: 'proyectos de techado estructural ligero con control térmico y resistencia a la corrosión',
    en_app: 'lightweight structural roofing projects requiring thermal control and corrosion resistance',
    cat_en: 'UPVC ROOFING',
    sub_en: '2.0MM LOW-WAVE UPVC ROOFING',
  },
  'CUBIERTA TERMOACUSTICA UPVC 2.5mm BLANCA ONDA ALTA': {
    es_type: 'Cubierta termoacústica UPVC de onda alta (espesor 2.5 mm)',
    en_type: 'High-wave 2.5 mm UPVC thermoacoustic roofing sheet',
    es_app: 'cubiertas de gran evacuación pluvial en naves industriales, bodegas y comercios',
    en_app: 'high-drainage industrial warehouses, commercial roofs, and structural canopies',
    cat_en: 'UPVC ROOFING',
    sub_en: '2.5MM HIGH-WAVE UPVC ROOFING',
  },
  'TEJA UPVC TIPO ZINC': {
    es_type: 'Teja en UPVC perfil tipo zinc anticorrosiva',
    en_type: 'Anti-corrosive zinc-profile UPVC roofing sheet',
    es_app: 'reemplazo duradero de láminas metálicas tradicionales sin oxidación ni condensación',
    en_app: 'durable, rust-free replacement for traditional metal roofing sheets',
    cat_en: 'UPVC ROOFING',
    sub_en: 'ZINC-TYPE UPVC ROOFING',
  },
  'FACHADA EXTERIOR PVC': {
    es_type: 'Revestimiento arquitectónico de fachada exterior en PVC',
    en_type: 'Exterior architectural PVC facade cladding panel',
    es_app: 'fachadas ventiladas y muros exteriores expuestos a radiación solar y humedad',
    en_app: 'ventilated facades and exterior walls exposed to UV radiation and moisture',
    cat_en: 'WALLS & FACADES',
    sub_en: 'EXTERIOR PVC FACADE',
  },
  'FACHADA DECK': {
    es_type: 'Panel coextruido tipo Deck para fachada exterior',
    en_type: 'Co-extruded exterior deck-style facade cladding',
    es_app: 'envolventes arquitectónicas exteriores con textura maderada y cero mantenimiento',
    en_app: 'exterior architectural envelopes with wood-grain aesthetics and zero maintenance',
    cat_en: 'WALLS & FACADES',
    sub_en: 'DECK FACADE CLADDING',
  },
  'FOAM BOARD': {
    es_type: 'Lámina arquitectónica de Foam Board rígido de formato completo',
    en_type: 'Full-format rigid architectural Foam Board sheet',
    es_app: 'revestimiento continuo de muros interiores, mobiliario comercial y paneles decorativos',
    en_app: 'seamless interior wall cladding, commercial millwork, and decorative paneling',
    cat_en: 'SHEETS & BOARDS',
    sub_en: 'ARCHITECTURAL FOAM BOARD',
  },
  'JARDINES EXTERIOR': {
    es_type: 'Módulo de follaje sintético para jardín vertical exterior con filtro UV',
    en_type: 'UV-stabilized exterior artificial vertical garden foliage module',
    es_app: 'muros verdes exteriores, fachadas comerciales y terrazas sin necesidad de riego',
    en_app: 'exterior green walls, commercial facades, and terraces with zero irrigation',
    cat_en: 'ARTIFICIAL GARDENS',
    sub_en: 'EXTERIOR VERTICAL GARDENS',
  },
  'JARDINES INTERIOR': {
    es_type: 'Módulo de jardín vertical sintético decorativo para interiores',
    en_type: 'Decorative interior artificial vertical garden panel',
    es_app: 'ambientación biofílica en recepciones, oficinas, restaurantes y espacios residenciales',
    en_app: 'biophilic design in lobbies, offices, restaurants, and residential interiors',
    cat_en: 'ARTIFICIAL GARDENS',
    sub_en: 'INTERIOR VERTICAL GARDENS',
  },
  'JARDINES MOSS': {
    es_type: 'Panel tapiz de musgo sintético texturizado (Moss)',
    en_type: 'Textured artificial moss wall panel',
    es_app: 'muros de acento interior y diseño corporativo de apariencia botánica natural',
    en_app: 'interior accent walls and corporate environments requiring natural botanical texture',
    cat_en: 'ARTIFICIAL GARDENS',
    sub_en: 'ARTIFICIAL MOSS PANELS',
  },
  'LAMINAS MARMOL PVC': {
    es_type: 'Lámina de mármol PVC de alto brillo con recubrimiento UV',
    en_type: 'High-gloss UV-coated PVC marble wall sheet',
    es_app: 'revestimiento impermeable de paredes en baños, cocinas, lobbies, recepciones y locales comerciales',
    en_app: 'waterproof wall cladding in bathrooms, kitchens, hotel lobbies, receptions, and retail spaces',
    cat_en: 'SHEETS & BOARDS',
    sub_en: 'PVC MARBLE SHEETS',
  },
  'LAMINAS SINTETICAS': {
    es_type: 'Lámina arquitectónica sintética de gran espesor (6 mm)',
    en_type: 'Heavy-duty 6 mm synthetic architectural wall sheet',
    es_app: 'revestimientos murales de alta resistencia al impacto en proyectos comerciales y residenciales',
    en_app: 'high-impact interior wall surfaces in commercial and residential projects',
    cat_en: 'SHEETS & BOARDS',
    sub_en: 'SYNTHETIC ARCHITECTURAL SHEETS',
  },
  'PANELES ACOLCHADOS': {
    es_type: 'Panel mural acolchado 3D de confort acústico y decorativo',
    en_type: '3D padded acoustic and decorative wall panel',
    es_app: 'cabeceros, salas de cine en casa, estudios, hoteles y muros de diseño interior',
    en_app: 'headboards, home theaters, studios, hospitality suites, and interior feature walls',
    cat_en: 'WALLS',
    sub_en: 'PADDED 3D WALL PANELS',
  },
  'PANELES ACRILICOS MARMOL': {
    es_type: 'Panel acrílico traslúcido/brillante con diseño tipo mármol y ónix',
    en_type: 'High-clarity acrylic marble and onyx architectural panel',
    es_app: 'muros retroiluminados, barras, recepciones de lujo y revestimientos interiores de alto impacto',
    en_app: 'backlit feature walls, bars, luxury receptions, and high-impact interior cladding',
    cat_en: 'WALLS',
    sub_en: 'ACRYLIC MARBLE PANELS',
  },
  'PANELES ACUSTICOS': {
    es_type: 'Panel acústico alistonado sobre base fonoabsorbente',
    en_type: 'Slatted acoustic wall panel with sound-absorbing backing',
    es_app: 'control de reverberación y diseño arquitectónico en oficinas, salas de juntas, auditorios y hogares',
    en_app: 'reverberation control and architectural styling in offices, boardrooms, auditoriums, and homes',
    cat_en: 'WALLS',
    sub_en: 'ACOUSTIC SLAT PANELS',
  },
  'PANEL PS': {
    es_type: 'Panel arquitectónico de poliestireno (PS) de alta densidad para interiores',
    en_type: 'High-density polystyrene (PS) interior architectural wall panel',
    es_app: 'revestimiento decorativo ultraligero resistente a la humedad en muros y muebles interiores',
    en_app: 'ultralight moisture-resistant decorative cladding for interior walls and millwork',
    cat_en: 'WALLS',
    sub_en: 'PS ARCHITECTURAL PANELS',
  },
  'PANELES WPC INTERIOR': {
    es_type: 'Panel acanalado WPC (Wood Plastic Composite) para diseño interior',
    en_type: 'Fluted WPC (Wood Plastic Composite) interior wall panel',
    es_app: 'revestimiento de muros y techos interiores con ensamble oculto, resistencia al agua y estética arquitectónica',
    en_app: 'interior wall and ceiling cladding featuring concealed clip assembly, water resistance, and architectural relief',
    cat_en: 'WPC PANELS & ANGLES',
    sub_en: 'INTERIOR WPC WALL PANELS',
  },
  'PANELES WPC EXTERIOR': {
    es_type: 'Panel WPC coextruido para fachadas y revestimientos exteriores',
    en_type: 'Co-extruded exterior WPC facade and wall panel',
    es_app: 'fachadas exteriores, balcones y volúmenes arquitectónicos expuestos a sol, lluvia y humedad',
    en_app: 'exterior facades, balconies, and architectural volumes exposed to sun, rain, and humidity',
    cat_en: 'WPC PANELS & ANGLES',
    sub_en: 'EXTERIOR WPC PANELS',
  },
  'PANELES WPC REDONDOS': {
    es_type: 'Panel WPC de perfil curvo/redondo (Media Caña) para interiores',
    en_type: 'Half-round fluted WPC interior architectural wall panel',
    es_app: 'muros curvos, columnas, recepciones y paredes de acento con relieve orgánico continuo',
    en_app: 'curved surfaces, columns, reception desks, and accent walls with continuous organic relief',
    cat_en: 'WPC PANELS & ANGLES',
    sub_en: 'ROUND-PROFILE WPC PANELS',
  },
  'PAREDES ACOLCHADAS': {
    es_type: 'Revestimiento mural acolchado de formato vertical continuo',
    en_type: 'Full-height vertical padded architectural wall covering',
    es_app: 'acabados residenciales y hoteleros con textura tridimensional y absorción acústica suave',
    en_app: 'residential and hospitality interiors requiring 3D texture and soft acoustic absorption',
    cat_en: 'WALLS',
    sub_en: 'PADDED WALL COVERINGS',
  },
  'PAREDES PU ARQUNITEC': {
    es_type: 'Panel arquitectónico de poliuretano (PU) de textura pétrea',
    en_type: 'Stone-texture polyurethane (PU) architectural wall panel',
    es_app: 'muros interiores y fachadas cubiertas que buscan apariencia de piedra natural con peso ultraligero',
    en_app: 'interior walls and covered facades seeking natural stone aesthetics with ultralight weight',
    cat_en: 'WALLS',
    sub_en: 'PU ARQUNITEC STONE PANELS',
  },
  'PAREDES MUROFLEX': {
    es_type: 'Lámina flexible Muroflex para recubrimiento arquitectónico continuo',
    en_type: 'Flexible Muroflex architectural wall cladding sheet',
    es_app: 'superficies planas o curvas en remodelaciones rápidas sin demolición',
    en_app: 'flat or curved surfaces in rapid commercial and residential renovations without demolition',
    cat_en: 'WALLS',
    sub_en: 'MUROFLEX FLEXIBLE WALLS',
  },
  'PAREDES UNIFLEX': {
    es_type: 'Revestimiento mural flexible Uniflex de bajo espesor',
    en_type: 'Thin-profile Uniflex flexible architectural wall covering',
    es_app: 'renovación limpia de muros interiores, columnas y superficies arquitectónicas',
    en_app: 'clean renovation of interior walls, columns, and architectural surfaces',
    cat_en: 'WALLS',
    sub_en: 'UNIFLEX WALL PANELS',
  },
  'PISOS DECK': {
    es_type: 'Piso Deck WPC para exteriores resistente a intemperie y humedad',
    en_type: 'Weather-resistant exterior WPC composite decking board',
    es_app: 'terrazas, zonas húmedas de piscina, balcones, senderos y áreas sociales al aire libre',
    en_app: 'terraces, pool decks, balconies, walkways, and outdoor hospitality areas',
    cat_en: 'FLOORING',
    sub_en: 'EXTERIOR WPC DECKING',
  },
  'PISOS SPC': {
    es_type: 'Piso SPC (Stone Plastic Composite) con sistema click y base IXPE integrada',
    en_type: 'Rigid-core click-lock SPC (Stone Plastic Composite) flooring plank with IXPE pad',
    es_app: 'pisos interiores 100 % impermeables de alto tráfico residencial, comercial y hotelero',
    en_app: '100% waterproof high-traffic residential, commercial, and hospitality interior flooring',
    cat_en: 'FLOORING',
    sub_en: 'SPC CLICK FLOORING',
  },
  'POLIFACHADA': {
    es_type: 'Panel de Polifachada con aislamiento y acabado arquitectónico exterior',
    en_type: 'Insulated exterior Polifachada architectural cladding panel',
    es_app: 'cerramientos exteriores, fachadas comerciales y proyectos modulares de rápida ejecución',
    en_app: 'exterior building envelopes, commercial facades, and fast-track modular construction',
    cat_en: 'WALLS & FACADES',
    sub_en: 'POLIFACHADA EXTERIOR CLADDING',
  },
  'LAMINAS PVC BOARD': {
    es_type: 'Tablero rígido de PVC espumado (PVC Board) impermeable',
    en_type: 'Waterproof rigid PVC foam board sheet',
    es_app: 'carpintería arquitectónica resistente al agua, mobiliario de baño/cocina, señalética y recubrimientos',
    en_app: 'waterproof architectural millwork, bathroom/kitchen cabinetry, signage, and wall lining',
    cat_en: 'SHEETS & BOARDS',
    sub_en: 'RIGID PVC FOAM BOARDS',
  },
  'TEJA PVC TERRACOTA COLONIAL': {
    es_type: 'Teja colonial en PVC acabado terracota con protección UV',
    en_type: 'UV-protected terracotta-finish colonial PVC roofing sheet',
    es_app: 'techos residenciales y campestres con estética colonial tradicional y ligereza estructural',
    en_app: 'residential and resort roofing combining traditional colonial aesthetics with structural lightness',
    cat_en: 'UPVC ROOFING',
    sub_en: 'COLONIAL TERRACOTTA PVC ROOFING',
  },
  'ZOCALOS SPC': {
    es_type: 'Zócalo arquitectónico en SPC impermeable para remate de pisos',
    en_type: 'Waterproof SPC architectural baseboard trim',
    es_app: 'transición y remate perimetral entre muros y pisos SPC o laminados',
    en_app: 'perimeter finishing transition between interior walls and SPC or laminate flooring',
    cat_en: 'BASEBOARDS & TRIMS',
    sub_en: 'SPC BASEBOARDS',
  },
  'CIELO RASO PVC': {
    es_type: 'Lámina / Cornisa de PVC para sistemas de cielo raso interior',
    en_type: 'Interior PVC ceiling panel and perimeter cornice profile',
    es_app: 'techos falsos impermeables, higiénicos y libres de mantenimiento en viviendas, oficinas y locales',
    en_app: 'waterproof, hygienic, maintenance-free suspended ceilings in homes, offices, and retail spaces',
    cat_en: 'PVC CEILINGS',
    sub_en: 'PVC CEILING PANELS & CORNICES',
  },
  'CINTA ADHESIVA DE PAPEL': {
    es_type: 'Cinta decorativa autoadhesiva para acabados y dilataciones interiores',
    en_type: 'Self-adhesive decorative accent tape for interior trims and joints',
    es_app: 'remates lineales decorativos en muros, paneles y mobiliario interior',
    en_app: 'linear decorative accents on interior walls, panels, and millwork',
    cat_en: 'TAPES & ACCESSORIES',
    sub_en: 'DECORATIVE ADHESIVE TAPES',
  },
  'CINTA ADHESIVA METALICA': {
    es_type: 'Perfil en cinta adhesiva metálica para juntas y detalles arquitectónicos',
    en_type: 'Metallic-finish self-adhesive trim tape for architectural joints and accents',
    es_app: 'transiciones brillantes entre láminas tipo mármol, paneles WPC y muros decorativos',
    en_app: 'sleek metallic transitions between PVC marble sheets, WPC panels, and feature walls',
    cat_en: 'TAPES & ACCESSORIES',
    sub_en: 'METALLIC ADHESIVE TAPES',
  },
  'CUBIERTA TRASLUCIDA ONDA ALTA OPAL': {
    es_type: 'Cubierta traslúcida opal de onda alta para iluminación cenital',
    en_type: 'Opal high-wave translucent skylight roofing sheet',
    es_app: 'paso de luz natural difusa en bodegas, cubiertas industriales y áreas cubiertas',
    en_app: 'diffused natural daylighting in warehouses, industrial roofs, and covered walkways',
    cat_en: 'UPVC ROOFING',
    sub_en: 'TRANSLUCENT HIGH-WAVE ROOFING',
  },
  'ILUMINACION': {
    es_type: 'Componente de iluminación arquitectónica LED para integración en paneles',
    en_type: 'Architectural LED lighting profile and power component for panel integration',
    es_app: 'iluminación lineal indirecta integrada en paneles WPC, cielo raso y muros decorativos',
    en_app: 'recessed linear accent lighting integrated into WPC panels, ceilings, and feature walls',
    cat_en: 'LIGHTING',
    sub_en: 'LED ARCHITECTURAL LIGHTING',
  },
  'LAMINA ALVEOLAR POLICARBONATO': {
    es_type: 'Lámina alveolar de policarbonato con filtro UV para cubiertas traslúcidas',
    en_type: 'UV-protected multiwall polycarbonate sheet for translucent roofing',
    es_app: 'pérgolas, marquesinas, domos y cerramientos arquitectónicos con transmisión controlada de luz',
    en_app: 'pergolas, canopies, skylights, and architectural enclosures requiring light transmission',
    cat_en: 'UPVC ROOFING',
    sub_en: 'MULTIWALL POLYCARBONATE SHEETS',
  },
  'LISTONES PVC CIELO RASO': {
    es_type: 'Listón decorativo de PVC para cielo raso y diseño interior',
    en_type: 'Decorative PVC ceiling baffle and interior slat profile',
    es_app: 'cielos rasos alistonados y detalles arquitectónicos suspendidos con apariencia de madera',
    en_app: 'slatted suspended ceilings and wood-look interior architectural accents',
    cat_en: 'ARCHITECTURAL SLATS',
    sub_en: 'PVC CEILING SLATS',
  },
  'LISTONES PVC INTERIOR ESTRUCTURAL': {
    es_type: 'Listón tubular de PVC interior para divisiones y acentos arquitectónicos',
    en_type: 'Tubular interior PVC architectural slat for partitions and feature walls',
    es_app: 'celosías divisorias de ambientes, pérgolas interiores y revestimientos verticales',
    en_app: 'room-dividing screens, interior pergolas, and vertical architectural cladding',
    cat_en: 'ARCHITECTURAL SLATS',
    sub_en: 'INTERIOR STRUCTURAL PVC SLATS',
  },
  'LISTONES WPC EXTERIOR': {
    es_type: 'Listón tubular WPC para fachadas, pérgolas y celosías exteriores',
    en_type: 'Tubular exterior WPC louver and architectural slat',
    es_app: 'quiebrasoles, pérgolas, cerramientos ventilados y fachadas arquitectónicas al aire libre',
    en_app: 'sunscreens, pergolas, ventilated enclosures, and outdoor architectural facades',
    cat_en: 'ARCHITECTURAL SLATS',
    sub_en: 'EXTERIOR WPC SLATS',
  },
  'PEGANTES': {
    es_type: 'Adhesivo de montaje multipropósito Pegatec para paneles y revestimientos',
    en_type: 'Pegatec multipurpose structural mounting adhesive for panels and cladding',
    es_app: 'fijación directa de paneles WPC, láminas de mármol PVC, zócalos y perfiles sin perforación',
    en_app: 'direct bonding of WPC panels, PVC marble sheets, baseboards, and trims without drilling',
    cat_en: 'ADHESIVES',
    sub_en: 'STRUCTURAL MOUNTING ADHESIVES',
  },
};

function translateProductNameToEnglish(esName) {
  let en = esName
    .replace(/^ADHESIVO DE PARED EN ROLLO /i, 'Self-Adhesive Wall Roll - ')
    .replace(/^CUBIERTA ACANALADA UPVC /i, 'Corrugated UPVC Roofing Sheet - ')
    .replace(/^CUBIERTA ONDULADA /i, 'Corrugated UPVC Roof - ')
    .replace(/^CUBIERTA TERMOACUSTICA UPVC /i, 'Thermoacoustic UPVC Roofing - ')
    .replace(/^CUBIERTA TIPO ZINC UPVC /i, 'Zinc-Profile UPVC Roofing - ')
    .replace(/^CUBIERTA TRASLUCIDA /i, 'Translucent Roofing Sheet - ')
    .replace(/^FACHADA DECK /i, 'Exterior Deck Facade Panel - ')
    .replace(/^FACHADA EN PVC /i, 'Exterior PVC Facade - ')
    .replace(/^FACHADA PVC /i, 'Exterior PVC Facade - ')
    .replace(/^FACHADA /i, 'Exterior Facade Panel - ')
    .replace(/^FOAM BOARD /i, 'Architectural Foam Board - ')
    .replace(/^JARDIN ARTIFICIAL EXTERIOR /i, 'Exterior Artificial Vertical Garden - ')
    .replace(/^JARDIN ARTIFICIAL INTERIOR /i, 'Interior Artificial Vertical Garden - ')
    .replace(/^JARDIN ARTIFICIAL /i, 'Artificial Vertical Garden - ')
    .replace(/^LAMINA MARMOL /i, 'PVC Marble Wall Sheet - ')
    .replace(/^LAMINA SINTETICA /i, 'Synthetic Architectural Sheet - ')
    .replace(/^LAMINA ALVEOLAR POLICARBONATO /i, 'Multiwall Polycarbonate Sheet - ')
    .replace(/^LAMINA PVC /i, 'PVC Ceiling Panel - ')
    .replace(/^CORNISA PVC /i, 'PVC Ceiling Cornice Trim - ')
    .replace(/^PANEL ACOLCHADO /i, '3D Padded Wall Panel - ')
    .replace(/^PANEL ACRILICO MARMOL /i, 'Acrylic Marble Panel - ')
    .replace(/^PANEL ACUSTICO /i, 'Acoustic Slat Wall Panel - ')
    .replace(/^PANEL PS /i, 'PS Architectural Wall Panel - ')
    .replace(/^PANEL WPC EXT /i, 'Exterior WPC Wall Panel - ')
    .replace(/^PANEL WPC REDONDO /i, 'Round-Profile WPC Wall Panel - ')
    .replace(/^PANEL WPC /i, 'Interior WPC Wall Panel - ')
    .replace(/^PARED ACOLCHADA /i, 'Padded Architectural Wall Panel - ')
    .replace(/^PARED ARQUNITEC /i, 'PU Arqunitec Stone Wall Panel - ')
    .replace(/^PARED MUROFLEX /i, 'Muroflex Flexible Wall Sheet - ')
    .replace(/^PARED UNIFLEX /i, 'Uniflex Flexible Wall Panel - ')
    .replace(/^PARED WPC/i, 'WPC Wall Panel ')
    .replace(/^PISO DECK EXTERIOR /i, 'Exterior WPC Decking Board - ')
    .replace(/^PISO DECK /i, 'WPC Decking Board - ')
    .replace(/^PISO SPC /i, 'SPC Click Flooring Plank - ')
    .replace(/^POLIFACHADA /i, 'Polifachada Exterior Panel - ')
    .replace(/^TEJA PVC /i, 'Colonial PVC Roof Tile - ')
    .replace(/^ZOCALO SPC /i, 'SPC Flooring Baseboard - ')
    .replace(/^CINTA ADHESIVA DE PAPEL /i, 'Decorative Paper Adhesive Tape - ')
    .replace(/^CINTA ADHESIVA METALICA /i, 'Metallic Trim Adhesive Tape - ')
    .replace(/^PERFIL LED /i, 'Architectural LED Profile ')
    .replace(/^TRANSFORMADOR CINTA LED/i, 'LED Strip Power Transformer')
    .replace(/^CONTROL CINTA LED/i, 'LED Strip Controller')
    .replace(/^LISTON PVC CIELO RASO /i, 'PVC Ceiling Baffle Slat - ')
    .replace(/^LISTON PVC INTERIOR ESTRUCTURAL /i, 'Structural Interior PVC Slat - ')
    .replace(/^LISTON WPC EXTERIOR /i, 'Exterior WPC Architectural Slat - ')
    .replace(/^ADHESIVO MIXTO MULTIPROPOSITO /i, 'Multipurpose Mounting Adhesive - ');
  return en;
}

const usedSlugs = new Set();
const redirectMap = {};
const missingFieldsReport = [];

// Usable container volumes (95% packing efficiency factor matching utils/cart/cart.utils.js)
const USABLE_VOL_20FT = 33.0 * 0.95; // 31.35 m3
const USABLE_VOL_40FT = 76.0 * 0.95; // 72.20 m3
const MAX_WEIGHT_KG = 28000;

const migratedProducts = products.map((rawItem) => {
  const idStr = String(rawItem.id);
  const cleanedName = cleanProductName(rawItem.name);
  const category = (rawItem.category || '').trim();
  const subcategory = (rawItem.subcategory || '').trim();
  const collection = (rawItem.collection || 'INTERIOR').trim();

  // Generate unique slug from Spanish product name (which already embeds the product type/category)
  let baseSlug = toSlugBase(cleanedName);
  if (!baseSlug) {
    baseSlug = toSlugBase(`${category}-${idStr}`);
  }
  let slug = baseSlug;
  let counter = 2;
  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  usedSlugs.add(slug);

  // Record redirect from old ID to new keyword slug
  redirectMap[idStr] = slug;

  // Extract metric dimensions
  const metric = rawItem.dimensions?.metric || {};
  const rawWidthCm = typeof metric.width === 'number' && metric.width > 0 ? Number(metric.width) : null;
  const rawLengthCm = typeof metric.length === 'number' && metric.length > 0 ? Number(metric.length) : null;
  const rawThicknessMm = typeof metric.thickness === 'number' && metric.thickness > 0 ? Number(metric.thickness) : null;

  const unitsPerBox = typeof rawItem.itemsPerBox === 'number' && rawItem.itemsPerBox > 0 ? rawItem.itemsPerBox : 1;

  // Compute m2 per unit and m2 per box (width_m * length_m * units_per_box)
  const m2PerUnit = rawWidthCm && rawLengthCm
    ? Number(((rawWidthCm / 100) * (rawLengthCm / 100)).toFixed(4))
    : null;
  const m2PerBox = m2PerUnit
    ? Number((m2PerUnit * unitsPerBox).toFixed(4))
    : null;

  // Compute volume in m3 per unit and per box
  const unitVolumeM3 = rawWidthCm && rawLengthCm && rawThicknessMm
    ? Number(((rawWidthCm / 100) * (rawLengthCm / 100) * (rawThicknessMm / 1000)).toFixed(6))
    : null;
  const boxVolumeM3 = unitVolumeM3
    ? Number((unitVolumeM3 * unitsPerBox).toFixed(6))
    : null;

  // Weight per unit and per box (kg)
  let unitWeightKg = typeof rawItem.weight === 'number' && rawItem.weight > 0 ? Number(rawItem.weight) : null;
  if (!unitWeightKg && rawItem.weightPerSqm && m2PerUnit) {
    unitWeightKg = Number((rawItem.weightPerSqm * m2PerUnit).toFixed(3));
  }
  const weightKgPerBox = unitWeightKg
    ? Number((unitWeightKg * unitsPerBox).toFixed(3))
    : null;

  // Container loading calculations (20ft and 40ft HC)
  let boxesPerContainer20ft = null;
  let boxesPerContainer40ft = null;
  let m2PerContainer20ft = null;
  let m2PerContainer40ft = null;

  if (boxVolumeM3 && boxVolumeM3 > 0) {
    const maxBoxesByVol20 = Math.floor(USABLE_VOL_20FT / boxVolumeM3);
    const maxBoxesByVol40 = Math.floor(USABLE_VOL_40FT / boxVolumeM3);

    const maxBoxesByWeight = weightKgPerBox && weightKgPerBox > 0
      ? Math.floor(MAX_WEIGHT_KG / weightKgPerBox)
      : Infinity;

    boxesPerContainer20ft = Math.max(1, Math.min(maxBoxesByVol20, maxBoxesByWeight));
    boxesPerContainer40ft = Math.max(1, Math.min(maxBoxesByVol40, maxBoxesByWeight));

    if (m2PerBox && m2PerBox > 0) {
      m2PerContainer20ft = Number((boxesPerContainer20ft * m2PerBox).toFixed(2));
      m2PerContainer40ft = Number((boxesPerContainer40ft * m2PerBox).toFixed(2));
    }
  }

  // Price & Currency
  const rawPrice = typeof rawItem.basePrice === 'number' && rawItem.basePrice > 0
    ? Number(rawItem.basePrice.toFixed(2))
    : null;
  const currency = 'USD';
  const pricePerM2 = rawPrice && m2PerUnit && m2PerUnit > 0
    ? Number((rawPrice / m2PerUnit).toFixed(2))
    : null;

  const incotermPricing = {
    fob_price: rawPrice,
    cif_price: null,
    currency: 'USD',
    explanation_es: 'Precio base de referencia en modalidad FOB. Cotización CIF (Costo, Seguro y Flete) calculada según puerto de destino y tipo de contenedor (20ft o 40ft HC).',
    explanation_en: 'Reference base price under FOB terms. CIF (Cost, Insurance, and Freight) pricing is calculated based on destination port and container size (20ft or 40ft HC).',
  };

  const stockStatus = rawPrice ? 'in_stock' : 'out_of_stock';
  const leadTimeDays = { min: 15, max: 30, label_es: '15 a 30 días', label_en: '15 to 30 days' };

  // Build truly unique, spec-driven Spanish and English descriptions (no boilerplate shared paragraph)
  const subInfo = SUBCATEGORY_INFO[subcategory] || {
    es_type: `Elemento constructivo de la línea ${subcategory || category}`,
    en_type: `Architectural building product from the ${subcategory || category} line`,
    es_app: 'aplicaciones arquitectónicas de construcción y remodelación',
    en_app: 'architectural construction and renovation applications',
    cat_en: category,
    sub_en: subcategory,
  };

  const nameEn = translateProductNameToEnglish(cleanedName);
  const collectionEs = collection === 'EXTERIOR' ? 'uso exterior' : 'uso interior';
  const collectionEn = collection === 'EXTERIOR' ? 'exterior applications' : 'interior applications';

  const dimSpecEs = rawWidthCm && rawLengthCm
    ? `formato de ${rawWidthCm} cm de ancho × ${rawLengthCm} cm de largo${rawThicknessMm ? ` con espesor de ${rawThicknessMm} mm` : ''} (${m2PerUnit} m² por unidad)`
    : 'formato estándar de catálogo';
  const dimSpecEn = rawWidthCm && rawLengthCm
    ? `dimensions of ${rawWidthCm} cm width × ${rawLengthCm} cm length${rawThicknessMm ? ` and ${rawThicknessMm} mm thickness` : ''} (${m2PerUnit} m² per unit)`
    : 'standard catalog format';

  const packSpecEs = unitsPerBox > 1
    ? `Se suministra en empaque de ${unitsPerBox} unidades${m2PerBox ? ` que cubren ${m2PerBox} m² por caja/estiba` : ''}${weightKgPerBox ? ` (${weightKgPerBox} kg por empaque)` : ''}.`
    : `Se suministra por unidad individual${m2PerUnit ? ` con cobertura de ${m2PerUnit} m²` : ''}${unitWeightKg ? ` y peso unitario de ${unitWeightKg} kg` : ''}.`;
  const packSpecEn = unitsPerBox > 1
    ? `Supplied in packs of ${unitsPerBox} units${m2PerBox ? ` covering ${m2PerBox} m² per box/pallet` : ''}${weightKgPerBox ? ` (${weightKgPerBox} kg per pack)` : ''}.`
    : `Supplied as an individual unit${m2PerUnit ? ` covering ${m2PerUnit} m²` : ''}${unitWeightKg ? ` with a unit weight of ${unitWeightKg} kg` : ''}.`;

  const containerSpecEs = boxesPerContainer20ft && boxesPerContainer40ft
    ? `Capacidad de consolidación para exportación: hasta ${boxesPerContainer20ft.toLocaleString('en-US')} empaques (${m2PerContainer20ft ? `${m2PerContainer20ft.toLocaleString('en-US')} m²` : ''}) en contenedor de 20 pies y hasta ${boxesPerContainer40ft.toLocaleString('en-US')} empaques (${m2PerContainer40ft ? `${m2PerContainer40ft.toLocaleString('en-US')} m²` : ''}) en contenedor de 40 pies High Cube.`
    : 'Disponible para consolidación en contenedores mixtos de 20 pies y 40 pies High Cube.';
  const containerSpecEn = boxesPerContainer20ft && boxesPerContainer40ft
    ? `Container export loading capacity: up to ${boxesPerContainer20ft.toLocaleString('en-US')} packs (${m2PerContainer20ft ? `${m2PerContainer20ft.toLocaleString('en-US')} m²` : ''}) per 20ft container and up to ${boxesPerContainer40ft.toLocaleString('en-US')} packs (${m2PerContainer40ft ? `${m2PerContainer40ft.toLocaleString('en-US')} m²` : ''}) per 40ft High Cube container.`
    : 'Available for consolidation in mixed 20ft and 40ft High Cube export containers.';

  const descriptionUniqueEs = `${cleanedName} (SKU ${idStr}): ${subInfo.es_type} diseñado para ${subInfo.es_app} (${collectionEs}). Cuenta con ${dimSpecEs}. ${packSpecEs} ${containerSpecEs}`;
  const descriptionUniqueEn = `${nameEn} (SKU ${idStr}): ${subInfo.en_type} engineered for ${subInfo.en_app} (${collectionEn}). Built to ${dimSpecEn}. ${packSpecEn} ${containerSpecEn}`;

  const imageAltEs = `${cleanedName} - ${subInfo.es_type}${rawWidthCm && rawLengthCm ? ` (${rawWidthCm}x${rawLengthCm} cm)` : ''} | UNITEC USA Design`;
  const imageAltEn = `${nameEn} - ${subInfo.en_type}${rawWidthCm && rawLengthCm ? ` (${rawWidthCm}x${rawLengthCm} cm)` : ''} | UNITEC USA Design`;

  // Per-product technical sheet (strictly from this product's verified fields, no fake generic rows)
  const technicalSheet = {
    sku: idStr,
    category_es: category,
    category_en: subInfo.cat_en,
    subcategory_es: subcategory,
    subcategory_en: subInfo.sub_en,
    application_es: collection === 'EXTERIOR' ? 'Exterior' : 'Interior',
    application_en: collection === 'EXTERIOR' ? 'Exterior' : 'Interior',
    width_cm: rawWidthCm,
    length_cm: rawLengthCm,
    thickness_mm: rawThicknessMm,
    units_per_box: unitsPerBox,
    m2_per_unit: m2PerUnit,
    m2_per_box: m2PerBox,
    unit_weight_kg: unitWeightKg,
    weight_kg_per_box: weightKgPerBox,
    container_volume_m3_per_unit: unitVolumeM3,
    box_volume_m3: boxVolumeM3,
    boxes_per_container_20ft: boxesPerContainer20ft,
    m2_per_container_20ft: m2PerContainer20ft,
    boxes_per_container_40ft: boxesPerContainer40ft,
    m2_per_container_40ft: m2PerContainer40ft,
  };

  // Audit missing fields for Admin Report (Section 2 requirement)
  const missingFields = [];
  if (!rawWidthCm) missingFields.push('width_cm');
  if (!rawLengthCm) missingFields.push('length_cm');
  if (!rawThicknessMm) missingFields.push('thickness_mm');
  if (!unitWeightKg) missingFields.push('weight_kg_per_box');
  if (!rawPrice) missingFields.push('price');
  if (!boxesPerContainer20ft) missingFields.push('boxes_per_container_20ft');
  if (!boxesPerContainer40ft) missingFields.push('boxes_per_container_40ft');

  if (missingFields.length > 0) {
    missingFieldsReport.push({
      id: idStr,
      slug,
      name: cleanedName,
      category,
      subcategory,
      missing_fields: missingFields,
      status: 'incomplete_requires_owner_data',
    });
  }

  return {
    ...rawItem,
    id: idStr,
    slug,
    name: cleanedName,
    category,
    subcategory,
    collection,
    width_cm: rawWidthCm,
    length_cm: rawLengthCm,
    thickness_mm: rawThicknessMm,
    units_per_box: unitsPerBox,
    m2_per_unit: m2PerUnit,
    m2_per_box: m2PerBox,
    boxes_per_container_20ft: boxesPerContainer20ft,
    boxes_per_container_40ft: boxesPerContainer40ft,
    m2_per_container_20ft: m2PerContainer20ft,
    m2_per_container_40ft: m2PerContainer40ft,
    weight_kg_per_box: weightKgPerBox,
    price: rawPrice,
    currency,
    price_per_m2: pricePerM2,
    incoterm_pricing: incotermPricing,
    stock_status: stockStatus,
    lead_time_days: leadTimeDays,
    container_volume_m3_per_unit: unitVolumeM3,
    box_volume_m3: boxVolumeM3,
    description: descriptionUniqueEs,
    description_unique: descriptionUniqueEs,
    technical_sheet: technicalSheet,
    image_alt_text: imageAltEs,
    reviews: Array.isArray(rawItem.reviews) ? rawItem.reviews : [],
    is_complete: missingFields.length === 0,
    missing_fields: missingFields,
    locale_variants: {
      es: {
        name: cleanedName,
        category,
        subcategory,
        description_unique: descriptionUniqueEs,
        image_alt_text: imageAltEs,
      },
      en: {
        name: nameEn,
        category: subInfo.cat_en,
        subcategory: subInfo.sub_en,
        description_unique: descriptionUniqueEn,
        image_alt_text: imageAltEn,
      },
    },
  };
});

fs.writeFileSync(productsPath, JSON.stringify(migratedProducts, null, 2), 'utf8');
fs.writeFileSync(redirectsPath, JSON.stringify(redirectMap, null, 2), 'utf8');
fs.writeFileSync(
  auditReportPath,
  JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      total_products: migratedProducts.length,
      complete_products: migratedProducts.length - missingFieldsReport.length,
      incomplete_products_count: missingFieldsReport.length,
      owner_notes: [
        'Do not fill missing fields with placeholder or copied values — supply verified factory specs from [OWNER].',
        'Confirm whether basePrice / price in products_full.json is USD per unit or USD per box/pack for each subcategory.',
      ],
      flagged_products: missingFieldsReport,
    },
    null,
    2
  ),
  'utf8'
);

console.log(`Migrated ${migratedProducts.length} products.`);
console.log(`Unique slugs generated: ${usedSlugs.size}`);
console.log(`Redirects recorded: ${Object.keys(redirectMap).length}`);
console.log(`Flagged incomplete products: ${missingFieldsReport.length}`);
