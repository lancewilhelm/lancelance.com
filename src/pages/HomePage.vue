<script setup lang="ts">
import { useSeoMeta } from "@unhead/vue";
import AppHeader from "@/components/AppHeader.vue";

useSeoMeta({
  title: "Home - LanceLance",
  appleMobileWebAppTitle: "LanceLance",
});
</script>

<template>
  <AppHeader />
</template>
