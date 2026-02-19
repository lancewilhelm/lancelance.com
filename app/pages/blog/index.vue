<script setup lang="ts">
import type { BlogPostPreview } from "#shared/types/blog";
import { tagToSlug } from "#shared/utils/tags";

useSeoMeta({
    title: "Blog",
    appleMobileWebAppTitle: "Blog- LanceLance",
});

definePageMeta({
    layout: "blog",
});

const route = useRoute();

const { data: posts } = await useAsyncData<BlogPostPreview[]>(
    "blog-posts",
    () => {
        return $fetch<BlogPostPreview[]>("/api/blog/list");
    },
);

const sortedPosts = computed<BlogPostPreview[]>(() => {
    if (!posts.value) return [];
    return [...posts.value].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
});

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
    if (!posts.value) return [];

    const tagMap = new Map<string, { label: string; slug: string; count: number }>();

    for (const post of posts.value) {
        const seenInPost = new Set<string>();

        for (const tag of post.tags) {
            const slug = tagToSlug(tag);
            if (!slug || seenInPost.has(slug)) {
                continue;
            }

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
    if (!activeTagSlug.value) {
        return sortedPosts.value;
    }

    return sortedPosts.value.filter((post) =>
        post.tags.some((tag) => tagToSlug(tag) === activeTagSlug.value),
    );
});
</script>

<template>
    <div class="flex flex-col max-w-175 self-center gap-5">
        <div class="flex flex-wrap gap-2 justify-center">
            <NuxtLink
                to="/blog"
                class="inline-flex rounded-full border px-3 py-1 text-xs no-underline!"
                :class="
                    activeTagSlug
                        ? 'border-(--sub-color) hover:border-(--main-color)'
                        : 'bg-(--main-color) text-(--bg-color)!'
                "
            >
                All ({{ sortedPosts.length }})
            </NuxtLink>
            <NuxtLink
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
            </NuxtLink>
        </div>
        <BlogCard v-for="post in filteredPosts" :key="post.slug" :post="post" />
        <div
            v-if="filteredPosts.length === 0"
            class="text-(--sub-color) italic text-sm"
        >
            No blog posts match this tag.
        </div>
    </div>
</template>
