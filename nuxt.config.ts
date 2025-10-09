// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  srcDir: "app/",
  ssr: true,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css", "~/assets/css/hljs.css"],
  modules: [
    "@nuxtjs/mdc",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/fonts",
    "@nuxtjs/seo",
    "@nuxt/eslint",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    preset: "cloudflare-pages-static",
  },
  app: {
    head: {
      script: [
        {
          src: "/js/theme-loader.js",
          type: "text/javascript",
          defer: false,
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          id: "favicon",
          href: "/favicon.svg",
        },
      ],
    },
  },
  mdc: {
    components: {
      prose: true,
      map: {
        pre: "ProsePre",
        table: "ProseTable",
      },
    },
    remarkPlugins: {
      "remark-math": {},
    },
    rehypePlugins: {
      "rehype-katex": {},
    },
  },
});
