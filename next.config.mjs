/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
      },
    ],
  },
  rewrites() {
    return [
      {
        source: "/images/:size/:filename",
        destination: "https://image.tmdb.org/t/p/*",
      },
    ];
  },
};

export default nextConfig;
