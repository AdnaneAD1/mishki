import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // B2B utilise SSR (Server-Side Rendering) via getServerSideProps
  // Les pages avec useAuth/useCart nécessitent un serveur
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
