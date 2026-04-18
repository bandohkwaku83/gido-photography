import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@appletosolutions/reactbits'],
  turbopack: {
    root: '/Users/mbp/gido-photography',
  },
  // Allow cross-origin requests from network IPs during development
  allowedDevOrigins: ['10.198.219.176'],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'gidophotography-images.s3.us-east-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
