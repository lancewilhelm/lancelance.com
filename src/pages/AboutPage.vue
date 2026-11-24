<script setup lang="ts">
import { useSeoMeta } from "@unhead/vue";

useSeoMeta({
  title: "About - LanceLance",
  appleMobileWebAppTitle: "About - LanceLance",
});
</script>

<template>
  <div class="flex flex-col grow items-center gap-2 text-center">
    <div>
      Shameless AI optimist. Aspiring amateur athlete. Serial hobbyist.
    </div>
    <a
      href="https://lancewilhelm.com"
      class="font-mono"
      target="_blank"
      rel="noopener noreferrer"
    >
      lancewilhelm.com
    </a>
  </div>
</template>
