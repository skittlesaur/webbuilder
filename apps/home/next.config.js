module.exports = {
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
}
