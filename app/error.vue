<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const statusCode = computed(() => props.error.statusCode ?? 500);
</script>

<template>
  <main
    class="w-screen h-screen flex flex-col justify-center items-center gap-3"
  >
    <h1 class="font-mono text-8xl">{{ statusCode }}</h1>
    <template v-if="statusCode >= 500">
      <p>This page could not be loaded.</p>
      <button
        type="button"
        class="cursor-pointer underline"
        @click="reloadNuxtApp({ force: true })"
      >
        Try again
      </button>
    </template>
    <NuxtLink to="/">home</NuxtLink>
  </main>
</template>
