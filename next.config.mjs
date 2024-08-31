/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com'], // TODO: github dummy image test를 위한 config로 기능 구현 후 제거 필요
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudfront.net' },
      { protocol: 'http', hostname: '**.cloudfront.net' },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['appleid.apple.com'],
    },
  },
};

export default nextConfig;
