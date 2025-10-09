<script setup lang="ts">
useSeoMeta({
  title: 'Home',
  ogTitle: 'LanceLance',
  author: 'Lance Wilhelm',
  description: 'A personal blog and project collection for Lance Wilhelm',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  appleMobileWebAppTitle: 'LanceLance',
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
