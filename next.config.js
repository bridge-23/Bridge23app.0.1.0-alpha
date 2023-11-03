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
    // Overwrite the devtool option for production builds
    if (!dev && !isServer) {
      config.devtool = 'source-map';

      // Here we disable minification for non-development, non-server builds
      config.optimization.minimize = false;
    }

    // You can add more custom Webpack config here if needed

    return config;
  },
});
