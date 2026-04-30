/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@appletosolutions/reactbits'],

  experimental: {
    imgOptTimeoutInSeconds: 60,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 480],
    minimumCacheTTL: 31536000,
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

module.exports = nextConfig;