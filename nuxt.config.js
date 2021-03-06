const pkg = require('./package');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  ssr: false,

  /*
  ** Headers of the page
  */
  head: {
    title: 'Hiking Log',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#80CBC4' },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuetify', ssr: false },
    { src: '~plugins/vee-validate.js', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: '/api',
    credentials: true,
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },

  /*
  ** Proxy configuration
  */
  proxy: {
    // Docs: https://nuxtjs.org/faq/http-proxy/
    '/api': {
      target: isProduction
        ? 'https://hiking-log-api.glitch.me/'
        : 'http://localhost:7777',
      pathRewrite: {
        '^/api': '/api',
      },
    },
  },

  debug: !isProduction,
};
