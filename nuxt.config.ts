// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/seo'
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ['shiki/onig.wasm'],
      }
    },
  },
  nitro: {
    preset: 'cloudflare-pages-static',
    experimental: {
      wasm: true
    }
  },
  app: {
    head: {
      script: [
        {
          src: '/js/theme-loader.js',
          type: 'text/javascript',
          defer: false
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          id: 'favicon',
          href: '/favicon.svg',
        },
      ]
    },
    // pageTransition: {
    //   name: 'page',
    //   mode: 'out-in',
    // },
    // layoutTransition: {
    //   name: 'layout',
    //   mode: 'out-in'
    // }
  },
  content: {
    build: {
      markdown: {
        remarkPlugins: { 'remark-math': {} },
        rehypePlugins: { 'rehype-katex': {} },
        highlight: {
          theme: 'one-dark-pro',
          langs: [
            'python'
          ]
        }
      }
    }
  },
  experimental: {
    viewTransition: false
  }
})
