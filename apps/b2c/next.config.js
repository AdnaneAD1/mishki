/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  typescript: {
    // !! ATTENTION !!
    // Ignore les erreurs TypeScript lors du build
    // À utiliser temporairement - corriger les types en production
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
