<script setup lang="ts">
import { contentLoadError } from "~/utils/content-error";
import { formatPublicationDate } from "#shared/utils/date";
import type { BlogPost } from "#shared/types/blog";
import { tagToSlug } from "#shared/utils/tags";

definePageMeta({
  layout: "blog",
});

const route = useRoute();
const site = useSiteConfig();
const slug = route.params.title as string;

const { data: postData, error: postError } = await useAsyncData<BlogPost>(
  `blog-post-${slug}`,
  () => {
    return $fetch<BlogPost>(`/api/blog/${slug}`);
  },
);

const post = computed<BlogPost | null>(() => postData.value ?? null);

const getTagLink = (tag: string) => ({
  path: "/blog",
  query: {
    tag: tagToSlug(tag),
  },
});

if (postError.value) {
  throw contentLoadError(postError.value, "Unable to load blog post");
}

if (!post.value) {
  throw createError({
    statusCode: 404,
    fatal: true,
    statusMessage: "Blog post not found",
  });
}

useHead(() => {
  if (!post.value) {
    return {};
  }
  return {
    title: post.value.title,
    meta: [
      { name: "description", content: post.value.description },
      { property: "og:title", content: post.value.title },
      { property: "og:description", content: post.value.description },
      {
        property: "og:url",
        content: new URL(route.path, site.url).href,
      },
      { name: "twitter:title", content: post.value.title },
      { name: "twitter:description", content: post.value.description },
      {
        name: "twitter:url",
        content: new URL(route.path, site.url).href,
      },
    ],
  };
});
</script>

<template>
  <div v-if="post" class="w-full text-wrap sm:px-4">
    <h1>{{ post.title }}</h1>
    <div class="italic pb-2 text-[var(--sub-text-color,var(--sub-color))]">
      {{ formatPublicationDate(post.date) }}
    </div>
    <div v-if="post.tags.length > 0" class="pb-4 flex flex-wrap gap-2">
      <NuxtLink
        v-for="tag in post.tags"
        :key="tag"
        :to="getTagLink(tag)"
        class="inline-flex rounded-full border border-(--sub-color) px-3 py-1 text-xs no-underline! hover:border-(--main-color)"
      >
        {{ tag }}
      </NuxtLink>
    </div>
    <MDC :value="post.content" class="flex flex-col gap-2 content" />
  </div>
</template>
