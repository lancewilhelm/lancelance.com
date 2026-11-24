<script setup lang="ts">
import { useRoute } from "vue-router";
import AppLogo from "@/components/AppLogo.vue";

const route = useRoute();
</script>

<template>
  <header
    class="flex flex-col justify-center items-center row-start-[header-start] col-start-[content-start] col-end-[content-end]"
  >
    <div
      id="logo"
      :class="[route.fullPath !== '/' ? 'w-[150px] sm:w-[300px]' : 'w-[300px]']"
    >
      <RouterLink to="/" aria-label="home">
        <AppLogo />
      </RouterLink>
    </div>
    <nav
      id="links"
      aria-label="Main navigation"
      class="flex gap-[10px] justify-center font-mono text-md w-auto text-(--sub-color)"
    >
      <RouterLink to="/blog" :class="{ 'underline!': route.name === 'blog' }"
        >Blog</RouterLink
      >
      <span>|</span>
      <RouterLink
        to="/projects"
        :class="{ 'underline!': route.name === 'projects' }"
        >Projects</RouterLink
      >
      <span>|</span>
      <RouterLink to="/about" :class="{ 'underline!': route.name === 'about' }"
        >About</RouterLink
      >
    </nav>
  </header>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
