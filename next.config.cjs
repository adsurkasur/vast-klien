/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true // If you want to use static images from public/
  },
};

module.exports = nextConfig;
