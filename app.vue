<script setup lang="ts">
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
