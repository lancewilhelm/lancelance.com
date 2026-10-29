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
    "@nuxt/fonts",
    "@nuxtjs/seo",
    "@nuxt/eslint",
  ],
  icon: {
    clientBundle: { icons: ["lucide:link", "lucide:thumbs-up"] },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: {
    url: "https://lancelance.com",
    name: "lancelance.com",
  },
  aiReady: false,
  skewProtection: false,
  ogImage: { enabled: false },
  sitemap: {
    zeroRuntime: true,
  },
  nitro: {
    preset: "cloudflare-pages-static",
    prerender: {
      routes: ["/robots.txt", "/sitemap.xml"],
    },
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
          rel: "stylesheet",
          id: "currentTheme",
          tagPriority: 40,
          href: "/css/themes/paper.css",
        },
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
        h2: "ProseH2",
        h3: "ProseH3",
        h4: "ProseH4",
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
