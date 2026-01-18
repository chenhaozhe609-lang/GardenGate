/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['zh', 'en'],
        defaultLocale: 'zh',
    },
    images: {
        formats: ['image/webp', 'image/avif'],
    },
    // Optimize for Vercel Edge Network
    experimental: {
        webpackBuildWorker: true,
    },
}

module.exports = nextConfig
