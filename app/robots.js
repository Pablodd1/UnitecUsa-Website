export default function robots() {
  const baseUrl = 'https://unitecusadesign.com';

  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'Applebot',
        ],
        allow: '/',
        disallow: ['/api/', '/carrito/', '/pagar/', '/admin/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/carrito/', '/pagar/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
