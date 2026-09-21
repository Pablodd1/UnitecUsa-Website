/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Trailing slash for SEO
  trailingSlash: true,

  // Compression
  compress: true,

  // Power output for static optimization
  output: 'standalone',

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/favicons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      },
      {
        source: '/index',
        destination: '/',
        permanent: true
      },
      {
        source: '/product',
        destination: '/productos',
        permanent: true
      },
      {
        source: '/collection',
        destination: '/colecciones',
        permanent: true
      },
      {
        source: '/about/:path*',
        destination: '/nosotros/:path*',
        permanent: true
      },
      {
        source: '/historia',
        destination: '/nosotros/historia',
        permanent: true
      },
      {
        source: '/contact',
        destination: '/contacto',
        permanent: true
      },
      {
        source: '/collections/:path*',
        destination: '/colecciones/:path*',
        permanent: true
      },
      {
        source: '/products/:path*',
        destination: '/productos/:path*',
        permanent: true
      },
      {
        source: '/cart',
        destination: '/carrito',
        permanent: true
      },
      {
        source: '/checkout',
        destination: '/pagar',
        permanent: true
      },
      {
        source: '/terms',
        destination: '/terminos',
        permanent: true
      },
      {
        source: '/policies/:path*',
        destination: '/politicas/:path*',
        permanent: true
      },
      {
        source: '/faq',
        destination: '/preguntas-frecuentes',
        permanent: true
      },
      {
        source: '/logistics-lab',
        destination: '/laboratorio-logistico',
        permanent: true
      },
      {
        source: '/container-selection',
        destination: '/seleccion-de-contenedores',
        permanent: true
      }
    ];
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    scrollRestoration: true,
    outputFileTracingExcludes: {
      '*': [
        'public/fichas/**/*',
        'public/videos/**/*',
        'public/media/**/*',
        'public/video/**/*',
        'public/raster/**/*'
      ],
    },
  },

  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize in production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
            },
          },
        },
      };
    }
    return config;
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Turbopack config (for development)
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
};

module.exports = nextConfig;
