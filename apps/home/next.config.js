const withMDX = require('@next/mdx')()

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    return config
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'app.baraa',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'builder.baraa.app',
      },
      {
        protocol: 'https',
        hostname: 'baraa.app',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/users/assets/:version/:fileName',
        destination:
          'https://res.cloudinary.com/dy9mp2tho/image/upload/:version/baraa-webbuilder/:fileName',
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/app',
        permanent: false,
      },
    ]
  },
})
