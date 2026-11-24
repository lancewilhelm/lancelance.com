<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSeoMeta } from "@unhead/vue";
import { blogPosts } from "@/content/blog";
import { tagToSlug } from "@/utils/tags";
import BlogCard from "@/components/BlogCard.vue";

useSeoMeta({
  title: "Blog - LanceLance",
  appleMobileWebAppTitle: "Blog - LanceLance",
});

const route = useRoute();

const activeTagSlug = computed(() => {
  const queryTag = route.query.tag;
  if (Array.isArray(queryTag)) {
    return queryTag[0]?.trim().toLowerCase() || "";
  }
  if (typeof queryTag === "string") {
    return queryTag.trim().toLowerCase();
  }
  return "";
});

const tagSummaries = computed(() => {
  const tagMap = new Map<
    string,
    { label: string; slug: string; count: number }
  >();

  for (const post of blogPosts) {
    const seenInPost = new Set<string>();
    for (const tag of post.tags) {
      const slug = tagToSlug(tag);
      if (!slug || seenInPost.has(slug)) continue;
      seenInPost.add(slug);
      const existing = tagMap.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        tagMap.set(slug, { label: tag, slug, count: 1 });
      }
    }
  }

  return [...tagMap.values()].sort((a, b) =>
    a.label.localeCompare(b.label, "en", { sensitivity: "base" }),
  );
});

const filteredPosts = computed(() => {
  if (!activeTagSlug.value) return blogPosts;
  return blogPosts.filter((post) =>
    post.tags.some((tag) => tagToSlug(tag) === activeTagSlug.value),
  );
});
</script>

<template>
  <div class="flex flex-col max-w-175 self-center gap-5">
    <div class="flex flex-wrap gap-2 justify-center">
      <RouterLink
        to="/blog"
        class="inline-flex rounded-full border px-3 py-1 text-xs no-underline!"
        :class="
          activeTagSlug
            ? 'border-(--sub-color) hover:border-(--main-color)'
            : 'bg-(--main-color) text-(--bg-color)!'
        "
      >
        All ({{ blogPosts.length }})
      </RouterLink>
      <RouterLink
        v-for="tag in tagSummaries"
        :key="tag.slug"
        :to="{ path: '/blog', query: { tag: tag.slug } }"
        class="inline-flex rounded-full border px-3 py-1 text-xs no-underline!"
        :class="
          tag.slug === activeTagSlug
            ? 'bg-(--main-color) text-(--bg-color)!'
            : 'border-(--sub-color) hover:border-(--main-color)'
        "
      >
        {{ tag.label }} ({{ tag.count }})
      </RouterLink>
    </div>
    <BlogCard v-for="post in filteredPosts" :key="post.slug" :post="post" />
    <div
      v-if="filteredPosts.length === 0"
      class="text-[var(--sub-text-color,var(--sub-color))] italic text-sm"
    >
      No blog posts match this tag.
    </div>
  </div>
</template>
