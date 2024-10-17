/**
 * @type {import('next').NextConfig}
 */
const output = process.env.NODE_ENV === 'production' ? 'export' : 'standalone';
const nextConfig = {
  trailingSlash: true,
  distDir: 'build',
  output,
  basePath: '',
  swcMinify: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/web_pages/home',
      },

      {
        source: '/services',
        destination: '/web_pages/services',
      },

      {
        source: '/pricing',
        destination: '/web_pages/pricing',
      },

      {
        source: '/faq',
        destination: '/web_pages/faq',
      },

      {
        source: '/contact',
        destination: '/web_pages/contact',
      },
    ];
  },
};

export default nextConfig;
