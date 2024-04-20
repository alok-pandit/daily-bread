/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    swcMinify: true,
    cpus: 4,
  },
};

export default nextConfig;
