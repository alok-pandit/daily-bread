/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
        pathname: "/id/**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    swcMinify: true,
  },
  reactStrictMode: true,
  output: "standalone",
};

export default nextConfig;
