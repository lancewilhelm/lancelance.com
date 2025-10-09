<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <header
    class='flex flex-col justify-center items-center row-start-[header-start] col-start-[content-start] col-end-[content-end]'>
    <div :class="[route.fullPath !== '/' ? 'w-[150px] sm:w-[300px]' : 'w-[300px]']" id="logo">
      <NuxtLink to="/" aria-label="home">
        <Logo />
      </NuxtLink>
    </div>
    <div class="flex gap-[10px] justify-center font-mono text-md w-auto text-(--sub-color)" id="links">
      <NuxtLink to="/blog" :class="{ 'underline!': (route?.name === 'blog') }">Blog</NuxtLink>
      <span>|</span>
      <NuxtLink to="/projects" :class="{ 'underline!': (route?.name === 'projects') }">Projects</NuxtLink>
    </div>
  </header>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
