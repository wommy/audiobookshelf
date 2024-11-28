import { defineNuxtConfig } from '@nuxt/bridge'
import { version } from './package.json'

const { NODE_ENV, ROUTER_BASE_PATH: baseURL = '' } = process.env
const dev = NODE_ENV !== 'production'
const serverUrl = dev ? 'http://localhost:3333' : ''
const serverPaths = ['api/', 'public/', 'hls/', 'auth/', 'feed/', 'status', 'login', 'logout', 'init']
const proxy = Object.fromEntries(serverPaths.map((path) => [`${baseURL}/${path}`, { target: dev ? serverUrl : '/' }]))

export default defineNuxtConfig({
  bridge: {
    // macros: { pageMeta: true },
    // meta: true,
    // typescript: { esbuild: true },
    // vite: true,
  },
  // vite: {},
  app: { baseURL },
  build: { transpile: [({ isClient }) => isClient && 'luxon', 'cookie-es'] },
  css: ['@/assets/tailwind.css', '@/assets/app.css'],
  dev,
  devServer: { host: '0.0.0.0' },
  // devServerHandlers: [],
  env: {
    serverUrl: serverUrl + baseURL,
    chromecastReceiver: 'FD1F76C5'
  },
  head: {
    title: 'Audiobookshelf',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: '' },
      { hid: 'robots', name: 'robots', content: 'noindex' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: baseURL + '/favicon.ico' },
      { rel: 'apple-touch-icon', href: baseURL + '/ios_icon.png' }
    ],
    htmlAttrs: { lang: 'en' }
  },
  ignore: ['**/*.{test,cy}.*'],

  modules: [
    ['nuxt-socket-io', { sockets: [{ name: 'dev', url: serverUrl }, { name: 'prod' }] }],
    ['@nuxtjs/axios', { baseURL }],
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
            { src: baseURL + '/icon.svg', sizes: 'any' },
            { src: baseURL + '/icon192.png', type: 'image/png', sizes: 'any' }
          ]
        },
        workbox: { offline: false, cacheAssets: false }
      }
    ]
  ],

  publicRuntimeConfig: { version, baseURL },
  ssr: false,
  // target: 'static',
  telemetry: false
})
