<script setup lang="ts">

const props = defineProps<{
  route?: any
}>()
</script>

<template>
  <header>
    <div :class="['sm:w-[300px]', route ? 'max-w-[150px]' : '']" id="logo">
      <NuxtLink to="/"><img class="w-full" src="assets/lancelancelogo.svg" alt="LanceLance logo"></NuxtLink>
    </div>
    <div class="flex gap-[10px] justify-center font-mono" id="links">
      <NuxtLink to="/blog" :class="{ underline: (route?.name === 'blog') }">Blog</NuxtLink>
      <span>|</span>
      <NuxtLink to="/projects" :class="{ underline: (route?.name === 'projects') }">Projects</NuxtLink>
    </div>
  </header>
</template>

<style scoped>
header {
  view-transition-name: header;
}
</style>
