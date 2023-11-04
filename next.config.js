/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  basePath: "",
  reactStrictMode: true,
  images: {
    domains: ['bridge23.app', 'localhost'],
  },
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      config.devtool = 'source-map';
      config.optimization.minimize = false;
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/.well-known/ii-alternative-origins",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*"
          },
          {
            key: "Content-Type",
            value: "application/json"
          },
        ],
      },
      // ... any other headers you need to set
    ];
  },
});

