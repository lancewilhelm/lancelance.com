<script setup lang="ts">
useSeoMeta({
    title: "About - LanceLance",
    appleMobileWebAppTitle: "About - LanceLance",
});
definePageMeta({
    layout: "blog",
});
</script>
<template>
    <div class="flex flex-col grow items-center gap-2 text-center">
        <div>
            Shameless AI optimist. Aspiring amateur athelete. Serial hobbyist.
        </div>
        <NuxtLink to="https://lancewilhelm.com" class="font-mono"
            >lancewilhelm.com</NuxtLink
        >
    </div>
</template>
