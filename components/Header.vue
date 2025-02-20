<script setup lang="ts">

const props = defineProps<{
  route?: any
}>()
</script>

<template>
  <header>
    <div :class="[route ? 'w-[150px] sm:w-[300px]' : 'w-[300px]']" id="logo">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
    </div>
    <div class="flex gap-[10px] justify-center font-mono" id="links">
      <NuxtLink to="/blog" :class="{ underline: (route?.name === 'blog') }">Blog</NuxtLink>
      <span>|</span>
      <NuxtLink to="/projects" :class="{ underline: (route?.name === 'projects') }">Projects</NuxtLink>
    </div>
  </header>
</template>

<style scoped>
#logo {
  view-transition-name: logo;
}

#links {
  view-transition-name: links;
}
</style>
