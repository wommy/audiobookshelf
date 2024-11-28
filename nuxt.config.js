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
  app: { baseURL: routerBasePath },
  build: { transpile: [({ isClient }) => isClient && 'luxon', 'cookie-es'] },
  css: ['@/assets/tailwind.css', '@/assets/app.css'],
  dev: process.env.NODE_ENV !== 'production',
  devServer: { host: '0.0.0.0' },
  // devServerHandlers: [],
  env: {
    serverUrl: serverHostUrl + routerBasePath,
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
      { rel: 'icon', type: 'image/x-icon', href: routerBasePath + '/favicon.ico' },
      { rel: 'apple-touch-icon', href: routerBasePath + '/ios_icon.png' }
    ],
    htmlAttrs: { lang: 'en' }
  },
  ignore: ['**/*.{test,cy}.*'],

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

  publicRuntimeConfig: { version, routerBasePath },
  ssr: false,
  // target: 'static',
  telemetry: false
})
