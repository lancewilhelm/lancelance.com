<script setup lang="ts">
import type { BlogPostPreview } from "~/types/blog";

const props = defineProps<{
    post: BlogPostPreview;
}>();
</script>

<template>
    <NuxtLink
        :to="post.path"
        class="p-[5px] border-l-[3px] border-l-(--sub-color) hover:border-l-(--main-color) no-underline! transition duration-[300ms] blog-card"
    >
        <div
            class="grid grid-cols-[auto_min-content] grid-rows-2] gap-x-[10px] gap-y-[5px]"
        >
            <div class="grid col-start-1 font-bold text-xl">
                {{ post.title }}
            </div>
            <div class="grid col-start-1 row-start-2 self-end">
                {{ post.description }}
            </div>
            <div
                class="grid col-start-2 row-span-2 self-center text-right text-(--sub-color) italic sm:text-nowrap"
            >
                {{
                    new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                }}
            </div>
        </div>
    </NuxtLink>
</template>
