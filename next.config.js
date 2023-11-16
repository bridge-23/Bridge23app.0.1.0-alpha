const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  basePath: "",
  reactStrictMode: true,
  //output: "export",
  images: {
    domains: ['bridge23.app', 'localhost'],
    unoptimized: true,
  },
});

module.exports = nextConfig;
