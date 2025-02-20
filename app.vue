<script setup lang="ts">
useHead({
  title: 'LanceLance',
  meta: [
    { name: 'charset', content: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-title', content: 'LanceLance' },
  ],
  // link: [
  //   { rel: 'icon', id: 'favicon', href: '/favicon.svg' },
  //   { rel: 'icon', href: '/favicon-96x96.png', sizes: '96x96' },
  //   { rel: 'shortcut icon', href: '/favicon.ico' },
  //   { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  //   { rel: 'manifest', href: '/site.webmanifest' },
  // ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* .layout-enter-active, */
/* .layout-leave-active, */
/* .page-enter-active, */
/* .page-leave-active { */
/*   transition: all 200ms; */
/* } */
/**/
/* .layout-enter-from, */
/* .layout-leave-to, */
/* .page-enter-from, */
/* .page-leave-to { */
/*   opacity: 0; */
/* } */

::view-transition-group(*) {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(.08, .34, .15, 1);
}
</style>
