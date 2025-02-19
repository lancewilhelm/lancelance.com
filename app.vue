<script setup lang="ts">
useHead({
  title: 'LanceLance',
  meta: [
    { name: 'charset', content: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-title', content: 'LanceLance' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.svg' },
    { rel: 'icon', href: '/favicon-96x96.png', sizes: '96x96' },
    { rel: 'shortcut icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },

  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped>
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}

/* Enter */
::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in;
}

/* Exit */
::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
}
</style>
