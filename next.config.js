/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['imgs.xkcd.com']
  },
  i18n: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en'
  }
}

module.exports = nextConfig
