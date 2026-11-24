<script setup lang="ts">
import { useSeoMeta } from "@unhead/vue";

useSeoMeta({
  title: "404 - LanceLance",
});
</script>

<template>
  <main
    class="w-screen h-screen flex flex-col justify-center items-center gap-3"
  >
    <h1 class="font-mono text-8xl">404</h1>
    <RouterLink to="/">home</RouterLink>
  </main>
</template>
