const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const path = require('path')

const withOffline = require('next-offline')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* Localhost on development for next/image component */
      images: {
        domains: [
          'localhost',
          '127.0.0.1',
          'res.cloudinary.com',
          'example.com',
          'https://uns-news-api-81d6.onrender.com',
        ],
      },
    }
  }

  return withOffline({
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      domains: ['res.cloudinary.com'],
    },
    async rewrites() {
      return [
        {
          source: '/service-worker.js',
          destination: '/_next/static/service-worker.js',
        },
      ]
    },
  })
}
