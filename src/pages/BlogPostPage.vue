<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSeoMeta } from "@unhead/vue";
import { getBlogPostBySlug } from "@/content/blog";
import { formatPublicationDate } from "@/utils/date";
import { tagToSlug } from "@/utils/tags";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const route = useRoute();
const post = computed(() => getBlogPostBySlug(String(route.params.slug || "")));

useSeoMeta({
  title: () => (post.value ? `${post.value.title} - LanceLance` : "404 - LanceLance"),
  description: () => post.value?.description || "",
  ogTitle: () => post.value?.title || "Not Found",
  ogDescription: () => post.value?.description || "",
  twitterTitle: () => post.value?.title || "Not Found",
  twitterDescription: () => post.value?.description || "",
});

const getTagLink = (tag: string) => ({
  path: "/blog",
  query: { tag: tagToSlug(tag) },
});
</script>

<template>
  <article v-if="post" class="w-full text-wrap sm:px-4">
    <h1>{{ post.title }}</h1>
    <div class="italic pb-2 text-[var(--sub-text-color,var(--sub-color))]">
      {{ formatPublicationDate(post.date) }}
    </div>
    <div v-if="post.tags.length > 0" class="pb-4 flex flex-wrap gap-2">
      <RouterLink
        v-for="tag in post.tags"
        :key="tag"
        :to="getTagLink(tag)"
        class="inline-flex rounded-full border border-(--sub-color) px-3 py-1 text-xs no-underline! hover:border-(--main-color)"
      >
        {{ tag }}
      </RouterLink>
    </div>
    <div class="flex flex-col gap-2 content">
      <component :is="post.component" />
    </div>
  </article>
  <NotFoundPage v-else />
</template>
