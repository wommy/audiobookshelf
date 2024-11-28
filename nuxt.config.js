import { defineNuxtConfig } from '@nuxt/bridge'
import { version } from './package.json'

const routerBasePath = process.env.ROUTER_BASE_PATH || ''
const serverHostUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3333'
const serverPaths = ['api/', 'public/', 'hls/', 'auth/', 'feed/', 'status', 'login', 'logout', 'init']
const proxy = Object.fromEntries(serverPaths.map((path) => [`${routerBasePath}/${path}`, { target: process.env.NODE_ENV !== 'production' ? serverHostUrl : '/' }]))

export default defineNuxtConfig({
  bridge: {
    // macros: { pageMeta: true },
    // meta: true,
    // typescript: { esbuild: true },
    // vite: true,
  },
  // vite: {},
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',
  dev: process.env.NODE_ENV !== 'production',
  env: {
    serverUrl: serverHostUrl + routerBasePath,
    chromecastReceiver: 'FD1F76C5'
  },
  telemetry: false,

  publicRuntimeConfig: { version, routerBasePath },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Audiobookshelf',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }, { hid: 'robots', name: 'robots', content: 'noindex' }],
    script: [],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: routerBasePath + '/favicon.ico' },
      { rel: 'apple-touch-icon', href: routerBasePath + '/ios_icon.png' }
    ]
  },

  router: {
    base: routerBasePath
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/tailwind.css', '@/assets/app.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/constants.js', '@/plugins/init.client.js', '@/plugins/axios.js', '@/plugins/toast.js', '@/plugins/utils.js', '@/plugins/i18n.js'],

  modules: [
    ['nuxt-socket-io', { sockets: [{ name: 'dev', url: serverHostUrl }, { name: 'prod' }] }],
    ['@nuxtjs/axios', { baseURL: routerBasePath }],
    ['@nuxtjs/proxy', proxy],
    [
      '@nuxtjs/pwa',
      {
        icon: false,
        meta: {
          appleStatusBarStyle: 'black',
          theme_color: '#232323',
          nativeUI: true
        },
        manifest: {
          background_color: '#232323',
          icons: [
            { src: routerBasePath + '/icon.svg', sizes: 'any' },
            { src: routerBasePath + '/icon192.png', type: 'image/png', sizes: 'any' }
          ]
        },
        workbox: { offline: false, cacheAssets: false }
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { transpile: [({ isClient }) => isClient && 'luxon', 'cookie-es'] },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  server: {
    port: process.env.NODE_ENV === 'production' ? 80 : 3000,
    host: '0.0.0.0'
  },

  /**
   * Temporary workaround for @nuxt-community/tailwindcss-module.
   *
   * Reported: 2022-05-23
   * See: [Issue tracker](https://github.com/nuxt-community/tailwindcss-module/issues/480)
   */
  devServerHandlers: [],

  ignore: ['**/*.test.*', '**/*.cy.*']
})
