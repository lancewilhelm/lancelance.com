<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHead, useSeoMeta } from "@unhead/vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import BlogLayout from "@/layouts/BlogLayout.vue";

const SITE_URL = "https://lancelance.com";
const route = useRoute();

const canonicalUrl = computed(() => new URL(route.path, SITE_URL).href);

useSeoMeta({
  title: "Home",
  ogTitle: "LanceLance",
  author: "Lance Wilhelm",
  description: "A personal blog and project collection for Lance Wilhelm",
  appleMobileWebAppTitle: "LanceLance",
  ogUrl: () => canonicalUrl.value,
});

useHead({
  link: [
    {
      rel: "canonical",
      href: () => canonicalUrl.value,
    },
  ],
  meta: [
    {
      name: "twitter:url",
      content: () => canonicalUrl.value,
    },
  ],
});

const layoutComponent = computed(() => {
  if (route.meta.layout === "none") return null;
  return route.meta.layout === "blog" ? BlogLayout : DefaultLayout;
});
</script>

<template>
  <component :is="layoutComponent" v-if="layoutComponent">
    <RouterView />
  </component>
  <RouterView v-else />
</template>

<style>
::view-transition-group(*) {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.08, 0.34, 0.15, 1);
}
</style>
