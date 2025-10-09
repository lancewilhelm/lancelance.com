<script setup lang="ts">
import type { BlogPost } from "~/types/blog";

definePageMeta({
    layout: "blog",
});

const route = useRoute();
const slug = route.params.title as string;

const { data: post } = await useAsyncData<BlogPost>(`blog-post-${slug}`, () => {
    return $fetch(`/api/blog/${slug}`);
});

if (!post.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Blog post not found",
    });
}

useHead({
    title: post.value.title,
    meta: [
        { name: "description", content: post.value.description },
        { property: "og:title", content: post.value.title },
        { property: "og:description", content: post.value.description },
        { property: "og:url", content: `https://lancelance.dev${route.path}` },
        { name: "twitter:title", content: post.value.title },
        { name: "twitter:description", content: post.value.description },
        { name: "twitter:url", content: `https://lancelance.dev${route.path}` },
    ],
});
</script>

<template>
    <div v-if="post" class="w-full text-wrap sm:px-4">
        <h1>{{ post.title }}</h1>
        <div class="italic pb-2 text-(--sub-color)">
            {{
                new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })
            }}
        </div>
        <MDC :value="post.content" class="flex flex-col gap-2 content" />
    </div>
</template>
