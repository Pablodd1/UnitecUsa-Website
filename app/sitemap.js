import products from '../static_data/products_full.json';
import blogs from '../static_data/blogs_es.json';

export default function sitemap() {
  const baseUrl = 'https://unitecusadesign.com';
  const now = new Date();

  const withAlternates = (routePath, priority = 0.8, changeFrequency = 'weekly', lastModified = now) => {
    const clean = routePath.startsWith('/') ? routePath : `/${routePath}`;
    const normalized = clean === '/' ? '/' : `${clean.replace(/\/+$/, '')}/`;
    return {
      url: `${baseUrl}${normalized}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          es: `${baseUrl}/es${normalized}`,
          en: `${baseUrl}/en${normalized}`,
        },
      },
    };
  };

  const coreRoutes = [
    withAlternates('/', 1.0, 'weekly'),
    withAlternates('/paises/', 0.9, 'monthly'),
    withAlternates('/guias/', 0.9, 'weekly'),
    withAlternates('/guias/mejores-proveedores-cielo-raso-pvc-colombia/', 0.9, 'weekly'),
    withAlternates('/guias/panel-wpc-vs-drywall-precio-m2/', 0.9, 'weekly'),
    withAlternates('/guias/como-importar-contenedor-pisos-spc/', 0.9, 'weekly'),
    withAlternates('/blog/', 0.9, 'weekly'),
    withAlternates('/nosotros/', 0.8, 'monthly'),
    withAlternates('/nosotros/historia/', 0.8, 'monthly'),
    withAlternates('/nosotros/who-we-are/', 0.7, 'monthly'),
    withAlternates('/nosotros/mission/', 0.7, 'monthly'),
    withAlternates('/nosotros/vision/', 0.7, 'monthly'),
    withAlternates('/nosotros/quality/', 0.7, 'monthly'),
    withAlternates('/nosotros/business-models/', 0.7, 'monthly'),
    withAlternates('/nosotros/negotiation/', 0.7, 'monthly'),
    withAlternates('/contacto/', 0.8, 'monthly'),
    withAlternates('/laboratorio-logistico/', 0.7, 'monthly'),
    withAlternates('/seleccion-de-contenedores/', 0.7, 'monthly'),
    withAlternates('/politicas/', 0.5, 'yearly'),
    withAlternates('/terminos/', 0.5, 'yearly'),
    withAlternates('/preguntas-frecuentes/', 0.7, 'monthly'),
  ];

  const blogRoutes = blogs.map((blog) =>
    withAlternates(
      `/blog/${blog.slug}/`,
      0.85,
      'weekly',
      blog.dateModified ? new Date(blog.dateModified) : now
    )
  );

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
  ].map((slug) => withAlternates(`/${slug}/`, 0.85, 'weekly'));

  // Only canonical keyword product slugs (numeric URLs are 301-redirected and excluded from sitemap)
  const productRoutes = products.map((product) =>
    withAlternates(`/productos/${product.slug}/`, 0.8, 'weekly')
  );

  return [...coreRoutes, ...blogRoutes, ...collectionRoutes, ...productRoutes];
}
