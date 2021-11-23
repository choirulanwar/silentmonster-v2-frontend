const path = require('path')

module.exports = {
  reactStrictMode: true,
  env: {
    TAILWIND_MODE: process.env.TAILWIND_MODE,
    API_URL: process.env.API_URL
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles', 'sidebar')]
  }
}
