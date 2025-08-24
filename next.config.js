/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // Removed for Next.js 15+
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  // Set metadataBase for social open graph and twitter images
  metadataBase: new URL('http://localhost:3000'),
  // Allow local network origins for development
  allowedDevOrigins: ['http://localhost:3000', 'http://192.168.1.4:3000'],
};

export default nextConfig;
