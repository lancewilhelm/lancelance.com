<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSeoMeta } from "@unhead/vue";
import { getProjectBySlug } from "@/content/projects";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const route = useRoute();
const project = computed(() =>
  getProjectBySlug(String(route.params.slug || "")),
);

useSeoMeta({
  title: () =>
    project.value ? `${project.value.title} - LanceLance` : "404 - LanceLance",
  description: () => project.value?.description || "",
  ogTitle: () => project.value?.title || "Not Found",
  ogDescription: () => project.value?.description || "",
  twitterTitle: () => project.value?.title || "Not Found",
  twitterDescription: () => project.value?.description || "",
});
</script>

<template>
  <article v-if="project" class="w-full text-wrap sm:px-4">
    <div class="flex flex-col gap-1">
      <h1 class="text-4xl text-(--main-color)">{{ project.title }}</h1>
      <div class="italic">{{ project.description }}</div>
      <div class="flex flex-wrap gap-2 items-center pb-2 text-(--sub-color)">
        <span
          class="px-2 py-[2px] rounded bg-(--sub-color)/10 border border-(--sub-color)/30 text-[var(--sub-text-color,var(--sub-color))] capitalize text-sm"
        >
          {{ project.category }}
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-2 content">
      <component :is="project.component" />
    </div>
  </article>
  <NotFoundPage v-else />
</template>
