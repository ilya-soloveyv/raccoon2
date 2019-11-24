module.exports = {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#000' },
  server: {
    host: 'localhost',
    port: 3000
  },
  css: [],
  plugins: [],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt'
  ],
  proxy: {
    '/api': 'http://localhost:3000'
  },
  axios: {
    baseURL: 'http://localhost:3000',
    credentials: true
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { propertyName: 'token.accessToken' }
        }
      }
    }
  },
  build: {
    extend(config, ctx) {}
  }
}
