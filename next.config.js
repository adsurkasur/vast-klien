/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // Removed for Next.js 15+
  images: {
    unoptimized: true // If you want to use static images from public/
  },
};

export default nextConfig;
