import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - preman',
    title: 'preman',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['plugins/firebase/config.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],
  pwa: {
    manifest: {
      name: 'マンガ管理-PreMan-',
      short_name: 'PreMan',
      description: '漫画を愛する人のための、マンガ巻数管理アプリです',
      start_url: '/',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#121212',
      theme_color: '#121212',
      icons: [
        {
          src: '/android-chrome-36x36.png',
          sizes: '36x36',
          type: 'image/png',
        },
        {
          src: '/android-chrome-48x48.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: '/android-chrome-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: '/android-chrome-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: '/android-chrome-128x128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: '/android-chrome-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },

        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },

        {
          src: '/android-chrome-72x72.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: '/apple-touch-icon-120x120.png',
          sizes: '120x120',
          type: 'image/png',
        },
        {
          src: '/apple-touch-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '/apple-touch-icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
        },
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    icon: false,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    buildDir: 'dist',
    extend(config) {
      config.performance.maxAssetSize = 3000000
      config.performance.maxEntrypointSize = 3000000
    },
  },
}
