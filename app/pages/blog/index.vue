<script setup lang="ts">
import type { BlogPostPreview } from "~/types/blog";

useSeoMeta({
    title: "Blog",
    appleMobileWebAppTitle: "Blog- LanceLance",
});

definePageMeta({
    layout: "blog",
});

const { data: posts } = await useAsyncData<BlogPostPreview[]>(
    "blog-posts",
    () => {
        return $fetch<BlogPostPreview[]>("/api/blog/list");
    },
);

const sortedPosts = computed(() => {
    if (!posts.value) return [];
    return [...posts.value].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
});
</script>

<template>
    <div class="flex flex-col max-w-[700px] self-center gap-[20px]">
        <BlogCard v-for="post in sortedPosts" :key="post.slug" :post="post" />
    </div>
</template>
