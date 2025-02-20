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
    '@vueuse/nuxt'
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      script: [
        {
          innerHTML: `
            (function() {
              try {
                const config = JSON.parse(localStorage.getItem('config') || '{}');
                const theme = config.theme || 'monochrome';

                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.id = 'currentTheme';
                link.href = '/css/themes/' + theme + '.css';
                document.head.appendChild(link);
              } catch (e) {
                console.error('Theme loading error:', e);
              }
            })();
          `,
          type: 'text/javascript'
        }
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },
  experimental: {
    viewTransition: true
  }
})
