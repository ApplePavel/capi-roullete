/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      runtime: 'experimental-edge',
    },
    reactStrictMode: true,
    images: {
      domains: ['s.gravatar.com', 'lh3.googleusercontent.com'],
    },
  };
  
  module.exports = nextConfig;
  