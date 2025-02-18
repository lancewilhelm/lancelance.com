<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <div class="font-mono text-8xl">{{ error?.statusCode }}</div>
    <NuxtLink to="/">home</NuxtLink>
  </div>
</template>
