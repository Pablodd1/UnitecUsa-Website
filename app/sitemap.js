import products from '../static_data/products_full.json';

export default function sitemap() {
  const baseUrl = 'https://unitecusadesign.com';
  const now = new Date();

  const coreRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nosotros/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nosotros/historia/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nosotros/who-we-are/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nosotros/mission/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nosotros/vision/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nosotros/quality/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nosotros/business-models/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nosotros/negotiation/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/laboratorio-logistico/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/seleccion-de-contenedores/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/politicas/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terminos/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/preguntas-frecuentes/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const collectionRoutes = [
    'colecciones',
    'colecciones/exterior',
    'colecciones/interior',
    'colecciones/fachadas',
    'colecciones/fachada-deck',
    'colecciones/fachada-exterior-pvc',
    'colecciones/pisos',
    'colecciones/pisos-deck',
    'colecciones/paneles-wpc',
    'colecciones/paneles-wpc-exterior',
    'colecciones/listones-wpc-exterior',
    'colecciones/paredes',
    'colecciones/paredes-uniflex',
    'colecciones/jardines-artificiales',
    'colecciones/laminas',
    'colecciones/cubiertas-upvc',
    'colecciones/cintas',
    'colecciones/pegantes',
    'colecciones/polifachada',
    'colecciones/sales',
    'colecciones/zocalos',
  ].map((slug) => ({
    url: `${baseUrl}/${slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/productos/${product.id}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...coreRoutes, ...collectionRoutes, ...productRoutes];
}
